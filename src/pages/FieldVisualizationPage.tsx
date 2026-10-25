import React from 'react';
import { FieldMap } from '../components/field/FieldMap';
import { MapPin, Compass } from 'lucide-react';
import { mockField } from '../services/mockData';

export const FieldVisualizationPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-5 rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-emerald-600" />
            <span>Field & Spatial Node Visualization</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {mockField.name} ({mockField.cropType}) — Spatial Placement & Pipeline Mapping
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs text-slate-600 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs font-medium">
          <Compass className="h-4 w-4 text-emerald-600" />
          <span>Coordinates: 18.5204° N, 73.8567° E</span>
        </div>
      </div>

      <FieldMap />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500">Total Cultivated Area</span>
          <p className="text-xl font-black text-slate-900 font-mono tracking-tight">{mockField.areaAcres} Acres (10,117 m²)</p>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500">Active Crop Type</span>
          <p className="text-xl font-extrabold text-emerald-700">{mockField.cropType}</p>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-200/80 bg-white space-y-1 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-slate-500">Irrigation Grid Type</span>
          <p className="text-xl font-extrabold text-sky-700">Automated Drip & Pipe Grid</p>
        </div>
      </div>
    </div>
  );
};
