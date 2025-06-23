import  { Bell, Wallet } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="bg-surface shadow-sm border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-textPrimary">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="bg-primary hover:bg-opacity-80 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Wallet className="w-4 h-4" />
            <span>Connect Wallet</span>
          </button>
        </div>
      </div>
    </header>
  );
}
 