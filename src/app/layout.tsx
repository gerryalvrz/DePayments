"use client";

import "./globals.css";

import { PrivyProvider } from "@privy-io/react-auth";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";
import { useState } from "react";
import { LocalSmartWalletProvider } from "./providers/AccountAbstraction"
import { SelfProvider } from "./providers/SelfProvider";

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
        <link
          href="https://fonts.googleapis.com/css2?family=Jura:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
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
          <SmartWalletsProvider
          >
            <LocalSmartWalletProvider zeroDevProjectId="e46f4ac3-404e-42fc-a3d3-1c75846538a8" >
              <SelfProvider
                appName="MyCeloApp"
                scope="my-celo-app-scope" // Unique, max 31 chars
                endpoint="https://your-app.com/api/verify" // Your backend endpoint
                minimumAge={21}
                excludedCountries={['IRN', 'PRK']}
              >
                <Layout>{children}</Layout>
              </SelfProvider>
            </LocalSmartWalletProvider>
          </SmartWalletsProvider>
        </PrivyProvider>
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

function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen" style={{ background: "var(--background)" }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex-1 flex flex-col">
        <Topbar onSidebarToggle={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
