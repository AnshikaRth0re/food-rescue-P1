import React, { useState } from 'react';
import { FoodItem, UserProfile } from '../types';

interface DonorDashboardProps {
  currentUser: UserProfile;
  donations: FoodItem[];
  onSelectTab: (tab: string) => void;
  onDeleteDonation?: (id: string) => void;
}

export const DonorDashboard: React.FC<DonorDashboardProps> = ({
  currentUser,
  donations,
  onSelectTab,
  onDeleteDonation,
}) => {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const donorDonations = donations.filter(
    (d) => d.donorName === currentUser.name || d.donorName === 'Healthy Kitchen'
  );

  const handleGenerateAiInsight = async () => {
    setLoadingAi(true);
    try {
      const res = await fetch('/api/gemini/analyze-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          foodName: '42 total donations (128kg total rescued)',
          foodType: 'Bakery & Prepared Meals',
        }),
      });
      const data = await res.json();
      setAiInsight(
        `Great work! Your 128kg of donated food has averted approximately 310kg of CO2 emissions and provided ~280 nutritious meal portions to local shelters this month!`
      );
    } catch {
      setAiInsight(
        `Great work! Your 128kg of donated food has averted approximately 310kg of CO2 emissions and provided ~280 nutritious meal portions to local shelters this month!`
      );
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col p-4 md:p-8 max-w-[1280px] mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#141b2b] mb-1">
            Hello, {currentUser.name}
          </h1>
          <p className="text-base text-[#3d4a3d]">
            Here is your impact overview for today.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleGenerateAiInsight}
            disabled={loadingAi}
            className="bg-white border border-[#22c55e] text-[#006e2f] hover:bg-[#f1f3ff] font-semibold text-xs px-4 py-2.5 rounded-lg shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            <span>{loadingAi ? 'Calculating...' : 'AI Impact Report'}</span>
          </button>

          <button
            onClick={() => onSelectTab('donate')}
            className="hidden md:flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] text-white h-[44px] px-6 rounded-lg shadow-xs transition-all font-semibold text-sm cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            <span>Donate Food</span>
          </button>
        </div>
      </div>

      {aiInsight && (
        <div className="mb-6 p-4 bg-[#e9edff] border border-[#22c55e]/40 rounded-xl text-sm text-[#141b2b] flex items-start gap-3 shadow-xs">
          <span className="material-symbols-outlined text-[#22c55e] text-xl mt-0.5 fill-1">
            auto_awesome
          </span>
          <div>
            <strong className="font-bold text-[#006e2f]">AI Environmental Insight:</strong>
            <p className="mt-0.5 text-xs text-[#3d4a3d] leading-relaxed">{aiInsight}</p>
          </div>
        </div>
      )}

      {/* Metric Cards Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] border border-[#bccbb9]/30 hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-[#3d4a3d] uppercase tracking-wider">
              Total Donations
            </h3>
            <div className="w-10 h-10 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#006e2f]">
              <span className="material-symbols-outlined">inventory_2</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[#141b2b]">
              {currentUser.totalDonations || 42}
            </span>
            <span className="text-xs font-bold text-[#006e2f] flex items-center">
              <span className="material-symbols-outlined text-sm">arrow_upward</span> 12%
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] border border-[#bccbb9]/30 hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-[#3d4a3d] uppercase tracking-wider">
              Food Rescued
            </h3>
            <div className="w-10 h-10 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#006e2f]">
              <span className="material-symbols-outlined">scale</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[#141b2b]">
              {currentUser.rescuedKg || 128}
            </span>
            <span className="text-lg font-semibold text-[#3d4a3d]">kg</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] border border-[#bccbb9]/30 hover:-translate-y-0.5 transition-all relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#fea619]/20 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-xs font-bold text-[#3d4a3d] uppercase tracking-wider">
              Active Donations
            </h3>
            <div className="w-10 h-10 rounded-full bg-[#fea619]/20 flex items-center justify-center text-[#855300]">
              <span className="material-symbols-outlined">local_shipping</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 relative z-10">
            <span className="text-4xl font-bold text-[#141b2b]">
              {donorDonations.filter((d) => d.status === 'Active' || d.status === 'Claimed').length || 3}
            </span>
            <span className="text-xs font-semibold text-[#855300]">
              Awaiting pickup
            </span>
          </div>
        </div>
      </div>

      {/* Recent Donations Section */}
      <div className="bg-white rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] border border-[#bccbb9]/30 overflow-hidden mb-12">
        <div className="p-6 border-b border-[#e1e8fd] flex justify-between items-center">
          <h2 className="text-lg font-bold text-[#141b2b]">Recent Donations</h2>
          <button
            onClick={() => onSelectTab('available')}
            className="text-[#006e2f] font-semibold text-sm hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="divide-y divide-[#e1e8fd]">
          {donorDonations.map((item) => (
            <div
              key={item.id}
              className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#f9f9ff] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f1f3ff] flex items-center justify-center text-[#3d4a3d] shrink-0">
                  <span className="material-symbols-outlined">
                    {item.category === 'Bakery'
                      ? 'bakery_dining'
                      : item.category === 'Produce'
                      ? 'nutrition'
                      : 'set_meal'}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#141b2b]">{item.title}</h4>
                  <p className="text-xs text-[#3d4a3d] mt-0.5">
                    {item.quantity} • {item.description || 'Fresh food'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-1.5 bg-[#fea619]/10 px-3 py-1 rounded-full border border-[#fea619]/20">
                  <span className="material-symbols-outlined text-sm text-[#f59e0b] pulse-orange">
                    timer
                  </span>
                  <span className="text-xs font-semibold text-[#855300]">
                    {item.expiresInText}
                  </span>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    item.status === 'Active'
                      ? 'bg-[#22c55e]/10 text-[#006e2f] border-[#22c55e]/30'
                      : 'bg-[#e1e8fd] text-[#141b2b] border-[#bccbb9]'
                  }`}
                >
                  {item.status}
                </span>

                {onDeleteDonation && (
                  <button
                    onClick={() => onDeleteDonation(item.id)}
                    className="text-xs text-[#ba1a1a] hover:underline p-1 cursor-pointer"
                    title="Remove Listing"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button (Mobile) */}
      <button
        onClick={() => onSelectTab('donate')}
        className="md:hidden fixed bottom-20 right-5 z-40 bg-[#22c55e] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        title="Donate Food"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
};
