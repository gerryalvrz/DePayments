import Link from 'next/link'
import { Home, Users, Wallet, User, CreditCard, Settings } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/psms', icon: Users, label: 'Browse PSMs' },
  { path: '/wallet', icon: Wallet, label: 'Wallet' },
  { path: '/current-hire', icon: User, label: 'Current Hire' },
  { path: '/payments', icon: CreditCard, label: 'Payments' },
  { path: '/profile', icon: Settings, label: 'Profile' },
  {path:"/psms-register",icon:Users,label:"PSM Management"}
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-surface shadow-lg border-r border-border">
      <div className="p-6">
        <h1 className="text-xl font-bold text-textPrimary">CryptoDash</h1>
        <p className="text-sm text-gray-400">Payments Dashboard</p>
      </div>
      <nav className="mt-6">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            href={path}
            className={
              `flex items-center px-6 py-3 text-sm font-medium transition-colors ${
             
                 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`
            }
          >
            <Icon className="w-5 h-5 mr-3" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
 