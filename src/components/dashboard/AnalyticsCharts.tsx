import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import {
  STATE_RISK_DATA, DELAY_CAUSES_DATA, HISTORICAL_TRENDS, PROJECT_TYPE_DATA,
  COMPENSATION_PROGRESS, LEGAL_DISPUTE_TRENDS, DISTRICT_RISK_DATA,
} from '@/data/projects';

const GREEN = '#0B5D3B';
const ACCENT = '#2E9B68';
const LIGHT = '#BFE3D0';
const ORANGE = '#D97706';
const RED = '#DC2626';
const DARK = '#063B27';

const PIE_COLORS = [GREEN, ACCENT, ORANGE, LIGHT, '#087F5B', '#146C43'];

function ChartCard({ title, children, height = 260 }: { title: string; children: React.ReactNode; height?: number }) {
  return (
    <div className="card-base p-5">
      <h3 className="font-heading text-sm font-700 uppercase tracking-wide text-ink">{title}</h3>
      <div className="mt-4" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">{children as React.ReactElement}</ResponsiveContainer>
      </div>
    </div>
  );
}

const tooltipStyle = {
  borderRadius: 12,
  border: '1px solid #D8E5DE',
  fontSize: 12,
  boxShadow: '0 4px 16px rgba(6,59,39,0.08)',
};

export function AnalyticsCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartCard title="State-wise Risk Distribution">
        <BarChart data={STATE_RISK_DATA} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8F5EE" vertical={false} />
          <XAxis dataKey="state" tick={{ fontSize: 11, fill: '#60756B' }} axisLine={{ stroke: '#D8E5DE' }} />
          <YAxis tick={{ fontSize: 11, fill: '#60756B' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#F7FAF8' }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="low" stackId="a" fill={GREEN} />
          <Bar dataKey="medium" stackId="a" fill={ORANGE} />
          <Bar dataKey="high" stackId="a" fill={RED} />
          <Bar dataKey="critical" stackId="a" fill="#991B1B" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartCard>

      <ChartCard title="Delay Causes Breakdown">
        <PieChart>
          <Pie data={DELAY_CAUSES_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2}>
            {DELAY_CAUSES_DATA.map((_, i) => (
              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
        </PieChart>
      </ChartCard>

      <ChartCard title="Historical Delay Trends">
        <AreaChart data={HISTORICAL_TRENDS}>
          <defs>
            <linearGradient id="gDelays" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GREEN} stopOpacity={0.3} />
              <stop offset="100%" stopColor={GREEN} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gPredicted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ACCENT} stopOpacity={0.3} />
              <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8F5EE" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#60756B' }} axisLine={{ stroke: '#D8E5DE' }} />
          <YAxis tick={{ fontSize: 11, fill: '#60756B' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Area type="monotone" dataKey="delays" stroke={GREEN} fill="url(#gDelays)" strokeWidth={2} />
          <Area type="monotone" dataKey="predicted" stroke={ACCENT} fill="url(#gPredicted)" strokeWidth={2} strokeDasharray="4 4" />
        </AreaChart>
      </ChartCard>

      <ChartCard title="District-wise Risk Score">
        <BarChart data={DISTRICT_RISK_DATA} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="#E8F5EE" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: '#60756B' }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="district" tick={{ fontSize: 11, fill: '#60756B' }} width={80} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#F7FAF8' }} />
          <Bar dataKey="score" fill={GREEN} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ChartCard>

      <ChartCard title="Project Type Comparison (Avg Delay)">
        <BarChart data={PROJECT_TYPE_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8F5EE" vertical={false} />
          <XAxis dataKey="type" tick={{ fontSize: 11, fill: '#60756B' }} axisLine={{ stroke: '#D8E5DE' }} />
          <YAxis tick={{ fontSize: 11, fill: '#60756B' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#F7FAF8' }} />
          <Bar dataKey="avg" fill={ACCENT} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartCard>

      <ChartCard title="Compensation Progress">
        <BarChart data={COMPENSATION_PROGRESS}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8F5EE" vertical={false} />
          <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#60756B' }} axisLine={{ stroke: '#D8E5DE' }} />
          <YAxis tick={{ fontSize: 11, fill: '#60756B' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: '#F7FAF8' }} />
          <Bar dataKey="value" fill={GREEN} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartCard>

      <ChartCard title="Legal Dispute Trends">
        <LineChart data={LEGAL_DISPUTE_TRENDS}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8F5EE" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#60756B' }} axisLine={{ stroke: '#D8E5DE' }} />
          <YAxis tick={{ fontSize: 11, fill: '#60756B' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line type="monotone" dataKey="filed" stroke={RED} strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="resolved" stroke={GREEN} strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ChartCard>

      <ChartCard title="Average Delay by Category">
        <RadarChart data={PROJECT_TYPE_DATA}>
          <PolarGrid stroke="#D8E5DE" />
          <PolarAngleAxis dataKey="type" tick={{ fontSize: 11, fill: '#60756B' }} />
          <PolarRadiusAxis tick={{ fontSize: 10, fill: '#60756B' }} axisLine={false} />
          <Radar dataKey="avg" stroke={DARK} fill={ACCENT} fillOpacity={0.35} strokeWidth={2} />
          <Tooltip contentStyle={tooltipStyle} />
        </RadarChart>
      </ChartCard>
    </div>
  );
}
