"use client";
import { Users, Wallet, Activity, TrendingUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { sdk as miniAppSdk } from '@farcaster/miniapp-sdk';  // For detection
import frameSdk from '@farcaster/frame-sdk';  // For signing (as in Privy docs)
import DepositModal from './components/DepositModal';
import { usePrivy, useWallets } from '@privy-io/react-auth';  // Updated Privy hooks
import { useLoginToFrame } from "@privy-io/react-auth/farcaster";

import { VerifyButton } from "./components/VerificationButton";
import { useSelf } from './providers/SelfProvider';

export default function Dashboard() {
  const { startVerification, isVerified, verificationError } = useSelf();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const { ready, authenticated, user } = usePrivy();  // Add ready and authenticated
  const { wallets } = useWallets();
  const address = wallets?.[0]?.address;
  const { initLoginToFrame, loginToFrame } = useLoginToFrame();  // Privy Mini App hook

  // TODO: Replace with real user data/logic
  const isPsychologist = false;
  const userId = user?.id || "user-id-demo";
  const userWallet = address || undefined;
  const psmWallet = undefined;
  const treasuryWallet = undefined;

  const stats = [
    { label: 'Total PSMs', value: '24', icon: Users, color: 'text-secondary' },
    { label: 'Wallet Balance', value: '1.45 ETH', icon: Wallet, color: 'text-info' },
    { label: 'Active Hires', value: '1', icon: Activity, color: 'text-primary' },
    { label: 'Total Payments', value: '$2,840', icon: TrendingUp, color: 'text-secondary' },
  ];

  const router = useRouter();
  const [isMiniApp, setIsMiniApp] = useState(false);  // State for async detection
  const [isLoading, setIsLoading] = useState(true);  // Handle async loading

  useEffect(() => {
    console.log("motus")
    const checkMiniAppAndLogin = async () => {
      try {
        const inMiniApp = await miniAppSdk.isInMiniApp();  // Detect Mini App context
        setIsMiniApp(inMiniApp);

        if (inMiniApp && ready && !authenticated) {
          // Auto-login using Privy Mini App recipe
          const { nonce } = await initLoginToFrame();
          const result = await frameSdk.actions.signIn({ nonce });  // Sign with SDK (seamless in context)
          await loginToFrame({
            message: result.message,
            signature: result.signature,
          });
          console.log('Auto-login complete in Mini App context');
        }

        if (inMiniApp) {
          router.push('/farcaster-dashboard');  // Redirect if in Mini App
        }
      } catch (error) {
        console.error('Mini App detection/login error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkMiniAppAndLogin();
  }, [ready, authenticated, router]);

  if (isLoading || isMiniApp) {
    return <div>Loading Farcaster dashboard...</div>;  // Loading state during detection/redirect
  }

  return (
    <div className="space-y-8 px-4 py-8" style={{ background: 'linear-gradient(135deg, #f7f7f8 0%, #e0c3fc 100%)', minHeight: '100vh' }}>
      <h1 className="text-center" style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif', color: '#222', fontSize: '1rem', fontWeight: 500, marginBottom: '2.5rem' }}>Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div
            key={stat.label}
            style={{
              width: 160,
              height: 200,
              background: '#f8f9fa',
              borderRadius: 20,
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              border: '1px solid #f3f3f3',
            }}
          >
            <div style={{
              width: '100%',
              height: 130,
              borderRadius: 15,
              background: idx % 2 === 0
                ? 'linear-gradient(to bottom left, #e0c3fc, #f5f2f9)'
                : 'linear-gradient(to bottom, #c3cfe2, #e7c3e4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              padding: 16,
              position: 'relative',
            }}>
              <stat.icon className="w-6 h-6 mb-2 text-[#635BFF]" style={{ position: 'absolute', top: 16, left: 16 }} />
              {stat.label === 'Wallet Balance' ? (
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 4}}>
                  <span style={{ fontSize: 20, fontWeight: 600, color: '#000', margin: 0, zIndex: 1, lineHeight: 1, fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>{stat.value.split(' ')[0]}</span>
                  <span style={{ fontSize: 15, fontWeight: 500, color: '#000', margin: 0, zIndex: 1, lineHeight: 1, letterSpacing: 1, fontFamily: 'Jura, Arial, Helvetica, sans-serif', marginLeft: 4 }}>{stat.value.split(' ')[1] || 'ETH'}</span>
                </div>
              ) : (
                <h1 style={{ fontSize: 20, fontWeight: 600, color: '#000', margin: 0, zIndex: 1, fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>{stat.value}</h1>
              )}
            </div>
            <p style={{ fontSize: 14, color: '#333', textAlign: 'left', marginTop: 12, marginBottom: 0, fontWeight: 400, fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}>{stat.label}</p>
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
            <button
              disabled={!isVerified}
              className="w-full rounded-full bg-[#F7F7F8] border border-[#EDEDED] hover:bg-[#EDEDED] text-[#111] py-3 px-4 font-bold transition"
              style={{ fontFamily: 'Jura, Arial, Helvetica, sans-serif' }}
              onClick={() => setShowDepositModal(true)}
            >
              Deposit Funds
            </button>
            <VerifyButton/>
          </div>
        </div>
      </div>
      <DepositModal
        isOpen={showDepositModal}
        onClose={() => setShowDepositModal(false)}
        isPsychologist={isPsychologist}
        userId={userId}
        userWallet={userWallet}
        psmWallet={psmWallet}
        treasuryWallet={treasuryWallet}
      />
    </div>
  );
}