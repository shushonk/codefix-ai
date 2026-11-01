import React from 'react';
import { 
  FileSearch, 
  ShieldAlert, 
  Bug, 
  CheckCircle2, 
  ArrowUpRight,
  Clock,
  TrendingUp,
  AlertCircle,
  Plus,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { cn } from '../utils/ui';

const stats = [
  { label: 'Files Reviewed', value: '124', icon: FileSearch, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { label: 'Issues Detected', value: '38', icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { label: 'Security Risks', value: '12', icon: ShieldAlert, color: 'text-rose-400', bg: 'bg-rose-400/10' },
  { label: 'Bugs Fixed', value: '24', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
];

const severityData = [
  { name: 'Critical', value: 4, color: '#F43F5E' },
  { name: 'High', value: 8, color: '#FB923C' },
  { name: 'Medium', value: 15, color: '#FBBF24' },
  { name: 'Low', value: 11, color: '#38BDF8' },
];

const activityData = [
  { day: 'Mon', issues: 4 },
  { day: 'Tue', issues: 7 },
  { day: 'Wed', issues: 5 },
  { day: 'Thu', issues: 12 },
  { day: 'Fri', issues: 8 },
  { day: 'Sat', issues: 2 },
  { day: 'Sun', issues: 3 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Workbench Overview</h1>
          <p className="text-slate-500">Welcome back. Your code quality metrics are trending upward.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-500/20">
          <Plus className="w-4 h-4" />
          <span>New Review</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="p-6 rounded-2xl bg-[#0F0F12] border border-slate-800/50 hover:border-slate-700/50 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className={cn("p-2 rounded-lg", stat.bg)}>
                  <Icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span>+12%</span>
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-slate-500 text-sm font-medium">{stat.label}</h3>
                <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0F0F12] border border-slate-800/50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold">Issue Detection History</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span>Issues Detected</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="#64748B" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F0F12', border: '1px solid #1E293B', borderRadius: '8px' }}
                  itemStyle={{ color: '#A855F7' }}
                />
                <Bar 
                  dataKey="issues" 
                  fill="#A855F7" 
                  radius={[4, 4, 0, 0]} 
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity Distribution */}
        <div className="p-6 rounded-2xl bg-[#0F0F12] border border-slate-800/50">
          <h3 className="font-bold mb-8">Severity Distribution</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F0F12', border: '1px solid #1E293B', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold">38</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Total</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {severityData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-400">{item.name}</span>
                <span className="text-xs font-bold ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 rounded-2xl bg-[#0F0F12] border border-slate-800/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold">Recent Reviews</h3>
          <button className="text-xs text-purple-400 hover:text-purple-300 transition-all flex items-center gap-1">
            <span>View All</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-800/30 bg-slate-900/20 hover:bg-slate-900/40 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-slate-100 transition-colors">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Auth Module Security Audit</h4>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500">
                    <span>auth_service.py</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span>8 findings</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span>2 hours ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                   <div className="w-2 h-2 rounded-full bg-rose-500" title="Critical" />
                   <div className="w-2 h-2 rounded-full bg-amber-500" title="High" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

