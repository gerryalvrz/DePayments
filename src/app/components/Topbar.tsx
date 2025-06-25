"use client";

import { Bell, Wallet } from 'lucide-react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}
export default function Topbar() {
  const { login, logout, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const address = wallets?.[0]?.address;

  return (
    <header className="bg-surface shadow-sm border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-textPrimary">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          {authenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center px-3 py-2 bg-gray-800 rounded-lg">
                <Wallet className="w-4 h-4 mr-2 text-primary" />
                <span className="text-sm font-medium">
                  {shortenAddress(address)}
                </span>
              </div>
              <button 
                onClick={logout}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button 
              onClick={login}
              className="bg-primary hover:bg-opacity-80 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
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