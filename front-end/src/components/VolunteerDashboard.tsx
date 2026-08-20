import React, { useState } from 'react';
import { DeliveryPickup, UserProfile } from '../types';

interface VolunteerDashboardProps {
  currentUser: UserProfile;
  pickups: DeliveryPickup[];
  onUpdatePickupStatus: (id: string, status: 'accepted' | 'picked_up' | 'delivered') => void;
  onReportIssue: (pickup: DeliveryPickup) => void;
}

export const VolunteerDashboard: React.FC<VolunteerDashboardProps> = ({
  currentUser,
  pickups,
  onUpdatePickupStatus,
  onReportIssue,
}) => {
  const [routeNote, setRouteNote] = useState<string | null>(null);

  const activePickup = pickups.find((p) => p.status !== 'delivered') || pickups[0];

  const handleAdvanceStatus = () => {
    if (!activePickup) return;
    if (activePickup.status === 'accepted') {
      onUpdatePickupStatus(activePickup.id, 'picked_up');
    } else if (activePickup.status === 'picked_up') {
      onUpdatePickupStatus(activePickup.id, 'delivered');
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col p-4 md:p-8 max-w-[1280px] mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#141b2b] mb-2">
          Volunteer Dashboard
        </h1>
        <p className="text-base text-[#3d4a3d]">
          Here's your active impact and current tasks.
        </p>
      </header>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] border border-[#e1e8fd] flex items-center gap-4 hover:border-[#22c55e]/30 transition-all">
          <div className="w-12 h-12 rounded-full bg-[#22c55e]/10 flex items-center justify-center text-[#22c55e] shrink-0">
            <span className="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <div>
            <p className="text-xs font-bold text-[#3d4a3d] mb-0.5">Completed Deliveries</p>
            <p className="text-3xl font-bold text-[#141b2b]">
              {currentUser.completedDeliveries || 84}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] border border-[#e1e8fd] flex items-center gap-4 hover:border-[#22c55e]/30 transition-all">
          <div className="w-12 h-12 rounded-full bg-[#fea619]/20 flex items-center justify-center text-[#855300] shrink-0">
            <span className="material-symbols-outlined text-2xl">route</span>
          </div>
          <div>
            <p className="text-xs font-bold text-[#3d4a3d] mb-0.5">Distance Covered</p>
            <p className="text-3xl font-bold text-[#141b2b]">
              {currentUser.distanceCoveredKm || 210}
              <span className="text-sm font-normal text-[#3d4a3d] ml-1">km</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Active Pickups Column */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-[#141b2b] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#fea619] pulse-orange"></span>
            <span>Active Pickups</span>
          </h2>

          {activePickup ? (
            <div className="bg-white rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] border border-[#e1e8fd] overflow-hidden">
              {/* Map Banner */}
              <div
                className="h-48 w-full bg-[#e1e8fd] relative overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url('${activePickup.mapImageUrl}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full border border-[#e1e8fd] shadow-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
                  <span className="text-xs font-semibold text-[#141b2b]">
                    In Progress - {activePickup.distance}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-6 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-[#141b2b] mb-1">
                      {activePickup.foodTitle}
                    </h3>
                    <p className="text-xs text-[#3d4a3d] flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-sm">store</span>
                      Donated by <span className="font-semibold">{activePickup.donorName}</span>
                    </p>
                  </div>

                  <span className="bg-[#fea619]/20 text-[#855300] text-xs font-semibold px-3 py-1 rounded-full border border-[#fea619]/30 shrink-0">
                    Urgent Pickup
                  </span>
                </div>

                {/* Logistics route details */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="flex-1 flex gap-3">
                    <div className="flex flex-col items-center mt-1">
                      <span className="material-symbols-outlined text-[#6d7b6c] text-lg">
                        location_on
                      </span>
                      <div className="w-px h-10 bg-[#bccbb9] my-1"></div>
                      <span className="material-symbols-outlined text-[#22c55e] text-lg">
                        flag
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[11px] font-bold text-[#3d4a3d] uppercase tracking-wider">
                          Pickup Location
                        </p>
                        <p className="text-sm font-medium text-[#141b2b]">
                          {activePickup.pickupAddress}
                        </p>
                      </div>

                      <div className="mt-4">
                        <p className="text-[11px] font-bold text-[#3d4a3d] uppercase tracking-wider">
                          Delivery (NGO)
                        </p>
                        <p className="text-sm font-bold text-[#141b2b]">
                          {activePickup.deliveryNgo}
                        </p>
                        <p className="text-sm text-[#3d4a3d]">
                          {activePickup.deliveryAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stepper */}
                <div className="mb-8 bg-[#f1f3ff] p-4 rounded-xl border border-[#dce2f7]">
                  <p className="text-[11px] font-bold text-[#3d4a3d] mb-4 uppercase tracking-wider">
                    Delivery Progress Status
                  </p>
                  <div className="flex items-center w-full justify-between">
                    {/* Step 1: Accepted */}
                    <div className="flex flex-col items-center flex-1">
                      <div className="w-8 h-8 rounded-full bg-[#22c55e] text-white flex items-center justify-center mb-1 shadow-xs">
                        <span className="material-symbols-outlined text-sm font-bold">
                          check
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#141b2b]">Accepted</span>
                    </div>

                    <div
                      className={`flex-1 h-1 -mx-4 ${
                        activePickup.status === 'picked_up' || activePickup.status === 'delivered'
                          ? 'bg-[#22c55e]'
                          : 'bg-[#dce2f7]'
                      }`}
                    ></div>

                    {/* Step 2: Picked Up */}
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 shadow-xs ${
                          activePickup.status === 'picked_up' || activePickup.status === 'delivered'
                            ? 'bg-[#22c55e] text-white ring-4 ring-[#22c55e]/20'
                            : 'bg-[#dce2f7] text-[#6d7b6c]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          local_shipping
                        </span>
                      </div>
                      <span
                        className={`text-xs font-bold ${
                          activePickup.status === 'picked_up'
                            ? 'text-[#006e2f]'
                            : 'text-[#141b2b]'
                        }`}
                      >
                        Picked Up
                      </span>
                    </div>

                    <div
                      className={`flex-1 h-1 -mx-4 ${
                        activePickup.status === 'delivered' ? 'bg-[#22c55e]' : 'bg-[#dce2f7]'
                      }`}
                    ></div>

                    {/* Step 3: Delivered */}
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                          activePickup.status === 'delivered'
                            ? 'bg-[#22c55e] text-white'
                            : 'bg-[#dce2f7] text-[#6d7b6c]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">home</span>
                      </div>
                      <span className="text-xs font-semibold text-[#3d4a3d]">
                        Delivered
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 border-t border-[#f1f3ff] pt-6">
                  <button
                    onClick={() => onReportIssue(activePickup)}
                    className="h-[44px] px-6 rounded-xl border border-[#bccbb9] text-[#141b2b] hover:bg-[#f1f3ff] transition-colors font-semibold text-sm cursor-pointer"
                  >
                    Issue / Delay
                  </button>

                  <button
                    onClick={handleAdvanceStatus}
                    className="h-[44px] px-6 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>
                      {activePickup.status === 'accepted'
                        ? 'Confirm Picked Up'
                        : activePickup.status === 'picked_up'
                        ? 'Mark as Delivered'
                        : 'Completed!'}
                    </span>
                    <span className="material-symbols-outlined text-lg">done_all</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 border border-[#e1e8fd] text-center">
              <span className="material-symbols-outlined text-4xl text-[#22c55e] mb-2">
                verified
              </span>
              <h3 className="text-lg font-bold text-[#141b2b]">
                No active pickups right now!
              </h3>
              <p className="text-xs text-[#3d4a3d] mt-1 mb-4">
                You have completed all pending deliveries. Check Available Food to claim new rescues!
              </p>
            </div>
          )}
        </div>

        {/* Sidebar / Quick Actions */}
        <div className="space-y-6">
          <div className="bg-[#f1f3ff] rounded-2xl p-6 border border-[#dce2f7]">
            <h3 className="font-bold text-base text-[#141b2b] mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setRouteNote('Optimal route calculated via Downtown Expressway: ~12 mins.')}
                className="w-full text-left p-4 rounded-xl bg-white border border-[#e1e8fd] hover:border-[#22c55e]/30 transition-all flex items-center gap-3 cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[#006e2f]">history</span>
                <div>
                  <p className="font-semibold text-xs text-[#141b2b]">
                    View Route History
                  </p>
                  <p className="text-[11px] text-[#3d4a3d]">Check past delivery stats</p>
                </div>
              </button>

              <button
                onClick={() => alert('Dispatch support contacted. Agent available 24/7.')}
                className="w-full text-left p-4 rounded-xl bg-white border border-[#e1e8fd] hover:border-[#22c55e]/30 transition-all flex items-center gap-3 cursor-pointer shadow-2xs"
              >
                <span className="material-symbols-outlined text-[#006e2f]">
                  support_agent
                </span>
                <div>
                  <p className="font-semibold text-xs text-[#141b2b]">
                    Contact Support
                  </p>
                  <p className="text-[11px] text-[#3d4a3d]">Get live help with pickup</p>
                </div>
              </button>
            </div>

            {routeNote && (
              <div className="mt-4 p-3 bg-white rounded-xl border border-[#22c55e]/30 text-xs text-[#141b2b]">
                <strong>Route Note:</strong> {routeNote}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
