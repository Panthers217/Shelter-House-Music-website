import { Router } from 'express';
import pool from '../config/db.js';
import { requireAdmin } from '../server.js';

const router = Router();

// ==================== PUBLIC ROUTES ====================

// Get all published FAQs (grouped by category)
router.get('/', async (req, res) => {
  try {
    const [faqs] = await pool.query(
      'SELECT id, question, answer, category, display_order FROM faqs WHERE is_published = 1 ORDER BY category, display_order, id'
    );

    // Group by category
    const groupedFaqs = faqs.reduce((acc, faq) => {
      if (!acc[faq.category]) {
        acc[faq.category] = [];
      }
      acc[faq.category].push(faq);
      return acc;
    }, {});

    res.json({ faqs: groupedFaqs });
  } catch (error) {
    console.error('Get FAQs error:', error);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

// Get single FAQ by ID
router.get('/:id', async (req, res) => {
  try {
    const [faqs] = await pool.query(
      'SELECT id, question, answer, category FROM faqs WHERE id = ? AND is_published = 1',
      [req.params.id]
    );

    if (faqs.length === 0) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    res.json({ faq: faqs[0] });
  } catch (error) {
    console.error('Get FAQ error:', error);
    res.status(500).json({ error: 'Failed to fetch FAQ' });
  }
});

// Search FAQs
router.get('/search/:query', async (req, res) => {
  try {
    const searchQuery = `%${req.params.query}%`;
    const [faqs] = await pool.query(
      'SELECT id, question, answer, category FROM faqs WHERE is_published = 1 AND (question LIKE ? OR answer LIKE ?) ORDER BY category, display_order',
      [searchQuery, searchQuery]
    );

    res.json({ faqs, count: faqs.length });
  } catch (error) {
    console.error('Search FAQs error:', error);
    res.status(500).json({ error: 'Failed to search FAQs' });
  }
});

// ==================== ADMIN ROUTES ====================

// Get all FAQs (including unpublished) - Admin only
router.get('/admin/all', requireAdmin, async (req, res) => {
  try {
    const [faqs] = await pool.query(
      'SELECT * FROM faqs ORDER BY category, display_order, id'
    );

    res.json({ faqs });
  } catch (error) {
    console.error('Get all FAQs error:', error);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

// Get FAQ categories
router.get('/admin/categories', requireAdmin, async (req, res) => {
  try {
    const [categories] = await pool.query(
      'SELECT DISTINCT category FROM faqs ORDER BY category'
    );

    res.json({ categories: categories.map(c => c.category) });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Create new FAQ - Admin only
router.post('/admin', requireAdmin, async (req, res) => {
  try {
    // console.log('📝 Create FAQ request received');
    // console.log('Request body:', req.body);
    
    const { question, answer, category, display_order, is_published } = req.body;

    if (!question || !answer) {
      // console.log('❌ Validation failed: missing question or answer');
      return res.status(400).json({ error: 'Question and answer are required' });
    }

    // console.log('✅ Validation passed, inserting into database...');
    const [result] = await pool.query(
      'INSERT INTO faqs (question, answer, category, display_order, is_published) VALUES (?, ?, ?, ?, ?)',
      [
        question,
        answer,
        category || 'General',
        display_order || 0,
        is_published !== undefined ? (is_published ? 1 : 0) : 1
      ]
    );

    // console.log('✅ Insert successful, ID:', result.insertId);
    const [newFaq] = await pool.query('SELECT * FROM faqs WHERE id = ?', [result.insertId]);

    res.status(201).json({ 
      message: 'FAQ created successfully',
      faq: newFaq[0]
    });
  } catch (error) {
    console.error('❌ Create FAQ error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      error: 'Failed to create FAQ',
      details: error.message
    });
  }
});

// Update FAQ - Admin only
router.put('/admin/:id', requireAdmin, async (req, res) => {
  try {
    const { question, answer, category, display_order, is_published } = req.body;
    const faqId = req.params.id;

    // Check if FAQ exists
    const [existing] = await pool.query('SELECT id FROM faqs WHERE id = ?', [faqId]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    await pool.query(
      'UPDATE faqs SET question = ?, answer = ?, category = ?, display_order = ?, is_published = ? WHERE id = ?',
      [question, answer, category, display_order, is_published ? 1 : 0, faqId]
    );

    const [updatedFaq] = await pool.query('SELECT * FROM faqs WHERE id = ?', [faqId]);

    res.json({ 
      message: 'FAQ updated successfully',
      faq: updatedFaq[0]
    });
  } catch (error) {
    console.error('Update FAQ error:', error);
    res.status(500).json({ 
      error: 'Failed to update FAQ',
      details: error.message
    });
  }
});

// Delete FAQ - Admin only
router.delete('/admin/:id', requireAdmin, async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM faqs WHERE id = ?', [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    console.error('Delete FAQ error:', error);
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
});

// Reorder FAQs - Admin only
router.put('/admin/reorder/batch', requireAdmin, async (req, res) => {
  try {
    const { faqs } = req.body; // Array of { id, display_order }

    if (!Array.isArray(faqs)) {
      return res.status(400).json({ error: 'FAQs array is required' });
    }

    // Update display order for each FAQ
    for (const faq of faqs) {
      await pool.query(
        'UPDATE faqs SET display_order = ? WHERE id = ?',
        [faq.display_order, faq.id]
      );
    }

    res.json({ message: 'FAQs reordered successfully' });
  } catch (error) {
    console.error('Reorder FAQs error:', error);
    res.status(500).json({ error: 'Failed to reorder FAQs' });
  }
});

// Toggle FAQ published status - Admin only
router.patch('/admin/:id/toggle', requireAdmin, async (req, res) => {
  try {
    const [faq] = await pool.query('SELECT is_published FROM faqs WHERE id = ?', [req.params.id]);
    
    if (faq.length === 0) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    const newStatus = faq[0].is_published ? 0 : 1;
    await pool.query('UPDATE faqs SET is_published = ? WHERE id = ?', [newStatus, req.params.id]);

    res.json({ 
      message: 'FAQ status updated',
      is_published: newStatus
    });
  } catch (error) {
    console.error('Toggle FAQ error:', error);
    res.status(500).json({ error: 'Failed to toggle FAQ status' });
  }
});

export default router;
