import  { Users, Wallet, Activity, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total PSMs', value: '24', icon: Users, color: 'text-secondary' },
    { label: 'Wallet Balance', value: '0.45 ETH', icon: Wallet, color: 'text-info' },
    { label: 'Active Hires', value: '1', icon: Activity, color: 'text-primary' },
    { label: 'Total Payments', value: '$2,840', icon: TrendingUp, color: 'text-secondary' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-textPrimary">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-textPrimary mt-2">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-textPrimary font-medium">Payment to PSM #{i}</p>
                  <p className="text-gray-400 text-sm">2 hours ago</p>
                </div>
                <span className="text-secondary font-medium">0.1 ETH</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-primary hover:bg-opacity-80 text-white py-3 px-4 rounded-lg transition-colors">
              Browse PSMs
            </button>
            <button className="w-full bg-surface border border-border hover:bg-gray-700 text-textPrimary py-3 px-4 rounded-lg transition-colors">
              Deposit Funds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}