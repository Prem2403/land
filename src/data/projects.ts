export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export const RISK_COLORS: Record<RiskLevel, string> = {
  low: '#16A34A',
  medium: '#D97706',
  high: '#DC2626',
  critical: '#991B1B',
};

export const RISK_LABELS: Record<RiskLevel, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

export function riskFromScore(score: number): RiskLevel {
  if (score >= 80) return 'critical';
  if (score >= 60) return 'high';
  if (score >= 35) return 'medium';
  return 'low';
}

export interface ProjectMarker {
  id: string;
  name: string;
  state: string;
  district: string;
  x: number; // 0-100 normalized position on map
  y: number;
  riskScore: number;
  delayProbability: number;
  expectedDelay: string;
  progress: number;
  mainRisk: string;
  status: RiskLevel;
}

// Coordinates are normalized (0-100) approximations for an India map bounding box.
export const PROJECTS: ProjectMarker[] = [
  { id: 'P-1001', name: 'NH-16 Highway Expansion', state: 'Odisha', district: 'Khordha', x: 58, y: 52, riskScore: 84, delayProbability: 82, expectedDelay: '5 Months', progress: 50, mainRisk: 'Legal Disputes', status: 'critical' },
  { id: 'P-1002', name: 'Mumbai-Ahmedabad HSR', state: 'Maharashtra', district: 'Palghar', x: 22, y: 58, riskScore: 72, delayProbability: 68, expectedDelay: '4 Months', progress: 62, mainRisk: 'Compensation Delay', status: 'high' },
  { id: 'P-1003', name: 'Delhi-Mumbai Expressway', state: 'Rajasthan', district: 'Jaipur', x: 32, y: 34, riskScore: 45, delayProbability: 38, expectedDelay: '1 Month', progress: 78, mainRisk: 'Pending Approvals', status: 'medium' },
  { id: 'P-1004', name: 'Ken-Betwa Link', state: 'Madhya Pradesh', district: 'Tikamgarh', x: 40, y: 40, riskScore: 28, delayProbability: 22, expectedDelay: '2 Weeks', progress: 85, mainRisk: 'Documentation', status: 'low' },
  { id: 'P-1005', name: 'Polavaram Irrigation', state: 'Andhra Pradesh', district: 'West Godavari', x: 55, y: 64, riskScore: 66, delayProbability: 60, expectedDelay: '3 Months', progress: 55, mainRisk: 'R&R Progress', status: 'high' },
  { id: 'P-1006', name: 'Bengaluru Metro Phase 3', state: 'Karnataka', district: 'Bengaluru Urban', x: 42, y: 68, riskScore: 38, delayProbability: 30, expectedDelay: '3 Weeks', progress: 72, mainRisk: 'Stakeholder Coordination', status: 'medium' },
  { id: 'P-1007', name: 'Chennai Peripheral Ring', state: 'Tamil Nadu', district: 'Kanchipuram', x: 50, y: 74, riskScore: 52, delayProbability: 48, expectedDelay: '2 Months', progress: 65, mainRisk: 'Compensation Delay', status: 'medium' },
  { id: 'P-1008', name: 'Kolkata East-West Metro', state: 'West Bengal', district: 'Kolkata', x: 64, y: 48, riskScore: 78, delayProbability: 74, expectedDelay: '6 Months', progress: 40, mainRisk: 'Legal Disputes', status: 'high' },
  { id: 'P-1009', name: 'Guwahati Riverfront', state: 'Assam', district: 'Kamrup', x: 76, y: 32, riskScore: 41, delayProbability: 35, expectedDelay: '1 Month', progress: 70, mainRisk: 'Pending Approvals', status: 'medium' },
  { id: 'P-1010', name: 'Jaipur Smart City', state: 'Rajasthan', district: 'Jaipur', x: 30, y: 36, riskScore: 24, delayProbability: 18, expectedDelay: '2 Weeks', progress: 88, mainRisk: 'Documentation', status: 'low' },
  { id: 'P-1011', name: 'Hyderabad ORR Extension', state: 'Telangana', district: 'Rangareddy', x: 46, y: 62, riskScore: 33, delayProbability: 26, expectedDelay: '3 Weeks', progress: 80, mainRisk: 'Stakeholder Coordination', status: 'low' },
  { id: 'P-1012', name: 'Kochi Water Metro', state: 'Kerala', district: 'Ernakulam', x: 44, y: 78, riskScore: 58, delayProbability: 52, expectedDelay: '2 Months', progress: 60, mainRisk: 'Compensation Delay', status: 'medium' },
  { id: 'P-1013', name: 'Patna Ganga Bridge', state: 'Bihar', district: 'Patna', x: 56, y: 40, riskScore: 69, delayProbability: 63, expectedDelay: '3 Months', progress: 48, mainRisk: 'Legal Disputes', status: 'high' },
  { id: 'P-1014', name: 'Bhopal BRTS Phase 2', state: 'Madhya Pradesh', district: 'Bhopal', x: 38, y: 44, riskScore: 22, delayProbability: 16, expectedDelay: '1 Week', progress: 90, mainRisk: 'Documentation', status: 'low' },
  { id: 'P-1015', name: 'Surat Creek Bridge', state: 'Gujarat', district: 'Surat', x: 24, y: 52, riskScore: 47, delayProbability: 40, expectedDelay: '1 Month', progress: 74, mainRisk: 'Pending Approvals', status: 'medium' },
  { id: 'P-1016', name: 'Nagpur-Mumbai Samruddhi', state: 'Maharashtra', district: 'Nagpur', x: 34, y: 56, riskScore: 55, delayProbability: 50, expectedDelay: '2 Months', progress: 64, mainRisk: 'R&R Progress', status: 'medium' },
  { id: 'P-1017', name: 'Ranchi Ring Road', state: 'Jharkhand', district: 'Ranchi', x: 54, y: 46, riskScore: 63, delayProbability: 57, expectedDelay: '3 Months', progress: 52, mainRisk: 'Compensation Delay', status: 'high' },
  { id: 'P-1018', name: 'Lucknow-Agra Expressway', state: 'Uttar Pradesh', district: 'Agra', x: 40, y: 32, riskScore: 36, delayProbability: 28, expectedDelay: '3 Weeks', progress: 76, mainRisk: 'Stakeholder Coordination', status: 'medium' },
];

