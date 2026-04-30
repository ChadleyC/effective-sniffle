import React from 'react';
import Card from '../../ui/Card';

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendValue?: string;
  icon: string;
  iconColor: string;
  iconBg: string;
}

const StatCard = ({ label, value, trend, trendValue, icon, iconColor, iconBg }: StatCardProps) => (
  <Card className="p-6 flex flex-col justify-between h-32">
    <div className="flex justify-between items-start">
      <span className="text-slate-500 font-label-md uppercase tracking-wider">{label}</span>
      <div className={`${iconBg} p-1.5 rounded-lg`}>
        <span className={`material-symbols-outlined ${iconColor} text-xl`}>{icon}</span>
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold text-slate-900">{value}</span>
      {trendValue && (
        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
          trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 
          trend === 'down' ? 'text-red-600 bg-red-50' : 
          'text-slate-400 bg-slate-100'
        }`}>
          {trendValue}
        </span>
      )}
    </div>
  </Card>
);

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard 
        label="Total Tasks" 
        value="1,284" 
        trend="up" 
        trendValue="+12%" 
        icon="list_alt" 
        iconColor="text-primary" 
        iconBg="bg-blue-50" 
      />
      <StatCard 
        label="In Progress" 
        value="342" 
        trend="stable" 
        trendValue="Stable" 
        icon="pending" 
        iconColor="text-amber-600" 
        iconBg="bg-amber-50" 
      />
      <StatCard 
        label="Completed" 
        value="894" 
        trend="up" 
        trendValue="+24%" 
        icon="check_circle" 
        iconColor="text-emerald-600" 
        iconBg="bg-emerald-50" 
      />
      <StatCard 
        label="Overdue" 
        value="48" 
        trend="down" 
        trendValue="-5%" 
        icon="error" 
        iconColor="text-red-600" 
        iconBg="bg-red-50" 
      />
    </div>
  );
};

export default StatsGrid;
