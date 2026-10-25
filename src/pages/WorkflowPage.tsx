import React from 'react';
import { Workflow, ArrowRight, Cpu, Database, BrainCircuit, ShieldCheck, Zap, Droplet, Activity, Check, X } from 'lucide-react';

export const WorkflowPage: React.FC = () => {
  const steps = [
    { title: 'SENSE', desc: 'IoT Soil & Weather Probes', icon: Cpu, color: 'text-emerald-600' },
    { title: 'COLLECT', desc: 'ESP32 MQTT/REST Gateway', icon: Database, color: 'text-teal-600' },
    { title: 'PROCESS', desc: 'Feature Engineering & Normalization', icon: Activity, color: 'text-cyan-600' },
    { title: 'PREDICT', desc: 'Random Forest AI Classifier', icon: BrainCircuit, color: 'text-sky-600' },
    { title: 'ASSESS', desc: 'Drought Risk Classification', icon: ShieldCheck, color: 'text-blue-600' },
    { title: 'DECIDE', desc: 'Multi-Parameter Decision Engine', icon: Zap, color: 'text-indigo-600' },
    { title: 'IRRIGATE', desc: 'Relay Submersible Pump Control', icon: Droplet, color: 'text-emerald-600' },
    { title: 'MONITOR', desc: 'Real-time Closed-Loop Feedback', icon: Workflow, color: 'text-teal-600' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <Workflow className="h-5 w-5 text-cyan-600" />
            <span>System Pipeline & Academic Research Architecture</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            End-to-end intelligent control flow and innovation comparison
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl font-bold text-xs bg-cyan-50 text-cyan-800 border border-cyan-200 shadow-2xs">
          IEEE-STYLE RESEARCH DEMONSTRATION
        </span>
      </div>

      {/* 8-Step Visual Workflow */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-200/80 bg-white space-y-4 shadow-xs">
        <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3">
          End-to-End Closed-Loop System Pipeline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative group">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-2 hover:border-emerald-300 hover:shadow-md transition-all shadow-2xs">
                  <div className={`p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs ${step.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-black tracking-wider text-slate-900 uppercase">{step.title}</span>
                  <p className="text-[10px] text-slate-500 leading-tight font-medium">{step.desc}</p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2.5 top-1/2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-4 w-4 text-emerald-600 animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Research Gap & Innovation Comparison Section */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-200/80 bg-white space-y-4 shadow-xs">
        <div>
          <h3 className="text-sm font-bold text-slate-800">Why This System? — Research Gap & Innovation</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Research focus: &quot;Integrating real-time IoT field conditions with AI-based drought prediction and automated irrigation decision-making.&quot;
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Feature Dimension</th>
                <th className="p-3.5 text-rose-700 font-bold">Traditional Irrigation Systems</th>
                <th className="p-3.5 text-emerald-800 font-bold">Proposed AgriDrought AI Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-bold text-slate-800">Monitoring Method</td>
                <td className="p-3.5 text-slate-600 flex items-center space-x-2">
                  <X className="h-4 w-4 text-rose-500 shrink-0" />
                  <span>Manual inspection or timer schedules</span>
                </td>
                <td className="p-3.5 text-slate-900 font-semibold flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Real-time IoT wireless sensor mesh</span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-bold text-slate-800">Drought Response</td>
                <td className="p-3.5 text-slate-600 flex items-center space-x-2">
                  <X className="h-4 w-4 text-rose-500 shrink-0" />
                  <span>Reactive after crop stress is visible</span>
                </td>
                <td className="p-3.5 text-slate-900 font-semibold flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Predictive AI model 24h early warning</span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-bold text-slate-800">Control Mechanism</td>
                <td className="p-3.5 text-slate-600 flex items-center space-x-2">
                  <X className="h-4 w-4 text-rose-500 shrink-0" />
                  <span>Single-parameter (Moisture only)</span>
                </td>
                <td className="p-3.5 text-slate-900 font-semibold flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Multi-parameter ML Decision Engine</span>
                </td>
              </tr>

              <tr className="hover:bg-slate-50/70">
                <td className="p-3.5 font-bold text-slate-800">Water Efficiency</td>
                <td className="p-3.5 text-slate-600 flex items-center space-x-2">
                  <X className="h-4 w-4 text-rose-500 shrink-0" />
                  <span>Frequent water over-application</span>
                </td>
                <td className="p-3.5 text-slate-900 font-semibold flex items-center space-x-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Optimized need-based delivery (+18.5% saved)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
