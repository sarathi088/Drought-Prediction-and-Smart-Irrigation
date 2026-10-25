import React from 'react';
import { AlertTriangle, Play, X } from 'lucide-react';

interface ManualOverrideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ManualOverrideModal: React.FC<ManualOverrideModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-amber-300 bg-white shadow-2xl space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-3 text-amber-600">
          <div className="p-3 rounded-xl bg-amber-50 ring-1 ring-amber-200 shadow-2xs">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Manual Override Confirmation</h3>
            <p className="text-xs text-amber-700 font-semibold">Bypassing Automated AI Control Engine</p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/80">
          Are you sure you want to start the irrigation pump manually?
          <br />
          <span className="text-amber-800 font-bold mt-1.5 inline-block">
            Note: Manual Override Active mode will remain enabled until explicitly stopped or target moisture limit is exceeded.
          </span>
        </p>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition-colors shadow-md shadow-amber-500/25"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>Confirm & Start Pump</span>
          </button>
        </div>
      </div>
    </div>
  );
};
