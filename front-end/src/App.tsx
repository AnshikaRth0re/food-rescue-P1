import React, { useState } from 'react';
import {
  NavigationTab,
  UserRole,
  FoodItem,
  DeliveryPickup,
  UserProfile,
} from './types';
import {
  INITIAL_USER_PROFILES,
  INITIAL_FOOD_ITEMS,
  INITIAL_ACTIVE_PICKUPS,
} from './data/initialData';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { AvailableFoodScreen } from './components/AvailableFoodScreen';
import { DonorDashboard } from './components/DonorDashboard';
import { VolunteerDashboard } from './components/VolunteerDashboard';
import { CreateDonationScreen } from './components/CreateDonationScreen';
import { LoginScreen } from './components/LoginScreen';
import { AlertsScreen } from './components/AlertsScreen';

export function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('volunteer');
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [foodItems, setFoodItems] = useState<FoodItem[]>(INITIAL_FOOD_ITEMS);
  const [pickups, setPickups] = useState<DeliveryPickup[]>(INITIAL_ACTIVE_PICKUPS);
  const [profiles, setProfiles] = useState<Record<string, UserProfile>>(INITIAL_USER_PROFILES);

  // Modal & Toast States
  const [claimModalItem, setClaimModalItem] = useState<FoodItem | null>(null);
  const [issueModalPickup, setIssueModalPickup] = useState<DeliveryPickup | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentUser = profiles[currentRole] || profiles['volunteer'];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };
  const handleSelectTab = (tab: string) => {

  const token = localStorage.getItem("token");

  if (tab === "donate" && !token) {
    alert("Please login first!");
    setCurrentScreen("login");
    return;
  }

  setCurrentScreen(tab); 
};
  const handleSwitchRole = (role: UserRole) => {
    setCurrentRole(role);
    showToast(`Switched view to ${role.toUpperCase()} role`);
  };

  const handleCreateDonation = (newItem: FoodItem) => {
    setFoodItems((prev) => [newItem, ...prev]);
    setCurrentTab('donor-dashboard');
    showToast(`Successfully posted donation: "${newItem.title}"!`);
  };

  const handleDeleteDonation = (id: string) => {
    setFoodItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Donation listing removed.');
  };

  const handleConfirmClaim = () => {
    if (!claimModalItem) return;

    // Update food item
    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === claimModalItem.id
          ? { ...item, claimed: true, claimedBy: currentUser.name, status: 'Claimed' }
          : item
      )
    );

    // Create a new delivery pickup for volunteer/NGO workflow
    const newPickup: DeliveryPickup = {
      id: `pickup-${Date.now()}`,
      foodTitle: claimModalItem.title,
      donorName: claimModalItem.donorName,
      pickupAddress: claimModalItem.location,
      deliveryNgo: currentUser.role === 'ngo' ? currentUser.name : 'Hope Community Kitchen',
      deliveryAddress: '456 Shelter Ave, Westside',
      status: 'accepted',
      distance: claimModalItem.distance,
      isUrgent: claimModalItem.isUrgent || false,
      mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZFfsUOQZcrViO1iI0wPWxoLF3LfeioU_gglmiYi82Ma6Ga9kdRxEI8Xd9IALalFPK7i29dW8dqgiqUUIoDWgbWrwA2cf4sqSJXuuF-b8ivi-S1yTzhN9b_XO2KCarV27bGAvRBx-AWx1afQrNgUZKQlRFwZFCx_q5uovti5NSkBz_fgxcKHT0E7j8B2Y3e3YGBplLDpsJoPa4J0bBf1n0_YqPKncdIr8IGIy2chYrDRXKf7uFFkE',
    };

    setPickups((prev) => [newPickup, ...prev]);

    // Update profile stats
    setProfiles((prev) => ({
      ...prev,
      [currentRole]: {
        ...prev[currentRole],
        rescuedKg: (prev[currentRole]?.rescuedKg || 100) + 15,
      },
    }));

    showToast(`Claimed "${claimModalItem.title}"! Added to pickup schedule.`);
    setClaimModalItem(null);
    if (currentRole === 'volunteer') {
      setCurrentTab('volunteer-dashboard');
    }
  };

  const handleUpdatePickupStatus = (
    id: string,
    newStatus: 'accepted' | 'picked_up' | 'delivered'
  ) => {
    setPickups((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );

    if (newStatus === 'delivered') {
      setProfiles((prev) => ({
        ...prev,
        volunteer: {
          ...prev.volunteer,
          completedDeliveries: prev.volunteer.completedDeliveries + 1,
          distanceCoveredKm: prev.volunteer.distanceCoveredKm + 3,
        },
      }));
      showToast('🎉 Delivery completed! Impact stats updated.');
    } else {
      showToast(`Pickup status updated to ${newStatus.replace('_', ' ').toUpperCase()}`);
    }
  };

  const handleLogin = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'donor') setCurrentTab('donor-dashboard');
    else if (role === 'volunteer') setCurrentTab('volunteer-dashboard');
    else setCurrentTab('available');
    showToast(`Logged in successfully as ${role.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#141b2b] flex flex-col font-['Inter',sans-serif]">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#141b2b] text-white px-5 py-3 rounded-xl shadow-lg border border-[#22c55e]/40 flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[#22c55e] fill-1">
            check_circle
          </span>
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currentUser={currentUser}
        onSwitchRole={handleSwitchRole}
      />

      <div className="flex flex-1 w-full relative">
        {/* Persistent Desktop Sidebar */}
        {currentTab !== 'home' && currentTab !== 'login' && (
          <Sidebar
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
            currentUser={currentUser}
            onSwitchRole={handleSwitchRole}
          />
        )}

        {/* View Switcher Content */}
        <main className="flex-1 flex flex-col w-full min-w-0 pb-20 md:pb-8">
          {currentTab === 'home' && (
            <HomeScreen onSelectTab={setCurrentTab} onSwitchRole={handleSwitchRole} />
          )}

          {currentTab === 'available' && (
            <AvailableFoodScreen
              foodItems={foodItems}
              onClaimFood={(item) => setClaimModalItem(item)}
              onSelectTab={setCurrentTab}
            />
          )}

          {currentTab === 'donor-dashboard' && (
            <DonorDashboard
              currentUser={profiles.donor}
              donations={foodItems}
              onSelectTab={setCurrentTab}
              onDeleteDonation={handleDeleteDonation}
            />
          )}

          {currentTab === 'volunteer-dashboard' && (
            <VolunteerDashboard
              currentUser={profiles.volunteer}
              pickups={pickups}
              onUpdatePickupStatus={handleUpdatePickupStatus}
              onReportIssue={(p) => setIssueModalPickup(p)}
            />
          )}

          {currentTab === 'donate' && (
            <CreateDonationScreen
              currentUser={currentUser}
              onCreateDonation={handleCreateDonation}
              onCancel={() => setCurrentTab('home')}
            />
          )}

          {currentTab === 'login' && (
            <LoginScreen onLogin={handleLogin} currentUser={currentUser} />
          )}

          {currentTab === 'alerts' && (
            <AlertsScreen
              foodItems={foodItems}
              pickups={pickups}
              onSelectTab={setCurrentTab}
            />
          )}
        </main>
      </div>

      {/* Mobile Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currentUser={currentUser}
      />

      {/* Claim Food Confirmation Modal */}
      {claimModalItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dce2f7] space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold text-[#141b2b]">
                Claim Surplus Food
              </h3>
              <button
                onClick={() => setClaimModalItem(null)}
                className="text-[#6d7b6c] hover:text-[#141b2b] text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-4 bg-[#f1f3ff] p-3 rounded-xl">
              <img
                src={claimModalItem.imageUrl}
                alt={claimModalItem.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-bold text-sm text-[#141b2b]">
                  {claimModalItem.title}
                </h4>
                <p className="text-xs text-[#3d4a3d]">
                  {claimModalItem.quantity} • {claimModalItem.donorName}
                </p>
                <p className="text-xs text-[#006e2f] font-semibold mt-0.5">
                  Expires: {claimModalItem.expiresInText}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#141b2b] mb-1">
                Select Pickup Window
              </label>
              <select className="w-full text-xs p-2.5 rounded-lg border border-[#bccbb9] bg-white">
                <option>Within 30 minutes (Urgent)</option>
                <option>Within 1 hour</option>
                <option>Within 2 hours</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setClaimModalItem(null)}
                className="px-4 py-2 border border-[#bccbb9] rounded-xl text-xs font-semibold text-[#141b2b] hover:bg-[#f1f3ff]"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmClaim}
                className="px-5 py-2 bg-[#22c55e] text-white rounded-xl text-xs font-semibold hover:bg-[#16a34a] shadow-xs"
              >
                Confirm Claim & Add Pickup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Issue Reporting Modal */}
      {issueModalPickup && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dce2f7] space-y-4">
            <h3 className="text-lg font-bold text-[#141b2b]">
              Report Logistics Issue
            </h3>
            <p className="text-xs text-[#3d4a3d]">
              Notify donor & dispatch team for "{issueModalPickup.foodTitle}".
            </p>

            <select className="w-full text-xs p-2.5 rounded-lg border border-[#bccbb9]">
              <option>Traffic Delay (+15 mins)</option>
              <option>Packaging/Container damaged</option>
              <option>Donor location unreachable</option>
              <option>Other issue</option>
            </select>

            <textarea
              placeholder="Describe details..."
              rows={3}
              className="w-full text-xs p-2.5 rounded-lg border border-[#bccbb9]"
            ></textarea>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIssueModalPickup(null)}
                className="px-4 py-2 border border-[#bccbb9] rounded-xl text-xs font-semibold text-[#141b2b]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  showToast('Issue report submitted to FoodRescue dispatch team.');
                  setIssueModalPickup(null);
                }}
                className="px-5 py-2 bg-[#006e2f] text-white rounded-xl text-xs font-semibold hover:bg-[#005321]"
              >
                Send Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
