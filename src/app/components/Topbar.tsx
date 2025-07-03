"use client";

import { Bell, Wallet } from 'lucide-react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}
export default function Topbar({ onSidebarToggle = () => {} }) {
  const { login, logout, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const address = wallets?.[0]?.address;

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg rounded-b-2xl px-4 md:px-8 py-4 mt-2 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <button
          className="md:hidden text-2xl mr-4"
          aria-label="Open sidebar"
          onClick={onSidebarToggle}
        >
          ☰
        </button>
        <h2 className="text-xl font-bold" style={{ color: '#222', fontFamily: 'Jura, Arial, Helvetica, sans-serif', letterSpacing: '0.01em' }}>Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-[#635BFF] hover:bg-[#f7f7f8] rounded-full transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          {authenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center px-3 py-2 bg-[#F7F7F8] rounded-full">
                <Wallet className="w-4 h-4 mr-2 text-[#635BFF]" />
                <span className="text-sm font-medium text-[#222]" style={{ fontFamily: 'Inter, Arial, Helvetica, sans-serif' }}>
                  {shortenAddress(address)}
                </span>
              </div>
              <button 
                onClick={logout}
                className="bg-[#635BFF] hover:bg-[#7d4875] text-white px-5 py-2 rounded-full transition-colors font-bold shadow-sm"
                style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button 
              onClick={login}
              className="bg-[#635BFF] hover:bg-[#7d4875] text-white px-5 py-2 rounded-full flex items-center space-x-2 transition-colors font-bold shadow-sm"
              style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}
            >
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}