export interface LifecycleStage {
  id: number;
  name: string;
  icon: string;
  progress: number;
  delayProbability: number;
  risk: RiskLevel;
}

export const LIFECYCLE_STAGES: LifecycleStage[] = [
  { id: 1, name: 'Notification', icon: 'Bell', progress: 95, delayProbability: 8, risk: 'low' },
  { id: 2, name: 'Survey', icon: 'Ruler', progress: 88, delayProbability: 14, risk: 'low' },
  { id: 3, name: 'Valuation', icon: 'Calculator', progress: 72, delayProbability: 28, risk: 'medium' },
  { id: 4, name: 'Compensation', icon: 'Banknote', progress: 50, delayProbability: 76, risk: 'high' },
  { id: 5, name: 'Legal Resolution', icon: 'Scale', progress: 35, delayProbability: 82, risk: 'critical' },
  { id: 6, name: 'Rehabilitation & Resettlement', icon: 'Users', progress: 40, delayProbability: 64, risk: 'high' },
  { id: 7, name: 'Possession', icon: 'KeyRound', progress: 20, delayProbability: 45, risk: 'medium' },
  { id: 8, name: 'Completion', icon: 'CheckCircle2', progress: 0, delayProbability: 12, risk: 'low' },
];

export interface FeatureContribution {
  factor: string;
  contribution: number;
  critical: boolean;
}

export const FEATURE_CONTRIBUTIONS: FeatureContribution[] = [
  { factor: 'Legal Disputes', contribution: 24, critical: true },
  { factor: 'Compensation Delay', contribution: 21, critical: true },
  { factor: 'Pending Approvals', contribution: 15, critical: false },
  { factor: 'Documentation', contribution: 12, critical: false },
  { factor: 'R&R Progress', contribution: 8, critical: false },
  { factor: 'Stakeholder Responsiveness', contribution: 6, critical: false },
];

