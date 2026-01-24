import React, { useState, useEffect } from "react";
import { FiMail, FiDollarSign, FiCalendar, FiEdit2, FiTrash2, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useUserLogin } from "../hooks/useUserLogin";

const ManageSubscriptions = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useUserLogin();
  const [email, setEmail] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newAmount, setNewAmount] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please sign in to manage your subscriptions");
      navigate("/login", { state: { from: "/manage-subscriptions" } });
    }
  }, [user, authLoading, navigate]);

  // Pre-fill email from logged-in user
  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  const fetchSubscriptions = async (e) => {
    if (e) e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Verify user is accessing their own subscriptions
    if (user?.email && email !== user.email) {
      toast.error("You can only view your own subscriptions");
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      // Get Firebase auth token
      const token = await user.getIdToken(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/subscriptions/user/${encodeURIComponent(email)}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status === 401 && data.requiresAuth) {
        toast.error("Please sign in to view your subscriptions");
        navigate("/login", { state: { from: "/manage-subscriptions" } });
        return;
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch subscriptions");
      }

      setSubscriptions(data.subscriptions || []);

      if (data.subscriptions.length === 0) {
        toast("No subscriptions found for this email", { icon: "ℹ️" });
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      toast.error("Failed to load subscriptions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAmount = async (id) => {
    const amount = parseFloat(newAmount);

    if (!amount || amount < 1) {
      toast.error("Please enter a valid amount (minimum $1.00)");
      return;
    }

    try {
      // Get Firebase auth token
      const token = await user.getIdToken(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/subscriptions/${id}/amount`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ amount }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update subscription");
      }

      const data = await response.json();
      toast.success(`Subscription updated! New amount takes effect ${new Date(data.effectiveDate).toLocaleDateString()}`);
      
      // Refresh subscriptions
      await fetchSubscriptions();
      setEditingId(null);
      setNewAmount("");
    } catch (error) {
      console.error("Error updating subscription:", error);
      toast.error(error.message || "Failed to update subscription");
    }
  };

  const handleCancelSubscription = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this monthly support? You'll continue to have access until the end of your current billing period.")) {
      return;
    }

    try {
      // Get Firebase auth token
      const token = await user.getIdToken(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/subscriptions/${id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to cancel subscription");
      }

      const data = await response.json();
      toast.success(`Subscription cancelled. Active until ${new Date(data.cancelAt).toLocaleDateString()}`);
      
      // Refresh subscriptions
      await fetchSubscriptions();
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast.error(error.message || "Failed to cancel subscription");
    }
  };

  const handleReactivate = async (id) => {
    try {
      // Get Firebase auth token
      const token = await user.getIdToken(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/subscriptions/${id}/reactivate`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to reactivate subscription");
      }

      toast.success("Subscription reactivated successfully!");
      
      // Refresh subscriptions
      await fetchSubscriptions();
    } catch (error) {
      console.error("Error reactivating subscription:", error);
      toast.error(error.message || "Failed to reactivate subscription");
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: "bg-green-500/20 text-green-400 border-green-500/50",
      cancelled: "bg-red-500/20 text-red-400 border-red-500/50",
      paused: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
      past_due: "bg-orange-500/20 text-orange-400 border-orange-500/50",
    };

    return badges[status] || "bg-shelter-slate text-shelter-gray border-shelter-slate";
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-shelter-charcoal flex items-center justify-center">
        <div className="text-shelter-white text-xl">Loading...</div>
      </div>
    );
  }

  // Show nothing if not authenticated (redirect will happen)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-shelter-charcoal py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-shelter-white mb-4">
            Manage Your Monthly Support
          </h1>
          <p className="text-lg text-shelter-gray max-w-2xl mx-auto">
            View and manage your recurring donations to Shelter House Music ministry.
          </p>
        </div>

        {/* Email Search Form */}
        <form onSubmit={fetchSubscriptions} className="bg-shelter-slate rounded-lg p-8 mb-8 border border-shelter-slate">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-shelter-white font-medium mb-2">
                Your Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-shelter-gray" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  readOnly
                  required
                  className="w-full pl-12 pr-4 py-3 bg-shelter-charcoal border border-shelter-slate focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/20 text-shelter-white placeholder:text-shelter-gray rounded-lg cursor-not-allowed opacity-75"
                />
              </div>
              <p className="text-shelter-gray text-sm mt-2">
                You can only view subscriptions for your logged-in account
              </p>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-shelter-honey text-shelter-charcoal hover:bg-shelter-amber hover:scale-105 hover:shadow-lg active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-lg font-bold transition-all duration-200"
              >
                {loading ? "Searching..." : "Find My Subscriptions"}
              </button>
            </div>
          </div>
        </form>

        {/* Subscriptions List */}
        {searched && !loading && (
          <div className="space-y-6">
            {subscriptions.length === 0 ? (
              <div className="bg-shelter-slate rounded-lg p-12 border border-shelter-slate text-center">
                <p className="text-shelter-gray text-lg mb-4">
                  No monthly support subscriptions found for this email.
                </p>
                <Link
                  to="/support-ministry"
                  className="inline-block bg-shelter-honey text-shelter-charcoal hover:bg-shelter-amber px-6 py-3 rounded-lg font-bold transition-colors"
                >
                  Start Monthly Support
                </Link>
              </div>
            ) : (
              subscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className="bg-shelter-slate rounded-lg p-6 border border-shelter-slate hover:border-shelter-honey/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-shelter-white">
                          Monthly Ministry Support
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusBadge(
                            subscription.status
                          )}`}
                        >
                          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-shelter-gray">
                        For: {subscription.donor_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-shelter-honey">
                        ${parseFloat(subscription.amount).toFixed(2)}
                      </div>
                      <p className="text-shelter-gray text-sm">per month</p>
                    </div>
                  </div>

                  {/* Subscription Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pt-4 border-t border-shelter-slate">
                    <div className="flex items-center gap-3">
                      <FiCalendar className="text-shelter-honey" />
                      <div>
                        <p className="text-shelter-gray text-sm">Started</p>
                        <p className="text-shelter-white">
                          {new Date(subscription.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {subscription.next_billing_date && subscription.status === "active" && (
                      <div className="flex items-center gap-3">
                        <FiCalendar className="text-shelter-honey" />
                        <div>
                          <p className="text-shelter-gray text-sm">Next Billing</p>
                          <p className="text-shelter-white">
                            {new Date(subscription.next_billing_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}
                    {subscription.cancelled_at && (
                      <div className="flex items-center gap-3">
                        <FiCalendar className="text-red-400" />
                        <div>
                          <p className="text-shelter-gray text-sm">Cancelled On</p>
                          <p className="text-shelter-white">
                            {new Date(subscription.cancelled_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Edit Amount Form */}
                  {editingId === subscription.id && subscription.status === "active" && (
                    <div className="mb-4 p-4 bg-shelter-charcoal rounded-lg border border-shelter-slate">
                      <label className="block text-shelter-white font-medium mb-2">
                        New Monthly Amount
                      </label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-shelter-gray text-lg">
                            $
                          </span>
                          <input
                            type="number"
                            value={newAmount}
                            onChange={(e) => setNewAmount(e.target.value)}
                            placeholder={subscription.amount}
                            min="1"
                            step="0.01"
                            className="w-full pl-8 pr-4 py-2 bg-shelter-charcoal border border-shelter-slate focus:border-shelter-honey focus:ring-2 focus:ring-shelter-honey/20 text-shelter-white placeholder:text-shelter-gray rounded-lg"
                          />
                        </div>
                        <button
                          onClick={() => handleUpdateAmount(subscription.id)}
                          className="bg-shelter-honey text-shelter-charcoal hover:bg-shelter-amber px-6 py-2 rounded-lg font-bold transition-colors"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setNewAmount("");
                          }}
                          className="bg-shelter-slate text-shelter-white hover:bg-shelter-slate/70 px-6 py-2 rounded-lg font-bold transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {subscription.status === "active" && (
                      <>
                        <button
                          onClick={() => {
                            setEditingId(subscription.id);
                            setNewAmount(subscription.amount);
                          }}
                          className="flex items-center gap-2 bg-shelter-charcoal text-shelter-white hover:bg-shelter-slate border border-shelter-slate hover:border-shelter-honey/50 px-4 py-2 rounded-lg font-semibold transition-all"
                        >
                          <FiEdit2 size={16} />
                          Change Amount
                        </button>
                        <button
                          onClick={() => handleCancelSubscription(subscription.id)}
                          className="flex items-center gap-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50 hover:border-red-500 px-4 py-2 rounded-lg font-semibold transition-all"
                        >
                          <FiTrash2 size={16} />
                          Cancel Subscription
                        </button>
                      </>
                    )}
                    {subscription.status === "cancelled" && (
                      <button
                        onClick={() => handleReactivate(subscription.id)}
                        className="flex items-center gap-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/50 hover:border-green-500 px-4 py-2 rounded-lg font-semibold transition-all"
                      >
                        <FiCheckCircle size={16} />
                        Reactivate Subscription
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-shelter-slate rounded-lg p-6 border border-shelter-slate">
          <h3 className="text-xl font-bold text-shelter-white mb-3">
            Need Help?
          </h3>
          <p className="text-shelter-gray mb-4">
            If you have any questions about your recurring donations or need assistance, 
            please contact us at{" "}
            <a
              href="mailto:support@shelterhousemusic.com"
              className="text-shelter-honey hover:text-shelter-amber underline"
            >
              support@shelterhousemusic.com
            </a>
          </p>
          <p className="text-shelter-gray text-sm">
            Note: Credit card information is securely stored with Stripe and is never saved 
            in our database. Changes to your subscription amount will take effect on your 
            next billing date.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManageSubscriptions;
