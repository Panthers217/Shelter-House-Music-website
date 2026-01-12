import { Router } from 'express';
import db from '../config/db.js';

const router = Router();

/**
 * GET /api/purchase-history/user-email/:email
 * Get all purchases and order items for a specific user by email
 */
router.get('/user-email/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // First, look up the user_id from the email
    const [users] = await db.query(
      'SELECT id FROM user WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.json({
        email: email,
        purchase_count: 0,
        purchases: []
      });
    }

    const userId = users[0].id;

    // Get user's purchases with order items
    const [purchases] = await db.query(
      `SELECT 
        p.id as purchase_id,
        p.order_id,
        p.stripe_payment_intent_id,
        p.amount,
        p.currency,
        p.payment_status,
        p.customer_email,
        p.customer_name,
        p.item_type,
        p.purchased_at,
        p.updated_at,
        oi.id as order_item_id,
        oi.item_type as item_type_detail,
        oi.item_id,
        oi.item_title,
        oi.artist_name,
        oi.quantity,
        oi.price as item_price
      FROM purchases p
      LEFT JOIN order_items oi ON p.id = oi.purchase_id
      WHERE p.user_id = ?
      ORDER BY p.purchased_at DESC, oi.id`,
      [userId]
    );

    // Group order items by purchase
    const purchaseMap = {};
    purchases.forEach(row => {
      if (!purchaseMap[row.purchase_id]) {
        purchaseMap[row.purchase_id] = {
          purchase_id: row.purchase_id,
          order_id: row.order_id,
          stripe_payment_intent_id: row.stripe_payment_intent_id,
          amount: row.amount,
          currency: row.currency,
          payment_status: row.payment_status,
          customer_email: row.customer_email,
          customer_name: row.customer_name,
          item_type: row.item_type,
          purchased_at: row.purchased_at,
          updated_at: row.updated_at,
          items: []
        };
      }

      if (row.order_item_id) {
        purchaseMap[row.purchase_id].items.push({
          order_item_id: row.order_item_id,
          item_type: row.item_type_detail,
          item_id: row.item_id,
          item_title: row.item_title,
          artist_name: row.artist_name,
          quantity: row.quantity,
          price: row.item_price
        });
      }
    });

    const purchaseHistory = Object.values(purchaseMap);

    res.json({
      email: email,
      user_id: userId,
      purchase_count: purchaseHistory.length,
      purchases: purchaseHistory
    });
  } catch (error) {
    console.error('Error fetching purchase history by email:', error);
    res.status(500).json({ error: 'Failed to fetch purchase history' });
  }
});

/**
 * GET /api/purchase-history/user/:userId
 * Get all purchases and order items for a specific user by ID
 * Admin only or authenticated user viewing their own history
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user's purchases with order items
    const [purchases] = await db.query(
      `SELECT 
        p.id as purchase_id,
        p.order_id,
        p.stripe_payment_intent_id,
        p.amount,
        p.currency,
        p.payment_status,
        p.customer_email,
        p.customer_name,
        p.item_type,
        p.purchased_at,
        p.updated_at,
        oi.id as order_item_id,
        oi.item_type as item_type_detail,
        oi.item_id,
        oi.item_title,
        oi.artist_name,
        oi.quantity,
        oi.price as item_price
      FROM purchases p
      LEFT JOIN order_items oi ON p.id = oi.purchase_id
      WHERE p.user_id = ?
      ORDER BY p.purchased_at DESC, oi.id`,
      [userId]
    );

    // Group order items by purchase
    const purchaseMap = {};
    purchases.forEach(row => {
      if (!purchaseMap[row.purchase_id]) {
        purchaseMap[row.purchase_id] = {
          purchase_id: row.purchase_id,
          order_id: row.order_id,
          stripe_payment_intent_id: row.stripe_payment_intent_id,
          amount: row.amount,
          currency: row.currency,
          payment_status: row.payment_status,
          customer_email: row.customer_email,
          customer_name: row.customer_name,
          item_type: row.item_type,
          purchased_at: row.purchased_at,
          updated_at: row.updated_at,
          items: []
        };
      }

      if (row.order_item_id) {
        purchaseMap[row.purchase_id].items.push({
          order_item_id: row.order_item_id,
          item_type: row.item_type_detail,
          item_id: row.item_id,
          item_title: row.item_title,
          artist_name: row.artist_name,
          quantity: row.quantity,
          price: row.item_price
        });
      }
    });

    const purchaseHistory = Object.values(purchaseMap);

    res.json({
      user_id: userId,
      purchase_count: purchaseHistory.length,
      purchases: purchaseHistory
    });
  } catch (error) {
    console.error('Error fetching purchase history:', error);
    res.status(500).json({ error: 'Failed to fetch purchase history' });
  }
});

/**
 * GET /api/purchase-history/all
 * Get all purchases for admin dashboard
 * Admin only
 */
