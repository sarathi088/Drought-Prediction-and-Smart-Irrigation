import React from 'react';
import {
  LayoutDashboard,
  Activity,
  MapPin,
  BrainCircuit,
  Droplet,
  GlassWater,
  LineChart,
  Bell,
  Cpu,
  Workflow,
  Settings,
  LogOut,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSimulation } from '../../context/SimulationContext';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const { logout } = useAuth();
  const { alerts } = useSimulation();
  const unreadCount = alerts.filter((a) => !a.isRead).length;

  const navItems = [
    { id: 'dashboard', label: 'Main Dashboard', icon: LayoutDashboard },
    { id: 'monitoring', label: 'Field Monitoring', icon: Activity },
    { id: 'field', label: 'Field Visualization', icon: MapPin },
    { id: 'prediction', label: 'Drought Prediction (AI)', icon: BrainCircuit, highlight: true },
    { id: 'irrigation', label: 'Smart Irrigation', icon: Droplet },
    { id: 'water', label: 'Water Management', icon: GlassWater },
    { id: 'analytics', label: 'Analytics & Reports', icon: LineChart },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadCount },
    { id: 'devices', label: 'IoT Devices', icon: Cpu },
    { id: 'workflow', label: 'Project Workflow & IEEE', icon: Workflow },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 glass-panel border-r border-slate-200/90 bg-white/95 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-61px)] shadow-xs">
      {/* Navigation List */}
      <div className="p-3 space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
          AgriTech Platform Menu
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/90 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  {item.badge}
                </span>
              )}

              {item.highlight && !item.badge && (
                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-cyan-50 text-cyan-700 border border-cyan-200 uppercase">
                  AI
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info Box & Logout */}
      <div className="p-3 border-t border-slate-200/80 space-y-3">
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
          <div className="flex items-center space-x-1.5 text-emerald-700 font-bold">
            <Info className="h-3.5 w-3.5" />
            <span>Academic Research Project</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Final Year Engineering Demo. Real-time IoT ingestion + ML Random Forest model.
          </p>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors border border-rose-200/80 shadow-2xs"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
