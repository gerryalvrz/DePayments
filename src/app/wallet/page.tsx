"use client"
import  { useState } from 'react';
import { Wallet as WalletIcon, Send, ExternalLink } from 'lucide-react';

export default function Wallet() {
  const [showDeposit, setShowDeposit] = useState(false);
  const [amount, setAmount] = useState('');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-textPrimary">Wallet</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-textPrimary">Wallet Status</h3>
            <WalletIcon className="w-6 h-6 text-secondary" />
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Connected Address</p>
              <p className="text-textPrimary font-mono">0x742d...4B73</p>
            </div>
            
            <div>
              <p className="text-gray-400 text-sm">Balance</p>
              <p className="text-2xl font-bold text-secondary">0.45 ETH</p>
              <p className="text-gray-400 text-sm">≈ $1,234.56</p>
            </div>
          </div>

          <button
            onClick={() => setShowDeposit(true)}
            className="w-full mt-6 bg-primary hover:bg-opacity-80 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Deposit to PSM</span>
          </button>
        </div>

        <div className="bg-surface p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border">
                <div>
                  <p className="text-textPrimary font-medium">Payment #{i}</p>
                  <a href="#" className="text-info text-sm flex items-center">
                    0x742d...4B73 <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
                <span className="text-alert font-medium">-0.1 ETH</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showDeposit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-surface p-6 rounded-lg max-w-md w-full mx-4 border border-border">
            <h3 className="text-lg font-semibold text-textPrimary mb-4">Deposit to PSM</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Amount (ETH)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-dark border border-border rounded-lg text-textPrimary"
                  placeholder="0.1"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Recipient PSM</label>
                <select className="w-full px-3 py-2 bg-dark border border-border rounded-lg text-textPrimary">
                  <option>Ana Rodriguez</option>
                  <option>Carlos Silva</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowDeposit(false)}
                className="flex-1 px-4 py-2 border border-border text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-primary hover:bg-opacity-80 text-white rounded-lg transition-colors">
                Send Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}