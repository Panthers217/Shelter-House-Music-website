import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../../firebase';

/**
 * StatsScheduleSettings Component
 * 
 * Allows admins to configure the cron schedule for automatic stats updates
 * Supports: Minutes, Hours, Daily, Weekly, Monthly intervals, or turn off
 */
function StatsScheduleSettings() {
  const [scheduleType, setScheduleType] = useState('weekly');
  const [customValue, setCustomValue] = useState('1');
  const [selectedDay, setSelectedDay] = useState('0'); // 0 = Sunday
  const [selectedHour, setSelectedHour] = useState('2');
  const [isEnabled, setIsEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Fetch current schedule on mount
  useEffect(() => {
    fetchCurrentSchedule();
  }, []);

  const fetchCurrentSchedule = async () => {
    try {
      const token = await auth.currentUser?.getIdToken();
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/stats-schedule`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      const { schedule } = response.data;
      setIsEnabled(schedule.enabled);
      setScheduleType(schedule.type);
      setCustomValue(schedule.value || '1');
      setSelectedDay(schedule.day || '0');
      setSelectedHour(schedule.hour || '2');
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const token = await auth.currentUser?.getIdToken();
      
      const scheduleConfig = {
        enabled: isEnabled,
        type: scheduleType,
        value: customValue,
        day: selectedDay,
        hour: selectedHour
      };
      
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/stats-schedule`,
        scheduleConfig,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setMessage('Schedule updated successfully! Changes will take effect immediately.');
      setMessageType('success');
    } catch (error) {
      console.error('Error updating schedule:', error);
      setMessage(error.response?.data?.error || 'Failed to update schedule');
      setMessageType('error');
    } finally {
      setLoading(false);
      // Clear message after 5 seconds
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const getCronExpression = () => {
    if (!isEnabled) return 'Disabled';
    
    switch (scheduleType) {
      case 'minutes':
        return `Every ${customValue} minute${customValue !== '1' ? 's' : ''}`;
      case 'hours':
        return `Every ${customValue} hour${customValue !== '1' ? 's' : ''}`;
      case 'daily':
        return `Daily at ${selectedHour}:00`;
      case 'weekly': {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return `Every ${days[parseInt(selectedDay)]} at ${selectedHour}:00`;
      }
      case 'monthly':
        return `Monthly on day ${customValue} at ${selectedHour}:00`;
      default:
        return 'Custom';
    }
  };

  return (
    <div className="bg-white/[0.035] rounded-xl p-6 ring-1 ring-white/10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="i-lucide-clock text-[#f7c900]" />
            Stats Update Schedule
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Configure automatic updates for artist monthly listeners
          </p>
        </div>
        
        {/* Enable/Disable Toggle */}
        <button
          onClick={() => setIsEnabled(!isEnabled)}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
            isEnabled ? 'bg-[#1ed760]' : 'bg-white/20'
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
              isEnabled ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Current Schedule Display */}
      <div className="mb-6 p-4 bg-white/[0.03] rounded-lg border border-white/10">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <span className="i-lucide-info" />
          <span>Current Schedule:</span>
          <span className="font-semibold text-white">{getCronExpression()}</span>
        </div>
      </div>

      {/* Schedule Configuration */}
      {isEnabled && (
        <div className="space-y-5">
          {/* Schedule Type Dropdown */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Schedule Type
            </label>
            <select
              value={scheduleType}
              onChange={(e) => setScheduleType(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f7c900]/50"
            >
              <option value="minutes" className="bg-[#1a1a1a]">Every X Minutes</option>
              <option value="hours" className="bg-[#1a1a1a]">Every X Hours</option>
              <option value="daily" className="bg-[#1a1a1a]">Daily</option>
              <option value="weekly" className="bg-[#1a1a1a]">Weekly</option>
              <option value="monthly" className="bg-[#1a1a1a]">Monthly</option>
            </select>
          </div>

          {/* Minutes Configuration */}
          {scheduleType === 'minutes' && (
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Run Every (Minutes)
              </label>
              <input
                type="number"
                min="1"
                max="59"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f7c900]/50"
                placeholder="Enter minutes (1-59)"
              />
              <p className="text-xs text-white/50 mt-1">
                ⚠️ Warning: Frequent updates may hit API rate limits
              </p>
            </div>
          )}

          {/* Hours Configuration */}
          {scheduleType === 'hours' && (
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Run Every (Hours)
              </label>
              <input
                type="number"
                min="1"
                max="24"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f7c900]/50"
                placeholder="Enter hours (1-24)"
              />
            </div>
          )}

          {/* Daily Configuration */}
          {scheduleType === 'daily' && (
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Run At (Hour)
              </label>
              <select
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
                className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f7c900]/50"
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i.toString()} className="bg-[#1a1a1a]">
                    {i.toString().padStart(2, '0')}:00 {i < 12 ? 'AM' : 'PM'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Weekly Configuration */}
          {scheduleType === 'weekly' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Day of Week
                </label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f7c900]/50"
                >
                  <option value="0" className="bg-[#1a1a1a]">Sunday</option>
                  <option value="1" className="bg-[#1a1a1a]">Monday</option>
                  <option value="2" className="bg-[#1a1a1a]">Tuesday</option>
                  <option value="3" className="bg-[#1a1a1a]">Wednesday</option>
                  <option value="4" className="bg-[#1a1a1a]">Thursday</option>
                  <option value="5" className="bg-[#1a1a1a]">Friday</option>
                  <option value="6" className="bg-[#1a1a1a]">Saturday</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Run At (Hour)
                </label>
                <select
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f7c900]/50"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i.toString()} className="bg-[#1a1a1a]">
                      {i.toString().padStart(2, '0')}:00 {i < 12 ? 'AM' : 'PM'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Monthly Configuration */}
          {scheduleType === 'monthly' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Day of Month
                </label>
                <input
                  type="number"
                  min="1"
                  max="28"
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f7c900]/50"
                  placeholder="Enter day (1-28)"
                />
                <p className="text-xs text-white/50 mt-1">
                  Max 28 to ensure it runs every month
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Run At (Hour)
                </label>
                <select
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f7c900]/50"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i.toString()} className="bg-[#1a1a1a]">
                      {i.toString().padStart(2, '0')}:00 {i < 12 ? 'AM' : 'PM'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div
          className={`mt-5 p-4 rounded-lg flex items-center gap-2 ${
            messageType === 'success'
              ? 'bg-green-500/10 border border-green-500/20 text-green-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}
        >
          <span className={messageType === 'success' ? 'i-lucide-check-circle' : 'i-lucide-alert-circle'} />
          <span className="text-sm">{message}</span>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex-1 px-6 py-3 bg-[#f7c900] text-black font-semibold rounded-lg hover:bg-[#f7c900]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="i-lucide-loader-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <span className="i-lucide-save" />
              Save Schedule
            </>
          )}
        </button>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="i-lucide-info text-blue-400 mt-0.5" />
          <div className="text-sm text-blue-300">
            <p className="font-semibold mb-1">How it works:</p>
            <ul className="space-y-1 text-blue-300/80">
              <li>• The schedule updates artist stats automatically</li>
              <li>• First fetches data from Spotify, YouTube, etc.</li>
              <li>• Then calculates website plays and totals</li>
              <li>• Changes take effect immediately without server restart</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsScheduleSettings;
