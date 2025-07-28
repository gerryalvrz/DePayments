"use client";

import "./globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";
import { useState } from "react";
import { LocalSmartWalletProvider } from "./providers/AccountAbstraction";
import { SelfProvider } from "./providers/SelfProvider";
import { MiniAppProvider } from '@neynar/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID!;
  const clientId = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID;

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="fc:frame" content="vNext" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jura:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-gray-50">
        <MiniAppProvider analyticsEnabled={true}>
          <PrivyProvider
            appId={appId}
            clientId={clientId}
            config={{
              embeddedWallets: {
                ethereum: {
                  createOnLogin: "users-without-wallets",
                },
              },
            }}
          >
            <SmartWalletsProvider>
              <LocalSmartWalletProvider zeroDevProjectId="e46f4ac3-404e-42fc-a3d3-1c75846538a8">
                <SelfProvider
                  appName="MyCeloApp"
                  scope="my-celo-app-scope"
                  endpoint="https://your-app.com/api/verify"
                  minimumAge={21}
                  excludedCountries={['IRN', 'PRK']}
                >
                  <FrameSafeLayout>{children}</FrameSafeLayout>
                </SelfProvider>
              </LocalSmartWalletProvider>
            </SmartWalletsProvider>
          </PrivyProvider>
        </MiniAppProvider>
      </body>
    </html>
  );
}

import { ReactNode } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

interface LayoutProps {
  children: ReactNode;
}

function FrameSafeLayout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isFrame = typeof window !== 'undefined' && window.self !== window.top;

  return (
    <div className={`flex ${isFrame ? 'h-auto' : 'h-screen'} bg-gray-50`}>
      {/* Conditional sidebar rendering - hidden in frames */}
      {!isFrame && (
        <>
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/40 md:hidden transition-opacity duration-300"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </>
      )}

      <div className="flex-1 flex flex-col max-w-full overflow-hidden">
        {/* Conditional topbar - hidden in frames */}
        {!isFrame && <Topbar onSidebarToggle={() => setSidebarOpen(true)} />}
        
        <main className={`flex-1 p-4 ${isFrame ? 'overflow-visible' : 'overflow-auto'}`}>
          {/* Frame-optimized container */}
          <div className={`
            ${isFrame ? 
              'w-full max-w-[400px] mx-auto bg-white rounded-xl shadow-sm p-4' : 
              'w-full'}
          `}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}