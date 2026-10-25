import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SimulationProvider } from './context/SimulationContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { SimulationBanner } from './components/common/SimulationBanner';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { FieldMonitoringPage } from './pages/FieldMonitoringPage';
import { FieldVisualizationPage } from './pages/FieldVisualizationPage';
import { DroughtPredictionPage } from './pages/DroughtPredictionPage';
import { SmartIrrigationPage } from './pages/SmartIrrigationPage';
import { WaterManagementPage } from './pages/WaterManagementPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AlertsPage } from './pages/AlertsPage';
import { DevicesPage } from './pages/DevicesPage';
import { WorkflowPage } from './pages/WorkflowPage';
import { SettingsPage } from './pages/SettingsPage';

const MainApp: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activePage, setActivePage] = useState<string>('dashboard');

  if (!isAuthenticated) {
    return <LoginPage onSuccess={() => setActivePage('dashboard')} />;
  }

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage onNavigate={setActivePage} />;
      case 'monitoring':
        return <FieldMonitoringPage />;
      case 'field':
        return <FieldVisualizationPage />;
      case 'prediction':
        return <DroughtPredictionPage />;
      case 'irrigation':
        return <SmartIrrigationPage />;
      case 'water':
        return <WaterManagementPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'devices':
        return <DevicesPage />;
      case 'workflow':
        return <WorkflowPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage onNavigate={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/80 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      <SimulationBanner />
      <Header activePage={activePage} onNavigate={setActivePage} />

      <div className="flex flex-1 relative">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto max-w-7xl mx-auto w-full">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <SimulationProvider>
        <MainApp />
      </SimulationProvider>
    </AuthProvider>
  );
}

export default App;
