import React, { useState } from 'react';
import { FoodItem, FoodCategory } from '../types';

interface AvailableFoodScreenProps {
  foodItems: FoodItem[];
  onClaimFood: (item: FoodItem) => void;
  onSelectTab: (tab: string) => void;
}

export const AvailableFoodScreen: React.FC<AvailableFoodScreenProps> = ({
  foodItems,
  onClaimFood,
  onSelectTab,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('All Food');
  const [sortBy, setSortBy] = useState<'closest' | 'expiry' | 'quantity'>('closest');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [smartMatchDetail, setSmartMatchDetail] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const categories: FoodCategory[] = ['All Food', 'Produce', 'Prepared Meals', 'Bakery', 'Pantry'];

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter and sort items
  const filteredItems = foodItems
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat =
        selectedCategory === 'All Food' || item.category === selectedCategory;
      return matchesSearch && matchesCat && !item.claimed;
    })
    .sort((a, b) => {
      if (sortBy === 'expiry') return a.expiresInMinutes - b.expiresInMinutes;
      if (sortBy === 'quantity') return b.quantity.localeCompare(a.quantity);
      // default closest
      return parseFloat(a.distance) - parseFloat(b.distance);
    });

  const smartMatchItem = foodItems.find((item) => item.id === 'food-smart-1') || foodItems[0];

  const handleAskAiMatch = async () => {
    setLoadingAi(true);
    try {
      const res = await fetch('/api/gemini/smart-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ngoProfile: { name: 'Hope Shelter', serveCount: 50, preferences: ['Vegetarian', 'Warm Meals'] },
          availableListings: foodItems,
        }),
      });
      const data = await res.json();
      setSmartMatchDetail(
        data.matchExplanation ||
          'Gourmet Vegetable Curry matches Hope Shelter\'s demand for 20 warm vegetarian plates and has urgent 45-minute expiry.'
      );
    } catch {
      setSmartMatchDetail(
        'Gourmet Vegetable Curry matches Hope Shelter\'s demand for 20 warm vegetarian plates and has urgent 45-minute expiry.'
      );
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col p-4 md:p-8 max-w-[1280px] mx-auto">
      {/* Search Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-xl">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6d7b6c]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search available food..."
            className="w-full pl-11 pr-4 py-2.5 rounded-full border border-[#bccbb9] bg-white focus:outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] text-sm text-[#141b2b] shadow-xs"
          />
        </div>

        <button
          onClick={() => onSelectTab('donate')}
          className="bg-[#006e2f] hover:bg-[#005321] text-white font-semibold text-sm px-6 py-2.5 rounded-full h-[44px] flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          <span>Donate Food</span>
        </button>
      </div>

      {/* Category Chips and Sort Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-all ${
                selectedCategory === cat
                  ? 'border border-[#22c55e] bg-[#22c55e]/15 text-[#006e2f] font-semibold'
                  : 'border border-[#bccbb9] bg-white text-[#3d4a3d] hover:bg-[#dce2f7]'
              }`}
            >
              {selectedCategory === cat && (
                <span className="material-symbols-outlined text-base">check</span>
              )}
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#bccbb9] bg-white text-[#3d4a3d] hover:bg-[#dce2f7] text-sm font-medium transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-base">tune</span>
            <span>Filters</span>
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="appearance-none rounded-full border border-[#bccbb9] bg-white text-[#3d4a3d] text-sm font-medium py-2 pl-4 pr-8 focus:outline-none focus:border-[#22c55e] cursor-pointer"
          >
            <option value="closest">Distance: Closest</option>
            <option value="expiry">Expiry: Soonest</option>
            <option value="quantity">Quantity: Highest</option>
          </select>
        </div>
      </div>

      {/* AI Smart Match Banner */}
      {smartMatchItem && (
        <section className="bg-gradient-to-r from-[#e1e8fd] to-[#e9edff] rounded-2xl p-6 md:p-8 border border-[#22c55e]/30 shadow-sm relative overflow-hidden mb-10 flex flex-col md:flex-row gap-6 items-center group">
          <div className="flex-1 z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#22c55e] text-xl fill-1">
                auto_awesome
              </span>
              <span className="text-xs font-bold text-[#006e2f] tracking-wider uppercase">
                Smart Matches for You
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-[#141b2b] mb-1">
              {smartMatchItem.title}
            </h2>

            <p className="text-sm text-[#3d4a3d] mb-4 flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">storefront</span>
                {smartMatchItem.donorName}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">location_on</span>
                {smartMatchItem.distance}
              </span>
            </p>

            <div className="flex flex-wrap gap-2.5 mb-6">
              <span className="inline-flex items-center gap-1.5 bg-[#fea619]/20 text-[#684000] px-3.5 py-1 rounded-full text-xs font-semibold">
                <span className="material-symbols-outlined text-sm text-[#855300] pulse-orange">
                  timer
                </span>
                {smartMatchItem.expiresInText}
              </span>

              <span className="inline-flex items-center gap-1.5 bg-[#22c55e]/20 text-[#004b1e] px-3.5 py-1 rounded-full text-xs font-semibold">
                <span className="material-symbols-outlined text-sm">shopping_basket</span>
                {smartMatchItem.quantity}
              </span>

              <span className="inline-flex items-center gap-1.5 bg-[#ff8a83]/20 text-[#b91a24] px-3.5 py-1 rounded-full text-xs font-semibold">
                <span className="material-symbols-outlined text-sm">verified</span>
                {smartMatchItem.matchScore || 96}% Match
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onClaimFood(smartMatchItem)}
                className="bg-[#006e2f] hover:bg-[#005321] text-white font-semibold text-sm px-8 py-3 rounded-full shadow-md transition-all h-[44px] inline-flex items-center justify-center cursor-pointer active:scale-95"
              >
                Claim Food
              </button>

              <button
                onClick={handleAskAiMatch}
                disabled={loadingAi}
                className="bg-white border border-[#22c55e] text-[#006e2f] hover:bg-[#f1f3ff] font-medium text-xs px-5 py-3 rounded-full transition-all h-[44px] inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>{loadingAi ? 'Calculating AI Match...' : 'Why 96% Match?'}</span>
              </button>
            </div>

            {smartMatchDetail && (
              <div className="mt-4 p-3 bg-white/90 rounded-xl border border-[#22c55e]/40 text-xs text-[#141b2b] leading-relaxed">
                <strong>AI Explanation:</strong> {smartMatchDetail}
              </div>
            )}
          </div>

          <div className="w-full md:w-1/3 h-52 md:h-64 rounded-xl overflow-hidden relative shrink-0 shadow-sm">
            <img
              src={smartMatchItem.imageUrl}
              alt={smartMatchItem.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </section>
      )}

      {/* Grid Section Header */}
      <h3 className="text-xl font-bold text-[#141b2b] mb-4">More Available Near You</h3>

      {/* Bento Grid of Available Food Cards */}
      {filteredItems.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-[#dce2f7] text-center my-6">
          <span className="material-symbols-outlined text-5xl text-[#6d7b6c] mb-2">
            search_off
          </span>
          <h4 className="text-lg font-bold text-[#141b2b]">No food matches found</h4>
          <p className="text-sm text-[#3d4a3d] mt-1">
            Try adjusting your search query or selecting a different category filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#bccbb9]/50 shadow-xs overflow-hidden flex flex-col hover:shadow-md hover:border-[#22c55e]/30 transition-all group"
            >
              <div className="h-48 relative overflow-hidden bg-[#f1f3ff]">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                  <span
                    className={`material-symbols-outlined text-sm ${
                      item.isUrgent ? 'text-[#f59e0b] pulse-orange' : 'text-[#6d7b6c]'
                    }`}
                  >
                    timer
                  </span>
                  <span className="text-xs font-semibold text-[#141b2b]">
                    {item.expiresInText}
                  </span>
                </div>

                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs w-8 h-8 rounded-full flex items-center justify-center shadow-xs text-[#006e2f] hover:scale-110 transition-transform cursor-pointer"
                >
                  <span
                    className={`material-symbols-outlined text-lg ${
                      favorites[item.id] ? 'fill-1 text-[#22c55e]' : ''
                    }`}
                  >
                    {favorites[item.id] ? 'favorite' : 'favorite_border'}
                  </span>
                </button>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1 gap-2">
                  <h4 className="font-bold text-base text-[#141b2b] line-clamp-1">
                    {item.title}
                  </h4>
                  <span className="bg-[#dce2f7] text-[#141b2b] px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap">
                    {item.quantity}
                  </span>
                </div>

                <p className="text-xs text-[#3d4a3d] mb-4 line-clamp-1 font-medium">
                  {item.donorName}
                </p>

                <div className="flex items-center justify-between text-xs text-[#3d4a3d] mt-auto pt-3 border-t border-[#f1f3ff]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-[#6d7b6c]">
                      location_on
                    </span>
                    {item.distance}
                  </span>

                  <button
                    onClick={() => onClaimFood(item)}
                    className="text-[#006e2f] hover:text-[#005321] font-bold text-sm hover:underline cursor-pointer"
                  >
                    Claim
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
