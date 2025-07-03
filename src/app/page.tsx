import  { Users, Wallet, Activity, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Total PSMs', value: '24', icon: Users, color: 'text-secondary' },
    { label: 'Wallet Balance', value: '1.45 ETH', icon: Wallet, color: 'text-info' },
    { label: 'Active Hires', value: '1', icon: Activity, color: 'text-primary' },
    { label: 'Total Payments', value: '$2,840', icon: TrendingUp, color: 'text-secondary' },
  ];

  return (
    <div className="space-y-8 px-4 py-8" style={{ background: 'linear-gradient(135deg, #f7f7f8 0%, #e0c3fc 100%)', minHeight: '100vh' }}>
      <h1 className="text-center" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#222', fontSize: '1rem', fontWeight: 500, marginBottom: '2.5rem' }}>Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            className="rounded-2xl shadow-lg p-8 flex flex-col items-center transition-transform duration-300 ease-out transform hover:-translate-y-2 hover:scale-105 cursor-pointer"
            style={{
              background: idx % 2 === 0
                ? 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
                : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              border: 'none',
            }}
          >
            <stat.icon className="w-10 h-10 mb-4 text-[#635BFF]" />
            <div className="text-xl font-bold mb-2" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#111', fontSize: '1.5rem' }}>{stat.value}</div>
            <div className="text-lg font-medium text-[#111] opacity-85" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#111' }}>Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium" style={{ color: '#111' }}>Payment to PSM #{i}</p>
                  <p className="text-sm" style={{ color: '#888' }}>2 hours ago</p>
                </div>
                <span className="font-medium" style={{ color: '#635BFF' }}>0.1 ETH</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#111' }}>Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full rounded-full bg-[#635BFF] hover:bg-[#7d4875] text-white py-3 px-4 font-bold transition" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>
              Browse PSMs
            </button>
            <button className="w-full rounded-full bg-[#F7F7F8] border border-[#EDEDED] hover:bg-[#EDEDED] text-[#111] py-3 px-4 font-bold transition" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>
              Deposit Funds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}