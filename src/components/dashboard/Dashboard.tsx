import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar, type DashView } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ProjectTable } from '@/components/dashboard/ProjectTable';
import { AnalyticsCharts } from '@/components/dashboard/AnalyticsCharts';
import { AlertsView } from '@/components/dashboard/AlertsView';
import { ReportsView } from '@/components/dashboard/ReportsView';
import { DataUploadView } from '@/components/dashboard/DataUploadView';
import { ModelPerformanceView } from '@/components/dashboard/ModelPerformanceView';
import { RetrainingView } from '@/components/dashboard/RetrainingView';
import { UsersView } from '@/components/dashboard/UsersView';
import { AuditLogView } from '@/components/dashboard/AuditLogView';
import { SettingsView } from '@/components/dashboard/SettingsView';
import { InsightsView } from '@/components/dashboard/InsightsView';
import { GISRiskMap } from '@/components/visuals/GISRiskMap';

interface DashboardProps {
  onLogout: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [view, setView] = useState<DashView>('dashboard');

  return (
    <div className="flex min-h-screen bg-surface-base">
      <Sidebar active={view} onNavigate={setView} onLogout={onLogout} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar view={view} />
        <main className="flex-1 p-5 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {view === 'dashboard' && <DashboardOverview />}
              {view === 'projects' && <ProjectTable />}
              {view === 'gis' && <GISRiskMap />}
              {view === 'insights' && <InsightsView />}
              {view === 'analytics' && <AnalyticsCharts />}
              {view === 'alerts' && <AlertsView />}
              {view === 'reports' && <ReportsView />}
              {view === 'upload' && <DataUploadView />}
              {view === 'model' && <ModelPerformanceView />}
              {view === 'retraining' && <RetrainingView />}
              {view === 'users' && <UsersView />}
              {view === 'audit' && <AuditLogView />}
              {view === 'settings' && <SettingsView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
