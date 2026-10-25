import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';
import { Sprout, Lock, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('demo@smartirrigation.com');
  const [password, setPassword] = useState('demo123');
  const [role, setRole] = useState<UserRole>('ADMIN');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, role, password);
    onSuccess();
  };

  const handleDemoFill = () => {
    setEmail('demo@smartirrigation.com');
    setPassword('demo123');
    setRole('ADMIN');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl glass-panel border border-slate-200/90 shadow-2xl overflow-hidden z-10 bg-white">
        {/* Left Side: Brand & Feature Highlights */}
        <div className="p-8 md:p-10 bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-slate-50 border-b md:border-b-0 md:border-r border-slate-200/80 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-500/20">
                <Sprout className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">AgriDrought AI</h1>
                <p className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Smart AgriTech SaaS Platform</p>
              </div>
            </div>

            <div className="pt-4 space-y-2.5">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
                Predict Drought. <br />
                <span className="launchpad-brand-gradient">
                  Optimize Water. Protect Crops.
                </span>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Final-Year Engineering Project demonstrating real-time IoT agricultural sensor monitoring, Random Forest ML drought prediction, and automated pump decision logic.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-200/70 text-xs text-slate-700">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">Real-time ESP32 IoT Sensor Telemetry</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">Machine Learning Drought Risk Gauge (92.4% Acc)</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">Automated Smart Pump Decision Loop</span>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="p-8 md:p-10 flex flex-col justify-center space-y-6 bg-white">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Sign In to Dashboard</h3>
            <p className="text-xs text-slate-500">Select user role or use instant demo credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Select Portal Access Role
              </label>
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
                {(['ADMIN', 'FARMER', 'VIEWER'] as UserRole[]).map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setRole(r)}
                    className={`py-1.5 rounded-lg transition-all ${
                      role === r
                        ? 'bg-white text-emerald-800 font-extrabold shadow-sm border border-emerald-200'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs glass-input"
                  placeholder="demo@smartirrigation.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Password</label>
              <div className="relative">
                <Lock className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-xs glass-input"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-medium text-slate-600">Remember me</span>
              </label>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-emerald-700 font-semibold hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="launchpad-btn-primary w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2"
            >
              <span>Access System Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-500">Quick Demo Credentials:</span>
              <button
                onClick={handleDemoFill}
                className="text-[10px] font-bold text-emerald-700 hover:underline"
              >
                Auto-Fill
              </button>
            </div>
            <p className="text-[11px] font-mono font-semibold text-slate-700">Email: demo@smartirrigation.com</p>
            <p className="text-[11px] font-mono font-semibold text-slate-700">Password: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
};
