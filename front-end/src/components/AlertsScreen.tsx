import React, { useState } from 'react';
import { FoodItem, DeliveryPickup } from '../types';

interface AlertsScreenProps {
  foodItems: FoodItem[];
  pickups: DeliveryPickup[];
  onSelectTab: (tab: string) => void;
}

export const AlertsScreen: React.FC<AlertsScreenProps> = ({
  foodItems,
  pickups,
  onSelectTab,
}) => {
  const [filter, setFilter] = useState<'all' | 'urgent' | 'system'>('all');

  const alertsList = [
    {
      id: 'alert-1',
      type: 'urgent',
      title: 'Urgent Food Rescue Needed!',
      message: 'Gourmet Vegetable Curry (20 plates) expires in 45 minutes at Grand Plaza Hotel.',
      time: '10 mins ago',
      icon: 'timer',
      actionTab: 'available',
    },
    {
      id: 'alert-2',
      type: 'activity',
      title: 'Donation Claimed',
      message: 'Hope Community Kitchen claimed 8 units of Prepared Salads.',
      time: '25 mins ago',
      icon: 'check_circle',
      actionTab: 'donor-dashboard',
    },
    {
      id: 'alert-3',
      type: 'system',
      title: 'Impact Milestone Unlocked! 🎉',
      message: 'FoodRescue community reached 10,250+ total meals rescued!',
      time: '2 hours ago',
      icon: 'verified',
      actionTab: 'home',
    },
    {
      id: 'alert-[#4]',
      type: 'activity',
      title: 'Pickup In Progress',
      message: 'Volunteer Alex picked up Fresh Produce Assortment from Local Greens Market.',
      time: '3 hours ago',
      icon: 'local_shipping',
      actionTab: 'volunteer-dashboard',
    },
  ];

  const filteredAlerts = alertsList.filter((item) => {
    if (filter === 'urgent') return item.type === 'urgent';
    if (filter === 'system') return item.type === 'system';
    return true;
  });

  return (
    <div className="w-full flex-1 flex flex-col p-4 md:p-8 max-w-[1280px] mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#141b2b]">
            Activity Alerts & Notifications
          </h1>
          <p className="text-sm text-[#3d4a3d] mt-1">
            Real-time rescue notifications, pickup status updates, and community milestones.
          </p>
        </div>

        <button
          onClick={() => alert('All notifications marked as read.')}
          className="text-xs text-[#006e2f] hover:underline font-bold"
        >
          Mark All Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            filter === 'all'
              ? 'bg-[#006e2f] text-white'
              : 'bg-white border border-[#bccbb9] text-[#3d4a3d]'
          }`}
        >
          All Activity
        </button>
        <button
          onClick={() => setFilter('urgent')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            filter === 'urgent'
              ? 'bg-[#fea619] text-[#684000]'
              : 'bg-white border border-[#bccbb9] text-[#3d4a3d]'
          }`}
        >
          Urgent Rescues
        </button>
        <button
          onClick={() => setFilter('system')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            filter === 'system'
              ? 'bg-[#22c55e] text-white'
              : 'bg-white border border-[#bccbb9] text-[#3d4a3d]'
          }`}
        >
          Milestones
        </button>
      </div>

      {/* Alerts Feed */}
      <div className="bg-white rounded-2xl border border-[#dce2f7] shadow-xs divide-y divide-[#f1f3ff] mb-12 overflow-hidden">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className="p-5 flex items-start justify-between gap-4 hover:bg-[#f9f9ff] transition-colors"
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  alert.type === 'urgent'
                    ? 'bg-[#fea619]/20 text-[#855300]'
                    : alert.type === 'system'
                    ? 'bg-[#22c55e]/20 text-[#006e2f]'
                    : 'bg-[#e1e8fd] text-[#141b2b]'
                }`}
              >
                <span className="material-symbols-outlined text-xl">{alert.icon}</span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#141b2b]">{alert.title}</h4>
                <p className="text-xs text-[#3d4a3d] mt-0.5 leading-relaxed">
                  {alert.message}
                </p>
                <span className="text-[11px] text-[#6d7b6c] mt-1 inline-block">
                  {alert.time}
                </span>
              </div>
            </div>

            <button
              onClick={() => onSelectTab(alert.actionTab)}
              className="text-xs font-bold text-[#006e2f] hover:underline whitespace-nowrap pt-1"
            >
              View →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
