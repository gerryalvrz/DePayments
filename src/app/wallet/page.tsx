"use client";

import { useState, useEffect } from "react";
import { Wallet as WalletIcon, Send, ExternalLink } from "lucide-react";
import { usePrivy, useWallets } from "@privy-io/react-auth";

export default function Wallet() {
  const { login, logout, ready, authenticated,getAccessToken } = usePrivy();
  const { wallets } = useWallets();

  const [showDeposit, setShowDeposit] = useState(false);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState<string | null>(null);
  
  

  useEffect(() => {
    if (wallets?.length) {
      setAddress(wallets[0].address);
    }
      let callBack =async() =>{
      const accessToken = await getAccessToken();
      console.log("accessToken",accessToken)
    };
    callBack()
  }, [wallets]);

  const connectWallet = () => login();
  const disconnectWallet = () => logout();

  return (
    <div className="space-y-8 px-4 py-8" style={{ background: 'linear-gradient(135deg, #f7f7f8 0%, #e0c3fc 100%)', minHeight: '100vh' }}>
      <h1 className="text-center" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#222', fontSize: '1rem', fontWeight: 500, marginBottom: '2.5rem' }}>Wallet</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl shadow-lg p-8 flex flex-col transition-transform duration-300 ease-out transform hover:-translate-y-2 hover:scale-105 cursor-pointer bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#222' }}>Wallet Status</h3>
            <WalletIcon className="w-8 h-8 text-[#635BFF]" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Connected Address</p>
              <p className="text-black font-mono">
                {authenticated && address ? address : "Not connected"}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Balance</p>
              <p className="text-2xl font-bold text-[#635BFF]">0.45 ETH</p>
              <p className="text-gray-400 text-sm">≈ $1,234.56</p>
            </div>
          </div>
          {authenticated ? (
            <button
              onClick={() => setShowDeposit(true)}
              className="w-full mt-6 rounded-full bg-[#635BFF] hover:bg-[#7d4875] text-white py-3 px-4 font-bold flex items-center justify-center space-x-2 transition"
              style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}
            >
              <Send className="w-4 h-4" />
              <span>Deposit to PSM</span>
            </button>
          ) : (
            <button
              onClick={connectWallet}
              className="w-full mt-6 rounded-full bg-[#635BFF] text-white py-3 px-4 font-bold transition"
              style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}
            >
              Connect Wallet
            </button>
          )}
        </div>
        <div className="rounded-2xl shadow-lg p-8 bg-white transition-transform duration-300 ease-out transform hover:-translate-y-2 hover:scale-105 cursor-pointer">
          <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#222' }}>
            Recent Transactions
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-gray-100"
              >
                <div>
                  <p className="text-black font-medium">Payment #{i}</p>
                  <a href="#" className="text-[#635BFF] text-sm flex items-center">
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
          <div className="bg-white p-8 rounded-2xl max-w-md w-full mx-4 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#222' }}>
              Deposit to PSM
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F7F7F8] border border-gray-200 rounded-lg text-black"
                  placeholder="0.1"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Recipient PSM
                </label>
                <select className="w-full px-3 py-2 bg-[#F7F7F8] border border-gray-200 rounded-lg text-black">
                  <option>Ana Rodriguez</option>
                  <option>Carlos Silva</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowDeposit(false)}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-[#635BFF] hover:bg-[#7d4875] text-white rounded-full font-bold transition-colors">
                Send Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