export interface Recommendation {
  id: number;
  action: string;
  priority: 'Critical' | 'High' | 'Medium';
  reason: string;
  impact: string;
  status: 'Pending' | 'In Progress' | 'Implemented';
}

export const RECOMMENDATIONS: Recommendation[] = [
  { id: 1, action: 'Resolve priority legal disputes', priority: 'Critical', reason: '12 active disputes are blocking compensation disbursement.', impact: 'Reduces delay probability by ~18%', status: 'Pending' },
  { id: 2, action: 'Accelerate compensation verification', priority: 'High', reason: 'Only 50% of affected families compensated.', impact: 'Improves R&R progress and stakeholder trust', status: 'In Progress' },
  { id: 3, action: 'Escalate pending approvals', priority: 'High', reason: 'Approval pending for 42 days beyond SLA.', impact: 'Unblocks possession stage', status: 'Pending' },
  { id: 4, action: 'Review incomplete documentation', priority: 'Medium', reason: '23 land parcels have missing title records.', impact: 'Prevents future legal exposure', status: 'Pending' },
  { id: 5, action: 'Improve stakeholder coordination', priority: 'Medium', reason: 'Response time from district officers above threshold.', impact: 'Faster decision turnaround', status: 'Implemented' },
];

export interface AlertItem {
  id: string;
  severity: 'critical' | 'warning' | 'information' | 'resolved';
  project: string;
  message: string;
  detail: string;
  recommended: string;
  time: string;
}

export const ALERTS: AlertItem[] = [
  { id: 'A-01', severity: 'critical', project: 'NH-16 Expansion', message: 'Risk increased: 61 → 84', detail: 'Legal disputes increased from 7 to 12 in the last 14 days.', recommended: 'Immediate intervention required.', time: '2h ago' },
  { id: 'A-02', severity: 'warning', project: 'Kolkata East-West Metro', message: 'Compensation disbursement stalled', detail: 'No compensation payments processed in 21 days.', recommended: 'Review disbursement pipeline.', time: '6h ago' },
  { id: 'A-03', severity: 'warning', project: 'Polavaram Irrigation', message: 'R&R progress below target', detail: 'Rehabilitation at 40% against 65% target.', recommended: 'Deploy additional R&R teams.', time: '1d ago' },
  { id: 'A-04', severity: 'information', project: 'Bengaluru Metro Phase 3', message: 'Stakeholder response improved', detail: 'Average response time down 22%.', recommended: 'Maintain current cadence.', time: '2d ago' },
  { id: 'A-05', severity: 'resolved', project: 'Jaipur Smart City', message: 'Documentation gap closed', detail: 'All 8 missing title records resolved.', recommended: 'No action needed.', time: '3d ago' },
];

export interface PredictionInput {
  label: string;
  value: string;
}

export const PREDICTION_INPUTS: PredictionInput[] = [
  { label: 'Land Area', value: '250 acres' },
  { label: 'Affected Families', value: '180' },
  { label: 'Legal Disputes', value: '12' },
  { label: 'Compensation', value: '50%' },
  { label: 'R&R Progress', value: '40%' },
  { label: 'Approval', value: 'Pending' },
];

export const DASHBOARD_STATS = {
  totalProjects: 1248,
  highRisk: 184,
  mediumRisk: 392,
  lowRisk: 672,
  predictedDelays: 237,
  averageDelay: 42,
};

// Analytics chart data
export const STATE_RISK_DATA = [
  { state: 'Odisha', low: 12, medium: 18, high: 14, critical: 8 },
  { state: 'Maharashtra', low: 28, medium: 22, high: 10, critical: 4 },
  { state: 'Rajasthan', low: 24, medium: 16, high: 6, critical: 2 },
  { state: 'UP', low: 30, medium: 20, high: 12, critical: 5 },
  { state: 'WB', low: 10, medium: 14, high: 16, critical: 9 },
  { state: 'Karnataka', low: 26, medium: 18, high: 8, critical: 3 },
  { state: 'TN', low: 22, medium: 20, high: 10, critical: 4 },
];

export const DELAY_CAUSES_DATA = [
  { name: 'Legal Disputes', value: 28 },
  { name: 'Compensation', value: 24 },
  { name: 'Approvals', value: 18 },
  { name: 'R&R', value: 14 },
  { name: 'Documentation', value: 9 },
  { name: 'Stakeholder', value: 7 },
];

