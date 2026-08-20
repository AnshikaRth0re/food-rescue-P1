import React from 'react';
import { NavigationTab, UserProfile } from '../types';

interface BottomNavProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  currentUser: UserProfile;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-safe bg-white dark:bg-[#141b2b] border-t border-[#e9edff] dark:border-[#293040] h-16 md:hidden shadow-[0px_-2px_10px_rgba(0,0,0,0.05)] rounded-t-xl">
      <button
        onClick={() => onSelectTab('home')}
        className={`flex flex-col items-center justify-center px-3 py-1 transition-all cursor-pointer ${
          currentTab === 'home'
            ? 'bg-[#22c55e] text-white rounded-full px-4 py-1 font-semibold scale-95 shadow-xs'
            : 'text-[#3d4a3d] dark:text-[#bccbb9] hover:text-[#006e2f]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-xl ${
            currentTab === 'home' ? 'fill-1' : ''
          }`}
        >
          home
        </span>
        <span className="text-[11px] font-semibold mt-0.5">Home</span>
      </button>

      <button
        onClick={() => onSelectTab('available')}
        className={`flex flex-col items-center justify-center px-3 py-1 transition-all cursor-pointer ${
          currentTab === 'available'
            ? 'bg-[#22c55e] text-white rounded-full px-4 py-1 font-semibold scale-95 shadow-xs'
            : 'text-[#3d4a3d] dark:text-[#bccbb9] hover:text-[#006e2f]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-xl ${
            currentTab === 'available' ? 'fill-1' : ''
          }`}
        >
          dashboard
        </span>
        <span className="text-[11px] font-semibold mt-0.5">Available</span>
      </button>

      <button
        onClick={() => onSelectTab('donate')}
        className={`flex flex-col items-center justify-center px-3 py-1 transition-all cursor-pointer ${
          currentTab === 'donate'
            ? 'bg-[#22c55e] text-white rounded-full px-4 py-1 font-semibold scale-95 shadow-xs'
            : 'text-[#3d4a3d] dark:text-[#bccbb9] hover:text-[#006e2f]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-xl ${
            currentTab === 'donate' ? 'fill-1' : ''
          }`}
        >
          add_circle
        </span>
        <span className="text-[11px] font-semibold mt-0.5">Donate</span>
      </button>

      <button
        onClick={() => onSelectTab('alerts')}
        className={`flex flex-col items-center justify-center px-3 py-1 transition-all cursor-pointer ${
          currentTab === 'alerts'
            ? 'bg-[#22c55e] text-white rounded-full px-4 py-1 font-semibold scale-95 shadow-xs'
            : 'text-[#3d4a3d] dark:text-[#bccbb9] hover:text-[#006e2f]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-xl ${
            currentTab === 'alerts' ? 'fill-1' : ''
          }`}
        >
          notifications
        </span>
        <span className="text-[11px] font-semibold mt-0.5">Alerts</span>
      </button>

      <button
        onClick={() => {
          if (currentUser.role === 'donor') onSelectTab('donor-dashboard');
          else if (currentUser.role === 'volunteer') onSelectTab('volunteer-dashboard');
          else onSelectTab('login');
        }}
        className={`flex flex-col items-center justify-center px-3 py-1 transition-all cursor-pointer ${
          currentTab === 'donor-dashboard' ||
          currentTab === 'volunteer-dashboard' ||
          currentTab === 'login'
            ? 'bg-[#22c55e] text-white rounded-full px-4 py-1 font-semibold scale-95 shadow-xs'
            : 'text-[#3d4a3d] dark:text-[#bccbb9] hover:text-[#006e2f]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-xl ${
            currentTab === 'login' || currentTab === 'donor-dashboard' ? 'fill-1' : ''
          }`}
        >
          person
        </span>
        <span className="text-[11px] font-semibold mt-0.5">Profile</span>
      </button>
    </nav>
  );
};
