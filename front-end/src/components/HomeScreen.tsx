import React from 'react';
import { NavigationTab, UserRole } from '../types';

interface HomeScreenProps {
  onSelectTab: (tab: NavigationTab) => void;
  onSwitchRole: (role: UserRole) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectTab, onSwitchRole }) => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="px-4 md:px-10 py-12 md:py-20 max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-16 w-full">
        <div className="flex-1 flex flex-col gap-6 items-start">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#141b2b] tracking-tight leading-tight">
            Turn Surplus Food Into Someone's Meal.
          </h1>
          <p className="text-lg md:text-xl text-[#3d4a3d] max-w-xl leading-relaxed">
            Connect excess food from restaurants and events with local NGOs and volunteers. Join our community-driven platform to reduce waste and fight hunger efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
            <button
              onClick={() => onSelectTab('donate')}
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold text-base px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">volunteer_activism</span>
              <span>Donate Food</span>
            </button>
            <button
              onClick={() => onSelectTab('available')}
              className="bg-transparent border border-[#6d7b6c] text-[#141b2b] hover:bg-[#e9edff] font-semibold text-base px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">search</span>
              <span>Find Food</span>
            </button>
          </div>
        </div>

        <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[480px] rounded-2xl overflow-hidden shadow-[0px_10px_20px_-3px_rgba(0,0,0,0.08)] bg-[#f1f3ff] border border-[#dce2f7] flex items-center justify-center p-6">
          <div className="text-center flex flex-col items-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHgFniP_dWrLPl2BF4c6CNdvFBFMNXtSbaFYek0ermHQP69Itj5ZtzoPqhJbc4S3axcHbNsFTdo14xMZaVF11lMagiB4lyWZKG7SYmEYCQeBidAlzfBb7v5zWlGmuuJabBs6IfLon5QvgAn800E3WQRJ5H2HGh2jDlHUkUrTJwR19TM20cj_-F3qzAsAPj7etUr_OM5RaDn9fO2W_wxozpryNUbueYzOFiiDtKh1WUKHmJ_ojD7YA"
              alt="Food Rescue Graphic"
              className="w-full max-w-sm h-auto object-contain drop-shadow-md rounded-xl"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#e9edff] py-16 px-4 md:px-10 border-y border-[#dce2f7]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] border border-[#e1e8fd]">
            <span className="material-symbols-outlined text-[#22c55e] text-5xl mb-3">
              restaurant
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-[#141b2b] mb-1">
              10,250+
            </h3>
            <p className="text-xs font-bold text-[#3d4a3d] uppercase tracking-wider">
              Meals Rescued
            </p>
          </div>

          <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] border border-[#e1e8fd]">
            <span className="material-symbols-outlined text-[#22c55e] text-5xl mb-3">
              volunteer_activism
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-[#141b2b] mb-1">
              120+
            </h3>
            <p className="text-xs font-bold text-[#3d4a3d] uppercase tracking-wider">
              NGOs Connected
            </p>
          </div>

          <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] border border-[#e1e8fd]">
            <span className="material-symbols-outlined text-[#22c55e] text-5xl mb-3">
              local_shipping
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-[#141b2b] mb-1">
              8,500+
            </h3>
            <p className="text-xs font-bold text-[#3d4a3d] uppercase tracking-wider">
              Deliveries Completed
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-24 px-4 md:px-10 max-w-[1280px] mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#141b2b] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[#3d4a3d] max-w-2xl mx-auto">
            A seamless process to ensure surplus food reaches those who need it most, quickly and safely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl border border-[#dce2f7] hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center mb-6 text-[#006e2f]">
              <span className="material-symbols-outlined text-3xl">add_business</span>
            </div>
            <h3 className="text-xl font-bold text-[#141b2b] mb-2">1. Donate</h3>
            <p className="text-sm text-[#3d4a3d] leading-relaxed">
              Restaurants or event organizers list their surplus food inventory on the platform.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl border border-[#dce2f7] hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-[#fea619]/15 rounded-2xl flex items-center justify-center mb-6 text-[#855300]">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h3 className="text-xl font-bold text-[#141b2b] mb-2">2. Claim</h3>
            <p className="text-sm text-[#3d4a3d] leading-relaxed">
              Verified local NGOs browse available donations and claim what matches their needs.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl border border-[#dce2f7] hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-[#ff8a83]/20 rounded-2xl flex items-center justify-center mb-6 text-[#b91a24]">
              <span className="material-symbols-outlined text-3xl">directions_car</span>
            </div>
            <h3 className="text-xl font-bold text-[#141b2b] mb-2">3. Pick Up</h3>
            <p className="text-sm text-[#3d4a3d] leading-relaxed">
              Volunteers receive alerts and navigate to the pickup location to collect the food.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl border border-[#dce2f7] hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-[#22c55e]/10 rounded-2xl flex items-center justify-center mb-6 text-[#006e2f]">
              <span className="material-symbols-outlined text-3xl">home</span>
            </div>
            <h3 className="text-xl font-bold text-[#141b2b] mb-2">4. Deliver</h3>
            <p className="text-sm text-[#3d4a3d] leading-relaxed">
              The food is safely delivered to the NGO or direct distribution point.
            </p>
          </div>
        </div>
      </section>

      {/* Choose Your Role Section */}
      <section className="bg-[#f1f3ff] py-20 md:py-24 px-4 md:px-10 border-t border-[#dce2f7]">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#141b2b] mb-4">
              Choose Your Role
            </h2>
            <p className="text-lg text-[#3d4a3d] max-w-2xl mx-auto">
              Join the ecosystem. Whether you have food to give, logistics to offer, or mouths to feed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Donor Card */}
            <div className="bg-white p-8 rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] flex flex-col h-full hover:-translate-y-1 transition-all duration-300 border border-[#e1e8fd]">
              <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e]">
                <span className="material-symbols-outlined text-2xl">storefront</span>
              </div>
              <h3 className="text-2xl font-bold text-[#141b2b] mb-3">Donor</h3>
              <p className="text-sm text-[#3d4a3d] mb-8 flex-grow leading-relaxed">
                Perfect for restaurants, bakeries, caterers, and grocers with perfectly good surplus food at the end of the day.
              </p>
              <button
                onClick={() => {
                  onSwitchRole('donor');
                  onSelectTab('donor-dashboard');
                }}
                className="w-full bg-transparent border border-[#6d7b6c] text-[#141b2b] font-semibold text-sm px-4 py-3 rounded-xl hover:bg-[#f1f3ff] transition-colors cursor-pointer"
              >
                Register as Donor
              </button>
            </div>

            {/* NGO Card */}
            <div className="bg-white p-8 rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] flex flex-col h-full hover:-translate-y-1 transition-all duration-300 border-2 border-[#22c55e]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#22c55e] text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-xs">
                High Demand
              </div>
              <div className="w-12 h-12 bg-[#22c55e]/10 rounded-xl flex items-center justify-center mb-6 text-[#22c55e]">
                <span className="material-symbols-outlined text-2xl">group</span>
              </div>
              <h3 className="text-2xl font-bold text-[#141b2b] mb-3">NGO / Shelter</h3>
              <p className="text-sm text-[#3d4a3d] mb-8 flex-grow leading-relaxed">
                For organizations actively feeding communities. Access fresh, free ingredients to supplement your programs.
              </p>
              <button
                onClick={() => {
                  onSwitchRole('ngo');
                  onSelectTab('available');
                }}
                className="w-full bg-[#22c55e] text-white font-semibold text-sm px-4 py-3 rounded-xl hover:bg-[#16a34a] shadow-sm transition-all cursor-pointer"
              >
                Apply as NGO
              </button>
            </div>

            {/* Volunteer Card */}
            <div className="bg-white p-8 rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] flex flex-col h-full hover:-translate-y-1 transition-all duration-300 border border-[#e1e8fd]">
              <div className="w-12 h-12 bg-[#fea619]/20 rounded-xl flex items-center justify-center mb-6 text-[#855300]">
                <span className="material-symbols-outlined text-2xl">two_wheeler</span>
              </div>
              <h3 className="text-2xl font-bold text-[#141b2b] mb-3">Volunteer</h3>
              <p className="text-sm text-[#3d4a3d] mb-8 flex-grow leading-relaxed">
                Individuals with some free time and a vehicle. Be the crucial link that moves food from A to B.
              </p>
              <button
                onClick={() => {
                  onSwitchRole('volunteer');
                  onSelectTab('volunteer-dashboard');
                }}
                className="w-full bg-transparent border border-[#6d7b6c] text-[#141b2b] font-semibold text-sm px-4 py-3 rounded-xl hover:bg-[#f1f3ff] transition-colors cursor-pointer"
              >
                Start Driving
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