export const HISTORICAL_TRENDS = [
  { month: 'Jan', delays: 182, predicted: 190 },
  { month: 'Feb', delays: 175, predicted: 178 },
  { month: 'Mar', delays: 198, predicted: 205 },
  { month: 'Apr', delays: 210, predicted: 215 },
  { month: 'May', delays: 195, predicted: 200 },
  { month: 'Jun', delays: 222, predicted: 230 },
  { month: 'Jul', delays: 237, predicted: 240 },
];

export const PROJECT_TYPE_DATA = [
  { type: 'Highway', avg: 58 },
  { type: 'Railway', avg: 64 },
  { type: 'Irrigation', avg: 47 },
  { type: 'Urban', avg: 39 },
  { type: 'Power', avg: 52 },
  { type: 'Industrial', avg: 44 },
];

export const COMPENSATION_PROGRESS = [
  { stage: 'Valued', value: 78 },
  { stage: 'Approved', value: 62 },
  { stage: 'Disbursed', value: 50 },
  { stage: 'Acknowledged', value: 44 },
];

export const LEGAL_DISPUTE_TRENDS = [
  { month: 'Jan', filed: 24, resolved: 18 },
  { month: 'Feb', filed: 28, resolved: 22 },
  { month: 'Mar', filed: 22, resolved: 26 },
  { month: 'Apr', filed: 31, resolved: 24 },
  { month: 'May', filed: 26, resolved: 28 },
  { month: 'Jun', filed: 34, resolved: 25 },
  { month: 'Jul', filed: 30, resolved: 29 },
];

export const DISTRICT_RISK_DATA = [
  { district: 'Khordha', score: 84 },
  { district: 'Kolkata', score: 78 },
  { district: 'Palghar', score: 72 },
  { district: 'Ranchi', score: 63 },
  { district: 'Patna', score: 69 },
  { district: 'West Godavari', score: 66 },
  { district: 'Kanchipuram', score: 52 },
  { district: 'Ernakulam', score: 58 },
];

export const MODEL_METRICS = {
  accuracy: 91.4,
  precision: 89.2,
  recall: 87.6,
  f1: 88.4,
  rocAuc: 93.1,
  trainingData: '12,400 projects',
  modelVersion: 'v3.2.1',
  lastUpdated: '2026-08-24',
  model: 'Random Forest / XGBoost',
};

export const RETRAINING_PIPELINE = [
  { name: 'New Data', icon: 'Database' },
  { name: 'Cleaning', icon: 'Sparkles' },
  { name: 'Feature Engineering', icon: 'Wrench' },
  { name: 'Training', icon: 'Cpu' },
  { name: 'Validation', icon: 'CheckCheck' },
  { name: 'Evaluation', icon: 'Gauge' },
  { name: 'Deployment', icon: 'Rocket' },
];

export interface ProjectRow {
  id: string;
  name: string;
  state: string;
  district: string;
  riskScore: number;
  delayProbability: number;
  expectedDelay: string;
  status: RiskLevel;
  progress: number;
}

export const PROJECT_ROWS: ProjectRow[] = PROJECTS.map((p) => ({
  id: p.id,
  name: p.name,
  state: p.state,
  district: p.district,
  riskScore: p.riskScore,
  delayProbability: p.delayProbability,
  expectedDelay: p.expectedDelay,
  status: p.status,
  progress: p.progress,
}));

export interface StageProgress {
  name: string;
  progress: number;
  risk: RiskLevel;
  delayProbability: number;
}

export const PROJECT_STAGE_PROGRESS: StageProgress[] = [
  { name: 'Notification', progress: 95, risk: 'low', delayProbability: 8 },
  { name: 'Survey', progress: 88, risk: 'low', delayProbability: 14 },
  { name: 'Valuation', progress: 72, risk: 'medium', delayProbability: 28 },
  { name: 'Compensation', progress: 50, risk: 'high', delayProbability: 76 },
  { name: 'Legal', progress: 35, risk: 'critical', delayProbability: 82 },
  { name: 'R&R', progress: 40, risk: 'high', delayProbability: 64 },
  { name: 'Possession', progress: 20, risk: 'medium', delayProbability: 45 },
];

