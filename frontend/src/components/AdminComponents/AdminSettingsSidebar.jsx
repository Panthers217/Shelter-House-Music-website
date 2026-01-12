import React, { useState } from 'react';
import StatsScheduleSettings from '../adminComponents/StatsScheduleSettings';
import GenreManagement from '../adminComponents/GenreManagement';

/**
 * AdminSettingsSidebar Component
 * 
 * A collapsible sidebar drawer for admin settings
 * Contains various admin configuration options
 */
function AdminSettingsSidebar({ isOpen, onClose }) {
  const [activeSection, setActiveSection] = useState('stats-schedule');

  const sections = [
    {
      id: 'stats-schedule',
      label: 'Stats Schedule',
      icon: 'i-lucide-clock',
      description: 'Configure automatic stats updates'
    },
    {
      id: 'genres',
      label: 'Genre Management',
      icon: 'i-lucide-music',
      description: 'Manage available music genres'
    },
    {
      id: 'general',
      label: 'General Settings',
      icon: 'i-lucide-settings',
      description: 'Basic app configuration'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'i-lucide-bell',
      description: 'Email and alert settings'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'i-lucide-shield',
      description: 'Access control and permissions'
    }
  ];

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Drawer */}
      <div
        className={`fixed pt-[13rem] left-0 top-0 h-full w-[600px] bg-[#0f1116] border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="i-lucide-settings-2 text-2xl text-[#f7c900]" />
            <div>
              <h2 className="text-xl font-bold text-white">Admin Settings</h2>
              <p className="text-sm text-white/60">Configure application settings</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <span className="i-lucide-x text-xl text-white/70 hover:text-white" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex w-full sm:w-[50%] sm:flex-col overflow-hidden">
          {/* Navigation Tabs */}
          <div className="w-48 border-r border-white/10 p-4 overflow-y-auto">
            <div className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                    activeSection === section.id
                      ? 'bg-[#f7c900] text-black font-semibold'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className={`${section.icon} text-lg`} />
                  <span className="text-sm">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Panel */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeSection === 'stats-schedule' && (
              <div>
                <StatsScheduleSettings />
              </div>
            )}

            {activeSection === 'genres' && (
              <div>
                <GenreManagement />
              </div>
            )}

            {activeSection === 'general' && (
              <div className="bg-white/[0.035] rounded-xl p-6 ring-1 ring-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="i-lucide-settings text-[#f7c900]" />
                  General Settings
                </h3>
                <p className="text-white/60 text-sm">
                  General application settings coming soon...
                </p>
                
                {/* Placeholder for future settings */}
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-white/[0.03] rounded-lg border border-white/10">
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Soul Felt Music"
                      className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f7c900]/50"
                    />
                  </div>

                  <div className="p-4 bg-white/[0.03] rounded-lg border border-white/10">
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Support Email
                    </label>
                    <input
                      type="email"
                      placeholder="support@soulfeltmusic.com"
                      className="w-full px-4 py-2.5 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f7c900]/50"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="bg-white/[0.035] rounded-xl p-6 ring-1 ring-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="i-lucide-bell text-[#f7c900]" />
                  Notification Settings
                </h3>
                <p className="text-white/60 text-sm mb-6">
                  Configure email alerts and notifications
                </p>

                <div className="space-y-4">
                  {[
                    { label: 'New Artist Uploads', description: 'Get notified when new artists are added' },
                    { label: 'Stats Updates', description: 'Receive alerts when monthly listeners update' },
                    { label: 'User Signups', description: 'Notify when new users register' },
                    { label: 'Error Alerts', description: 'Get critical error notifications' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg border border-white/10">
                      <div>
                        <p className="text-white font-medium">{item.label}</p>
                        <p className="text-sm text-white/60 mt-0.5">{item.description}</p>
                      </div>
                      <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-white/20">
                        <span className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg translate-x-1" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="bg-white/[0.035] rounded-xl p-6 ring-1 ring-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="i-lucide-shield text-[#f7c900]" />
                  Security Settings
                </h3>
                <p className="text-white/60 text-sm mb-6">
                  Manage access control and security features
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-white/[0.03] rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-2">Two-Factor Authentication</h4>
                    <p className="text-sm text-white/60 mb-3">
                      Add an extra layer of security to admin accounts
                    </p>
                    <button className="px-4 py-2 bg-[#f7c900] text-black font-semibold rounded-lg hover:bg-[#f7c900]/90 transition-colors text-sm">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="p-4 bg-white/[0.03] rounded-lg border border-white/10">
                    <h4 className="text-white font-medium mb-2">Session Timeout</h4>
                    <p className="text-sm text-white/60 mb-3">
                      Automatically log out after period of inactivity
                    </p>
                    <select className="px-4 py-2 bg-white/[0.05] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#f7c900]/50">
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>Never</option>
                    </select>
                  </div>

                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <h4 className="text-red-400 font-medium mb-2 flex items-center gap-2">
                      <span className="i-lucide-alert-triangle" />
                      Danger Zone
                    </h4>
                    <p className="text-sm text-red-300/80 mb-3">
                      Reset all settings to default values
                    </p>
                    <button className="px-4 py-2 bg-red-500/20 text-red-400 font-semibold rounded-lg hover:bg-red-500/30 transition-colors text-sm border border-red-500/30">
                      Reset to Defaults
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSettingsSidebar;
