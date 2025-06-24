
"use client"

import "./globals.css";

import {PrivyProvider} from '@privy-io/react-auth';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
  const clientId = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID;
  console.log("app id", process.env.NEXT_PUBLIC_PRIVY_APP_ID);
  console.log("ENV VAR:", process.env.NEXT_PUBLIC_TEST_VAR);
  return (
    <html lang="en">
      <body>
        <PrivyProvider
          appId={appId}
          clientId={clientId}
          config={{
            embeddedWallets: {
              ethereum: {
                createOnLogin: 'users-without-wallets',
              },
            },
          }}
        >
          <Layout>{children}</Layout>
        </PrivyProvider>
      </body>
    </html>
  );
}





import  { ReactNode } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

interface LayoutProps {
  children: ReactNode;
}

 function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
 
