
import React, { useState } from 'react';
import { FoodItem, UserProfile } from '../types';
import { createDonation } from '../services/api';

interface CreateDonationScreenProps {
  currentUser: UserProfile;
  onCreateDonation: (item: FoodItem) => void;
  onCancel: () => void;
}

export const CreateDonationScreen: React.FC<CreateDonationScreenProps> = ({
  currentUser,
  onCreateDonation,
  onCancel,
}) => {
  const [foodName, setFoodName] = useState('');
  const [foodType, setFoodType] = useState<
    'Produce' | 'Prepared Meals' | 'Bakery' | 'Pantry' | 'Dairy'
  >('Bakery');

  const [quantity, setQuantity] = useState('');
  const [expiry, setExpiry] = useState('');
  const [location, setLocation] = useState(
    'Healthy Kitchen, 88 Main St'
  );

  const [imageUrl, setImageUrl] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBRRyyHImaOIRN8sLC_2VwOhBLqeOT4ItxNWTfLxW4q9BdKNc6Dt1UoqGO7XhigUhxU_p_FdRrSdzgK6WTaZPEaqj0aom-FVofU1HL3EhSZQ7_sNjpM1Y-vQKi7SgzyvHdyhE-bLZI4AQUDNQL8zxx4Rk2M1yKAPH806ph5zD9JRKatTzwCOBASsIDfmyYKjB_oQsEVCxtebsSGhiLxnyQfsO9AF9BZeOeiThNlC-qYbkQaX_7Imqg'
  );

  const [description, setDescription] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiNote, setAiNote] = useState<string | null>(null);

  // ==============================
  // IMAGE UPLOAD
  // ==============================

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  // ==============================
  // AI ASSIST
  // ==============================

  const handleAiAutoAssist = async () => {
    if (!foodName.trim()) {
      alert(
        'Please type a food name first. Example: Warm Vegetable Lasagna'
      );
      return;
    }

    setLoadingAi(true);

    try {
      const response = await fetch(
        '/api/gemini/analyze-food',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            foodName,
            foodType,
          }),
        }
      );

      const data = await response.json();

      if (data.suggestedCategory) {
        setFoodType(data.suggestedCategory);
      }

      setAiNote(
        `AI Estimate: Shelf-life ~${
          data.estimatedShelfLifeHours || 4
        } hours. Storage tip: ${
          data.storageTips ||
          'Keep sealed and temperature controlled.'
        }`
      );

      if (!description) {
        setDescription(
          `Fresh ${foodName}. ${
            data.storageTips || ''
          }`
        );
      }
    } catch (error) {
      console.error('AI Error:', error);

      setAiNote(
        'AI Suggestion: Keep temperature controlled and seal tightly before volunteer pickup.'
      );
    } finally {
      setLoadingAi(false);
    }
  };

  // ==============================
  // SUBMIT DONATION
  // ==============================

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!foodName || !quantity || !location) {
    alert("Please fill in food name, quantity and location.");
    return;
  }

  if (!expiry) {
    alert("Please select expiry time.");
    return;
  }

  try {
    const donationData = {
      foodName: foodName,
      quantity: quantity,
      preparedAt: new Date().toISOString(),
      expiryTime: new Date(expiry).toISOString(),
      location: location,
    };

    console.log("Sending donation:", donationData);

    const data = await createDonation(donationData);

    console.log("Donation created successfully:", data);

    alert("Donation created successfully!");

    // Frontend preview/update
    const newFood: FoodItem = {
      id: `donation-${Date.now()}`,
      title: foodName,
      donorName: currentUser.name || "Healthy Kitchen",
      donorType: "Local Donor",
      donorAvatar: currentUser.avatar,
      category: foodType,
      quantity: quantity,
      location: location,
      distance: "0.8 km",
      expiryTime: new Date(expiry).toLocaleString(),
      expiresInText: "Expiring soon",
      expiresInMinutes: 240,
      imageUrl: imageUrl,
      isUrgent: true,
      claimed: false,
      status: "Active",
      createdAt: "Just now",
      description: description,
    };

    onCreateDonation(newFood);

  } catch (error) {
    console.error("Donation error:", error);

    if (error instanceof Error) {
      alert(error.message);
    } else {
      alert("Donation failed");
    }
  }
};

  // ==============================
  // UI
  // ==============================

  return (
    <div className="w-full flex-1 flex flex-col p-4 md:p-8 max-w-[1280px] mx-auto">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#141b2b]">
            Create a Donation
          </h2>

          <p className="text-sm text-[#3d4a3d] mt-1">
            Fill in the details below to notify local NGOs
            about available food.
          </p>
        </div>

        <button
          onClick={onCancel}
          className="bg-transparent border border-[#6d7b6c] text-[#141b2b] hover:bg-[#f1f3ff] font-semibold text-sm h-[40px] px-5 rounded-full transition-colors cursor-pointer"
        >
          Cancel
        </button>

      </div>

      {/* Main Grid */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        {/* FORM */}

        <div className="lg:col-span-7 flex flex-col gap-6">

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] border border-[#dce2f7] space-y-6"
          >

            {/* Image */}

            <div>

              <label className="block text-sm font-bold text-[#141b2b] mb-2">
                Food Image
              </label>

              <div className="relative border-2 border-dashed border-[#bccbb9] rounded-xl p-6 bg-[#f1f3ff] hover:bg-[#e9edff] transition-colors text-center group cursor-pointer">

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                <div className="flex flex-col items-center">

                  <span className="material-symbols-outlined text-4xl text-[#6d7b6c] group-hover:text-[#22c55e] mb-2">
                    add_a_photo
                  </span>

                  <p className="text-sm font-bold text-[#006e2f]">
                    Upload a file{' '}
                    <span className="text-[#3d4a3d] font-normal">
                      or drag and drop
                    </span>
                  </p>

                  <p className="text-xs text-[#3d4a3d] mt-1">
                    PNG, JPG, GIF up to 10MB
                  </p>

                </div>
              </div>

              <div className="mt-3">

                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) =>
                    setImageUrl(e.target.value)
                  }
                  placeholder="Or paste an image URL here..."
                  className="w-full text-xs px-3 py-2 border border-[#bccbb9] rounded-lg bg-white"
                />

              </div>

            </div>

            {/* Food Name */}

            <div>

              <div className="flex justify-between items-center mb-1">

                <label className="block text-sm font-bold text-[#141b2b]">
                  Food Name
                </label>

                <button
                  type="button"
                  onClick={handleAiAutoAssist}
                  disabled={loadingAi}
                  className="text-xs text-[#006e2f] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                >

                  <span className="material-symbols-outlined text-sm">
                    auto_awesome
                  </span>

                  <span>
                    {loadingAi
                      ? 'AI Analyzing...'
                      : 'Auto-Assist with Gemini'}
                  </span>

                </button>

              </div>

              <input
                type="text"
                value={foodName}
                onChange={(e) =>
                  setFoodName(e.target.value)
                }
                placeholder="e.g., Artisan Bread Loaves or Fresh Salads"
                required
                className="w-full rounded-xl border border-[#bccbb9] px-4 py-2.5 text-sm text-[#141b2b] focus:outline-none focus:border-[#22c55e]"
              />

            </div>

            {/* AI NOTE */}

            {aiNote && (
              <div className="p-3 bg-[#e9edff] rounded-xl text-xs text-[#006e2f] border border-[#22c55e]/30">
                {aiNote}
              </div>
            )}

            {/* Food Type + Quantity */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>

                <label className="block text-sm font-bold text-[#141b2b] mb-1">
                  Food Type
                </label>

                <select
                  value={foodType}
                  onChange={(e) =>
                    setFoodType(
                      e.target.value as
                        | 'Produce'
                        | 'Prepared Meals'
                        | 'Bakery'
                        | 'Pantry'
                        | 'Dairy'
                    )
                  }
                  className="w-full rounded-xl border border-[#bccbb9] px-4 py-2.5 text-sm text-[#141b2b] bg-white focus:outline-none focus:border-[#22c55e]"
                >

                  <option value="Bakery">
                    Baked Goods
                  </option>

                  <option value="Produce">
                    Produce
                  </option>

                  <option value="Prepared Meals">
                    Prepared Meals
                  </option>

                  <option value="Dairy">
                    Dairy
                  </option>

                  <option value="Pantry">
                    Pantry / Dry Goods
                  </option>

                </select>

              </div>

              <div>

                <label className="block text-sm font-bold text-[#141b2b] mb-1">
                  Quantity (Approx)
                </label>

                <input
                  type="text"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value)
                  }
                  placeholder="e.g., 20 lbs or 15 items"
                  required
                  className="w-full rounded-xl border border-[#bccbb9] px-4 py-2.5 text-sm text-[#141b2b] focus:outline-none focus:border-[#22c55e]"
                />

              </div>

            </div>

            <hr className="border-[#f1f3ff]" />

            {/* Expiry + Location */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>

                <label className="block text-sm font-bold text-[#141b2b] mb-1">
                  Expiry / Best Before
                </label>

                <input
                  type="datetime-local"
                  value={expiry}
                  onChange={(e) =>
                    setExpiry(e.target.value)
                  }
                  className="w-full rounded-xl border border-[#bccbb9] px-4 py-2.5 text-sm text-[#141b2b] bg-white focus:outline-none focus:border-[#22c55e]"
                />

              </div>

              <div>

                <label className="block text-sm font-bold text-[#141b2b] mb-1">
                  Pickup Location
                </label>

                <div className="relative">

                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#6d7b6c]">
                    location_on
                  </span>

                  <input
                    type="text"
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    placeholder="Address or Business Name"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#bccbb9] text-sm text-[#141b2b] focus:outline-none focus:border-[#22c55e]"
                  />

                </div>

              </div>

            </div>

            {/* Description */}

            <div>

              <label className="block text-sm font-bold text-[#141b2b] mb-1">
                Additional Notes
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Include allergens, temperature instructions, or container requirements..."
                rows={2}
                className="w-full rounded-xl border border-[#bccbb9] px-4 py-2 text-sm text-[#141b2b] focus:outline-none focus:border-[#22c55e]"
              />

            </div>

            {/* Submit */}

            <button
              type="submit"
              className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold text-sm py-3.5 rounded-full shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >

              <span className="material-symbols-outlined text-lg">
                send
              </span>

              <span>
                Post Donation
              </span>

            </button>

          </form>

        </div>

        {/* LIVE PREVIEW */}

        <div className="lg:col-span-5 relative">

          <div className="sticky top-24">

            <div className="mb-4">

              <h3 className="text-lg font-bold text-[#141b2b] flex items-center gap-2">

                <span className="material-symbols-outlined text-[#006e2f]">
                  visibility
                </span>

                <span>
                  Live Preview
                </span>

              </h3>

              <p className="text-xs text-[#3d4a3d] mt-0.5">
                This is how your donation will appear to NGOs in the feed.
              </p>

            </div>

            {/* Preview Card */}

            <div className="bg-white rounded-2xl overflow-hidden shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.05)] border border-[#dce2f7]">

              <div className="h-48 w-full bg-[#f1f3ff] relative overflow-hidden">

                <img
                  src={imageUrl}
                  alt="Donation preview"
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 right-4">

                  <span className="bg-[#22c55e]/20 text-[#004b1e] backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold border border-[#22c55e]/30">
                    {foodType}
                  </span>

                </div>

              </div>

              <div className="p-6">

                <div className="flex justify-between items-start mb-4">

                  <div>

                    <h4 className="font-bold text-lg text-[#141b2b] mb-0.5">
                      {foodName || 'New Donation'}
                    </h4>

                    <p className="text-xs text-[#3d4a3d] flex items-center gap-1">

                      <span className="material-symbols-outlined text-sm">
                        inventory_2
                      </span>

                      <span>
                        {quantity || 'Quantity not set'}
                      </span>

                    </p>

                  </div>

                  {currentUser.avatar && (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                    />
                  )}

                </div>

                <div className="space-y-3 pt-4 border-t border-[#f1f3ff] text-xs text-[#3d4a3d]">

                  <div className="flex items-center gap-2">

                    <span className="material-symbols-outlined text-sm text-[#6d7b6c]">
                      location_on
                    </span>

                    <span className="truncate">
                      {location || 'Location pending...'}
                    </span>

                  </div>

                  <div className="flex items-center gap-2">

                    <span className="material-symbols-outlined text-sm text-[#f59e0b]">
                      schedule
                    </span>

                    <span className="truncate">

                      {expiry
                        ? `Exp: ${new Date(
                            expiry
                          ).toLocaleString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}`
                        : 'Expiry pending...'}

                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};