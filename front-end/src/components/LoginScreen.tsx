import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import { loginUser } from '../services/api';


interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
  currentUser: UserProfile;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, currentUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('volunteer');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const data = await loginUser(email, password);

    console.log("Login successful:", data);

    localStorage.setItem("token", data.token);

    onLogin(selectedRole);

  } catch (error) {
    console.error("Login error:", error);

    alert("Invalid email or password");
  }
};
  

  return (
    <div className="w-full flex-1 flex items-center justify-center p-4 md:p-8 min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0px_10px_20px_-3px_rgba(0,0,0,0.08)] p-6 md:p-8 border border-[#dce2f7] flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHgFniP_dWrLPl2BF4c6CNdvFBFMNXtSbaFYek0ermHQP69Itj5ZtzoPqhJbc4S3axcHbNsFTdo14xMZaVF11lMagiB4lyWZKG7SYmEYCQeBidAlzfBb7v5zWlGmuuJabBs6IfLon5QvgAn800E3WQRJ5H2HGh2jDlHUkUrTJwR19TM20cj_-F3qzAsAPj7etUr_OM5RaDn9fO2W_wxozpryNUbueYzOFiiDtKh1WUKHmJ_ojD7YA"
            alt="Food Rescue Logo"
            className="h-16 w-16 object-contain rounded-xl shadow-xs"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-[#006e2f]">
            Welcome Back
          </h1>
          <p className="text-sm text-[#3d4a3d]">
            Sign in to continue making a difference.
          </p>
        </div>

        {/* Demo Quick Sign-in Switcher */}
        <div className="bg-[#f1f3ff] p-3 rounded-xl border border-[#e1e8fd]">
          <p className="text-xs font-bold text-[#141b2b] mb-2 text-center">
            Demo Account Role:
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => {
                setSelectedRole('donor');
                
              }}
              className={`text-xs py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedRole === 'donor'
                  ? 'bg-[#22c55e] text-white shadow-xs'
                  : 'bg-white text-[#3d4a3d] hover:bg-[#e1e8fd]'
              }`}
            >
              Donor
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedRole('ngo');
            
              }}
              className={`text-xs py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedRole === 'ngo'
                  ? 'bg-[#22c55e] text-white shadow-xs'
                  : 'bg-white text-[#3d4a3d] hover:bg-[#e1e8fd]'
              }`}
            >
              NGO
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedRole('volunteer');
                
              }}
              className={`text-xs py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedRole === 'volunteer'
                  ? 'bg-[#22c55e] text-white shadow-xs'
                  : 'bg-white text-[#3d4a3d] hover:bg-[#e1e8fd]'
              }`}
            >
              Volunteer
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold text-[#141b2b] mb-1">
              Email Address
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7b6c] text-lg">
                mail
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 border border-[#bccbb9] rounded-xl text-sm text-[#141b2b] focus:outline-none focus:border-[#22c55e]"
                placeholder="volunteer@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold text-[#141b2b] mb-1">
              Password
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7b6c] text-lg">
                lock
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 border border-[#bccbb9] rounded-xl text-sm text-[#141b2b] focus:outline-none focus:border-[#22c55e]"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between my-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-[#bccbb9] text-[#22c55e] focus:ring-[#22c55e]"
              />
              <span className="text-xs text-[#3d4a3d] font-medium">Remember me</span>
            </label>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Password reset link sent to ' + email);
              }}
              className="text-xs text-[#006e2f] hover:underline font-semibold"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-11 bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer active:scale-95"
          >
            Sign In as {selectedRole.toUpperCase()}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-[#dce2f7]"></div>
          <span className="flex-shrink-0 mx-4 text-xs font-semibold text-[#6d7b6c]">
            or
          </span>
          <div className="flex-grow border-t border-[#dce2f7]"></div>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={() => onLogin(selectedRole)}
          className="w-full h-11 bg-white border border-[#bccbb9] text-[#141b2b] font-semibold text-sm rounded-xl hover:bg-[#f1f3ff] transition-colors flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            ></path>
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            ></path>
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            ></path>
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            ></path>
          </svg>
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-xs text-[#3d4a3d]">
          Don't have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onLogin(selectedRole);
            }}
            className="text-[#006e2f] font-bold hover:underline"
          >
            Register Now
          </a>
        </p>
      </div>
    </div>
  );
};
