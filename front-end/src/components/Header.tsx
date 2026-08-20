import React from 'react';
import { NavigationTab, UserRole, UserProfile } from '../types';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  currentUser: UserProfile;
  onSwitchRole: (role: UserRole) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  onSwitchRole,
}) => {
  return (
    <header className="bg-white dark:bg-[#141b2b] border-b border-[#e9edff] dark:border-[#293040] shadow-sm sticky top-0 z-40 transition-colors">
      <div className="flex justify-between items-center w-full px-4 md:px-10 py-3.5 max-w-[1280px] mx-auto">
        {/* Brand Logo */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2 text-left focus:outline-none group"
        >
          <span className="material-symbols-outlined text-[#006e2f] dark:text-[#4ae176] text-3xl fill-1 group-hover:scale-110 transition-transform">
            eco
          </span>
          <span className="font-bold text-xl md:text-2xl text-[#006e2f] dark:text-[#4ae176] tracking-tight">
            FoodRescue
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex gap-1 items-center bg-[#f1f3ff] dark:bg-[#293040] p-1 rounded-full">
          <button
            onClick={() => onSelectTab('home')}
            className={`font-medium text-sm px-4 py-2 rounded-full transition-all ${
              currentTab === 'home'
                ? 'bg-white dark:bg-[#141b2b] text-[#006e2f] dark:text-[#4ae176] shadow-sm font-semibold'
                : 'text-[#3d4a3d] dark:text-[#bccbb9] hover:text-[#006e2f]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onSelectTab('available')}
            className={`font-medium text-sm px-4 py-2 rounded-full transition-all ${
              currentTab === 'available'
                ? 'bg-white dark:bg-[#141b2b] text-[#006e2f] dark:text-[#4ae176] shadow-sm font-semibold'
                : 'text-[#3d4a3d] dark:text-[#bccbb9] hover:text-[#006e2f]'
            }`}
          >
            Available Food
          </button>
          {currentUser.role === 'donor' && (
            <button
              onClick={() => onSelectTab('donor-dashboard')}
              className={`font-medium text-sm px-4 py-2 rounded-full transition-all ${
                currentTab === 'donor-dashboard'
                  ? 'bg-white dark:bg-[#141b2b] text-[#006e2f] dark:text-[#4ae176] shadow-sm font-semibold'
                  : 'text-[#3d4a3d] dark:text-[#bccbb9] hover:text-[#006e2f]'
              }`}
            >
              Donor Dashboard
            </button>
          )}
          {currentUser.role === 'volunteer' && (
            <button
              onClick={() => onSelectTab('volunteer-dashboard')}
              className={`font-medium text-sm px-4 py-2 rounded-full transition-all ${
                currentTab === 'volunteer-dashboard'
                  ? 'bg-white dark:bg-[#141b2b] text-[#006e2f] dark:text-[#4ae176] shadow-sm font-semibold'
                  : 'text-[#3d4a3d] dark:text-[#bccbb9] hover:text-[#006e2f]'
              }`}
            >
              Volunteer Dashboard
            </button>
          )}
        </nav>

        {/* Right CTA & Role Selector */}
        <div className="flex items-center gap-3">
          {/* Quick Demo Role Selector */}
          <div className="relative group hidden sm:block">
            <select
              value={currentUser.role}
              onChange={(e) => onSwitchRole(e.target.value as UserRole)}
              className="appearance-none bg-[#f1f3ff] dark:bg-[#293040] text-[#141b2b] dark:text-[#edf0ff] font-medium text-xs py-2 pl-3 pr-8 rounded-full border border-[#bccbb9]/40 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
            >
              <option value="guest">Role: Guest</option>
              <option value="donor">Role: Donor (Healthy Kitchen)</option>
              <option value="ngo">Role: NGO (Hope Shelter)</option>
              <option value="volunteer">Role: Volunteer (Alex)</option>
            </select>
            <span className="material-symbols-outlined text-xs text-[#6d7b6c] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              expand_more
            </span>
          </div>

          <button
            onClick={() => onSelectTab('donate')}
            className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold text-sm px-4 py-2 rounded-lg h-[40px] flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            <span>Donate Food</span>
          </button>

          {currentUser.role === 'guest' ? (
            <button
              onClick={() => onSelectTab('login')}
              className="hidden sm:flex border border-[#6d7b6c] text-[#141b2b] hover:bg-[#f1f3ff] font-medium text-sm px-4 py-2 rounded-lg h-[40px] items-center justify-center transition-colors cursor-pointer"
            >
              Log In
            </button>
          ) : (
            <button
              onClick={() => onSelectTab('login')}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-[#f1f3ff] transition-colors cursor-pointer"
              title="View User Profile / Switch Account"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-[#22c55e]"
              />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