router.get('/all', async (req, res) => {
  try {
    // TODO: Add admin verification
    // if (!req.user.isAdmin) {
    //   return res.status(403).json({ error: 'Admin access required' });
    // }

    const { status, limit = 50, offset = 0 } = req.query;

    let query = `
      SELECT 
        p.id as purchase_id,
        p.user_id,
        p.order_id,
        p.stripe_payment_intent_id,
        p.amount,
        p.currency,
        p.payment_status,
        p.customer_email,
        p.customer_name,
        p.item_type,
        p.purchased_at,
        u.username,
        u.email as user_email,
        COUNT(oi.id) as item_count
      FROM purchases p
      LEFT JOIN user u ON p.user_id = u.id
      LEFT JOIN order_items oi ON p.id = oi.purchase_id
    `;

    const params = [];
    
    if (status) {
      query += ' WHERE p.payment_status = ?';
      params.push(status);
    }

    query += ' GROUP BY p.id ORDER BY p.purchased_at DESC LIMIT ? OFFSET ?';
    params.push(parseInt(limit), parseInt(offset));

    const [purchases] = await db.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM purchases';
    if (status) {
      countQuery += ' WHERE payment_status = ?';
    }
    const [countResult] = await db.query(countQuery, status ? [status] : []);

    res.json({
      total: countResult[0].total,
      limit: parseInt(limit),
      offset: parseInt(offset),
      purchases
    });
  } catch (error) {
    console.error('Error fetching all purchases:', error);
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
});

/**
 * GET /api/purchase-history/order/:orderId
 * Get specific order details with all items
 */
router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    // Get purchase details
    const [purchases] = await db.query(
      `SELECT 
        p.*,
        u.username,
        u.email as user_email
      FROM purchases p
      LEFT JOIN user u ON p.user_id = u.id
      WHERE p.order_id = ?`,
      [orderId]
    );

    if (purchases.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const purchase = purchases[0];

    // Get order items
    const [items] = await db.query(
      `SELECT * FROM order_items WHERE purchase_id = ? ORDER BY id`,
      [purchase.id]
    );

    res.json({
      purchase,
      items
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
});

/**
 * GET /api/purchase-history/stats
 * Get purchase statistics for admin dashboard
 * Query params: startDate, endDate, artistId, itemType, paymentStatus
 */
router.get('/stats', async (req, res) => {
  try {
    // TODO: Add admin verification

    const { startDate, endDate, artistId, itemType, paymentStatus } = req.query;

    // Build WHERE clause based on filters
    let whereConditions = [];
    let queryParams = [];

    if (paymentStatus) {
      whereConditions.push('p.payment_status = ?');
      queryParams.push(paymentStatus);
    } else {
      whereConditions.push("p.payment_status = 'succeeded'");
    }

    if (startDate) {
      whereConditions.push('DATE(p.purchased_at) >= ?');
      queryParams.push(startDate);
    }

    if (endDate) {
      whereConditions.push('DATE(p.purchased_at) <= ?');
      queryParams.push(endDate);
    }

    const whereClause = whereConditions.length > 0 
      ? 'WHERE ' + whereConditions.join(' AND ')
      : '';

    // Build additional filters for order_items queries
    let orderItemsWhere = [...whereConditions];
    let orderItemsParams = [...queryParams];

    // For artist filter, we need to join with product tables
    let artistJoin = '';
    if (artistId) {
      // We'll filter by artist_name for now since artist_id isn't in order_items
      // This is a workaround - ideally order_items should have artist_id
      orderItemsWhere.push(`(
        (oi.item_type = 'Album' OR oi.item_type = 'Digital Album') AND oi.item_id IN (SELECT id FROM albums WHERE artist_id = ?) OR
        oi.item_type = 'Track' AND oi.item_id IN (SELECT id FROM promotional_tracks WHERE artist_id = ?) OR
        oi.item_type = 'Merchandise' AND oi.item_id IN (SELECT id FROM merchandise WHERE artist_id = ?)
      )`);
      orderItemsParams.push(artistId, artistId, artistId);
    }

    if (itemType) {
      orderItemsWhere.push('oi.item_type = ?');
      orderItemsParams.push(itemType);
    }

    const orderItemsWhereClause = orderItemsWhere.length > 0
      ? 'WHERE ' + orderItemsWhere.join(' AND ')
      : '';

    // Total revenue
    const [revenueResult] = await db.query(
      `SELECT 
        SUM(amount) as total_revenue,
        COUNT(*) as total_orders,
        AVG(amount) as average_order_value
      FROM purchases p
      ${whereClause}`,
      queryParams
    );

    // Orders by status
    const statusWhereConditions = [...whereConditions].filter(c => !c.includes('payment_status'));
    const statusParams = queryParams.filter((_, i) => !whereConditions[i]?.includes('payment_status'));
    const statusWhereClause = statusWhereConditions.length > 0
      ? 'WHERE ' + statusWhereConditions.join(' AND ')
      : '';

    const [statusResult] = await db.query(
      `SELECT 
        p.payment_status,
        COUNT(*) as count,
        SUM(p.amount) as total_amount
      FROM purchases p
      ${statusWhereClause}
      GROUP BY p.payment_status`,
      statusParams
    );

    // Top selling items - without artist_id since it's not in order_items table
    const [topItemsResult] = await db.query(
      `SELECT 
        oi.item_type,
        oi.item_title,
        oi.artist_name,
        COUNT(DISTINCT p.id) as order_count,
        SUM(oi.quantity) as total_quantity,
        SUM(oi.price * oi.quantity) as total_revenue
      FROM order_items oi
      JOIN purchases p ON oi.purchase_id = p.id
      ${orderItemsWhereClause}
      GROUP BY oi.item_type, oi.item_id, oi.item_title, oi.artist_name
      ORDER BY total_quantity DESC
      LIMIT 10`,
      orderItemsParams
    );

    // Recent purchases (last 7 days or filtered date range)
    const recentWhereConditions = paymentStatus 
      ? ['payment_status = ?']
      : ["payment_status = 'succeeded'"];
    const recentParams = paymentStatus ? [paymentStatus] : [];

    if (startDate && endDate) {
      recentWhereConditions.push('purchased_at >= ?', 'purchased_at <= ?');
      recentParams.push(startDate, endDate);
    } else {
      recentWhereConditions.push('purchased_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)');
    }

    const [recentResult] = await db.query(
      `SELECT COUNT(*) as count, SUM(amount) as revenue
      FROM purchases
      WHERE ${recentWhereConditions.join(' AND ')}`,
      recentParams
    );

    res.json({
      overview: {
        total_revenue: revenueResult[0].total_revenue || 0,
        total_orders: revenueResult[0].total_orders || 0,
        average_order_value: revenueResult[0].average_order_value || 0
      },
      by_status: statusResult,
      top_items: topItemsResult,
      last_7_days: recentResult[0],
      filters: {
        startDate: startDate || null,
        endDate: endDate || null,
        artistId: artistId || null,
        itemType: itemType || null,
        paymentStatus: paymentStatus || 'succeeded'
      }
    });
  } catch (error) {
    console.error('Error fetching purchase stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

/**
 * GET /api/purchase-history/artist-revenue
 * Get revenue breakdown by artist for payout calculations
 * Query params: startDate, endDate, artistId
 */
router.get('/artist-revenue', async (req, res) => {
  try {
    // TODO: Add admin verification

    const { startDate, endDate, artistId } = req.query;

    let whereConditions = ["p.payment_status = 'succeeded'"];
    let queryParams = [];

    if (startDate) {
      whereConditions.push('p.purchased_at >= ?');
      queryParams.push(startDate);
    }

    if (endDate) {
      whereConditions.push('p.purchased_at <= ?');
      queryParams.push(endDate);
    }

    // For artist filtering, we need to check across product tables
    let artistFilter = '';
    if (artistId) {
      artistFilter = `AND (
        (oi.item_type = 'Album' AND oi.item_id IN (SELECT id FROM albums WHERE artist_id = ?)) OR
        (oi.item_type = 'Track' AND oi.item_id IN (SELECT id FROM promotional_tracks WHERE artist_id = ?)) OR
        (oi.item_type = 'Merchandise' AND oi.item_id IN (SELECT id FROM merchandise WHERE artist_id = ?))
      )`;
      queryParams.push(artistId, artistId, artistId);
    }

    const whereClause = 'WHERE ' + whereConditions.join(' AND ') + ' ' + artistFilter;

    // Get revenue grouped by artist - using subqueries to get artist_id
    const [artistRevenue] = await db.query(
      `SELECT 
        COALESCE(
          (SELECT artist_id FROM albums WHERE id = oi.item_id AND oi.item_type = 'Album'),
          (SELECT artist_id FROM promotional_tracks WHERE id = oi.item_id AND oi.item_type = 'Track'),
          (SELECT artist_id FROM merchandise WHERE id = oi.item_id AND oi.item_type = 'Merchandise')
        ) as artist_id,
        oi.artist_name,
        COUNT(DISTINCT p.id) as total_orders,
        SUM(oi.quantity) as total_items_sold,
        SUM(oi.price * oi.quantity) as gross_revenue,
        SUM(CASE WHEN oi.item_type = 'Album' THEN oi.quantity ELSE 0 END) as albums_sold,
        SUM(CASE WHEN oi.item_type = 'Track' THEN oi.quantity ELSE 0 END) as tracks_sold,
        SUM(CASE WHEN oi.item_type = 'Merchandise' THEN oi.quantity ELSE 0 END) as merch_sold,
        SUM(CASE WHEN oi.item_type = 'Album' THEN oi.price * oi.quantity ELSE 0 END) as album_revenue,
        SUM(CASE WHEN oi.item_type = 'Track' THEN oi.price * oi.quantity ELSE 0 END) as track_revenue,
        SUM(CASE WHEN oi.item_type = 'Merchandise' THEN oi.price * oi.quantity ELSE 0 END) as merch_revenue,
        MIN(p.purchased_at) as first_sale,
        MAX(p.purchased_at) as last_sale
      FROM order_items oi
      JOIN purchases p ON oi.purchase_id = p.id
      ${whereClause}
      GROUP BY artist_id, oi.artist_name
      HAVING artist_id IS NOT NULL
      ORDER BY gross_revenue DESC`,
      queryParams
    );

    // Calculate platform fees (Stripe: 2.9% + $0.30 per transaction)
    const enrichedData = artistRevenue.map(artist => {
      const grossRevenue = parseFloat(artist.gross_revenue) || 0;
      const stripeFeePercentage = 0.029; // 2.9%
      const stripeFeeFixed = 30; // $0.30 in cents per order
      
      const totalStripeFees = (grossRevenue * stripeFeePercentage) + (artist.total_orders * stripeFeeFixed);
      const revenueAfterStripeFees = grossRevenue - totalStripeFees;
      
      // Default artist split: 70% to artist, 30% platform fee
      const platformFeePercentage = 0.30;
      const artistShare = revenueAfterStripeFees * (1 - platformFeePercentage);
      const platformShare = revenueAfterStripeFees * platformFeePercentage;

      return {
        ...artist,
        gross_revenue: grossRevenue,
        stripe_fees: Math.round(totalStripeFees),
        revenue_after_stripe: Math.round(revenueAfterStripeFees),
        platform_fee: Math.round(platformShare),
        artist_payout: Math.round(artistShare),
        artist_percentage: 70,
        platform_percentage: 30
      };
    });

    res.json({
      artists: enrichedData,
      filters: {
        startDate: startDate || null,
        endDate: endDate || null,
        artistId: artistId || null
      },
      summary: {
        total_artists: enrichedData.length,
        total_gross_revenue: enrichedData.reduce((sum, a) => sum + a.gross_revenue, 0),
        total_artist_payout: enrichedData.reduce((sum, a) => sum + a.artist_payout, 0),
        total_platform_fees: enrichedData.reduce((sum, a) => sum + a.platform_fee, 0),
        total_stripe_fees: enrichedData.reduce((sum, a) => sum + a.stripe_fees, 0)
      }
    });
  } catch (error) {
    console.error('Error fetching artist revenue:', error);
    res.status(500).json({ error: 'Failed to fetch artist revenue data' });
  }
});

export default router;
