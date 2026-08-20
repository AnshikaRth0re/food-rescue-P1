import React from 'react';
import { NavigationTab, UserProfile, UserRole } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  currentUser: UserProfile;
  onSwitchRole: (role: UserRole) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onSwitchRole,
}) => {
  return (
    <aside className="hidden md:flex flex-col h-full border-r border-[#bccbb9]/40 bg-[#f1f3ff] w-72 lg:w-80 shrink-0 sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
      <div className="p-6 flex flex-col h-full">
        {/* User Card */}
        <div className="flex items-center gap-3 mb-6 p-3.5 rounded-xl bg-white shadow-sm border border-[#e1e8fd]">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-12 h-12 rounded-full object-cover shrink-0 shadow-sm border border-[#22c55e]/30"
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-base text-[#141b2b] truncate">
              {currentUser.name}
            </h3>
            <p className="text-xs text-[#3d4a3d] font-medium">
              Impact Level {currentUser.impactLevel}
            </p>
            <p className="text-xs font-semibold text-[#855300] mt-0.5">
              {currentUser.rescuedKg}kg Rescued
            </p>
          </div>
        </div>

        {/* Role Quick Switcher Pills */}
        <div className="mb-6 bg-white p-2 rounded-xl border border-[#e1e8fd]">
          <p className="text-[11px] font-bold text-[#6d7b6c] uppercase tracking-wider mb-1.5 px-2">
            Switch View Role:
          </p>
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => onSwitchRole('donor')}
              className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-colors ${
                currentUser.role === 'donor'
                  ? 'bg-[#22c55e] text-white font-semibold shadow-xs'
                  : 'bg-[#f1f3ff] text-[#3d4a3d] hover:bg-[#e9edff]'
              }`}
            >
              Donor
            </button>
            <button
              onClick={() => onSwitchRole('ngo')}
              className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-colors ${
                currentUser.role === 'ngo'
                  ? 'bg-[#22c55e] text-white font-semibold shadow-xs'
                  : 'bg-[#f1f3ff] text-[#3d4a3d] hover:bg-[#e9edff]'
              }`}
            >
              NGO
            </button>
            <button
              onClick={() => onSwitchRole('volunteer')}
              className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-colors ${
                currentUser.role === 'volunteer'
                  ? 'bg-[#22c55e] text-white font-semibold shadow-xs'
                  : 'bg-[#f1f3ff] text-[#3d4a3d] hover:bg-[#e9edff]'
              }`}
            >
              Volunteer
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5 flex-1">
          <button
            onClick={() => onSelectTab('home')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              currentTab === 'home'
                ? 'bg-[#fea619] text-[#684000] font-semibold shadow-sm'
                : 'text-[#3d4a3d] hover:bg-[#e1e8fd]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">analytics</span>
            <span>Overview</span>
          </button>

          <button
            onClick={() => onSelectTab('available')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              currentTab === 'available'
                ? 'bg-[#fea619] text-[#684000] font-semibold shadow-sm'
                : 'text-[#3d4a3d] hover:bg-[#e1e8fd]'
            }`}
          >
            <span className="material-symbols-outlined text-xl fill-1">
              local_pizza
            </span>
            <span>Available Food</span>
          </button>

          {currentUser.role === 'donor' && (
            <button
              onClick={() => onSelectTab('donor-dashboard')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                currentTab === 'donor-dashboard'
                  ? 'bg-[#fea619] text-[#684000] font-semibold shadow-sm'
                  : 'text-[#3d4a3d] hover:bg-[#e1e8fd]'
              }`}
            >
              <span className="material-symbols-outlined text-xl">dashboard</span>
              <span>Donor Impact</span>
            </button>
          )}

          {currentUser.role === 'volunteer' && (
            <button
              onClick={() => onSelectTab('volunteer-dashboard')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                currentTab === 'volunteer-dashboard'
                  ? 'bg-[#fea619] text-[#684000] font-semibold shadow-sm'
                  : 'text-[#3d4a3d] hover:bg-[#e1e8fd]'
              }`}
            >
              <span className="material-symbols-outlined text-xl">insights</span>
              <span>Volunteer Dashboard</span>
            </button>
          )}

          <button
            onClick={() => onSelectTab('donate')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              currentTab === 'donate'
                ? 'bg-[#fea619] text-[#684000] font-semibold shadow-sm'
                : 'text-[#3d4a3d] hover:bg-[#e1e8fd]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">volunteer_activism</span>
            <span>Donate Surplus</span>
          </button>

          <button
            onClick={() => onSelectTab('alerts')}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              currentTab === 'alerts'
                ? 'bg-[#fea619] text-[#684000] font-semibold shadow-sm'
                : 'text-[#3d4a3d] hover:bg-[#e1e8fd]'
            }`}
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span>Alerts & Activity</span>
          </button>

          <button
            onClick={() => onSelectTab('login')}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[#3d4a3d] hover:bg-[#e1e8fd] transition-all cursor-pointer mt-auto"
          >
            <span className="material-symbols-outlined text-xl">settings</span>
            <span>Account Settings</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};