export interface PublicProject {
  name: string;
  location: string;
  status: string;
  progress: number;
  notice: string;
}

export const PUBLIC_PROJECTS: PublicProject[] = [
  { name: 'NH-16 Highway Expansion', location: 'Khordha, Odisha', status: 'In Progress', progress: 50, notice: 'Public hearing scheduled 12 Sep 2026' },
  { name: 'Mumbai-Ahmedabad HSR', location: 'Palghar, Maharashtra', status: 'In Progress', progress: 62, notice: 'Compensation notification issued' },
  { name: 'Jaipur Smart City', location: 'Jaipur, Rajasthan', status: 'Near Completion', progress: 88, notice: 'Final possession notice published' },
  { name: 'Bhopal BRTS Phase 2', location: 'Bhopal, Madhya Pradesh', status: 'Near Completion', progress: 90, notice: 'R&R completion report available' },
];

export interface SatelliteRegion {
  id: string;
  name: string;
  state: string;
  parcels: number;
  acquired: number;
  cloudCover: number;
  lastCapture: string;
  changeDetected: number;
}

export const SATELLITE_REGIONS: SatelliteRegion[] = [
  { id: 'SAT-01', name: 'Eastern Freight Corridor', state: 'Uttar Pradesh', parcels: 18420, acquired: 72, cloudCover: 8, lastCapture: '28 Aug 2026', changeDetected: 14 },
  { id: 'SAT-02', name: 'NH-16 Expansion Zone', state: 'Odisha', parcels: 9210, acquired: 50, cloudCover: 18, lastCapture: '27 Aug 2026', changeDetected: 22 },
  { id: 'SAT-03', name: 'Mumbai–Ahmedabad HSR', state: 'Maharashtra', parcels: 14780, acquired: 62, cloudCover: 5, lastCapture: '26 Aug 2026', changeDetected: 9 },
  { id: 'SAT-04', name: 'Bengaluru Metro Corridor', state: 'Karnataka', parcels: 6340, acquired: 72, cloudCover: 12, lastCapture: '25 Aug 2026', changeDetected: 6 },
  { id: 'SAT-05', name: 'Polavaram Irrigation Basin', state: 'Andhra Pradesh', parcels: 11890, acquired: 55, cloudCover: 24, lastCapture: '24 Aug 2026', changeDetected: 18 },
];

export const STATE_MONITORING_DATA = [
  { state: 'Odisha', monitored: 148, highRisk: 34, acquisition: 58, trend: 12 },
  { state: 'Maharashtra', monitored: 226, highRisk: 28, acquisition: 67, trend: -4 },
  { state: 'Rajasthan', monitored: 194, highRisk: 19, acquisition: 74, trend: -8 },
  { state: 'Uttar Pradesh', monitored: 286, highRisk: 42, acquisition: 61, trend: 7 },
  { state: 'West Bengal', monitored: 126, highRisk: 31, acquisition: 49, trend: 15 },
  { state: 'Karnataka', monitored: 172, highRisk: 21, acquisition: 76, trend: -6 },
  { state: 'Tamil Nadu', monitored: 156, highRisk: 24, acquisition: 63, trend: 3 },
  { state: 'Andhra Pradesh', monitored: 140, highRisk: 27, acquisition: 55, trend: 11 },
];

export const MONTHLY_RISK_FORECAST = [
  { month: 'Sep', baseline: 237, expected: 221, intervention: 198 },
  { month: 'Oct', baseline: 252, expected: 229, intervention: 188 },
  { month: 'Nov', baseline: 268, expected: 235, intervention: 181 },
  { month: 'Dec', baseline: 281, expected: 240, intervention: 174 },
  { month: 'Jan', baseline: 296, expected: 246, intervention: 169 },
  { month: 'Feb', baseline: 310, expected: 251, intervention: 164 },
];

export const DATASET_SUMMARY = {
  totalRecords: '2.4M',
  satelliteScenes: 1842,
  lastSync: '29 Aug 2026 · 06:42 IST',
  coverage: 96.8,
  modelSignals: 47,
};
