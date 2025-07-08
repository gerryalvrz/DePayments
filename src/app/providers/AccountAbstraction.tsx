import React, { createContext, useContext, useEffect, useState } from "react";
import { useWallets, usePrivy } from "@privy-io/react-auth";
import { createPublicClient, Hex, http } from "viem";
import { getEntryPoint } from "@zerodev/sdk/constants";

import { KERNEL_V3_1 } from "@zerodev/sdk/constants";

import {
  createZeroDevPaymasterClient,
  createKernelAccount,
  createKernelAccountClient,
} from "@zerodev/sdk";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import {createWalletClient, custom} from 'viem';
import { privateKeyToAccount } from "viem/accounts";
import { celoAlfajores } from "viem/chains"; // Replace with your chain

const BUNDLER_URL =
  "https://rpc.zerodev.app/api/v3/e46f4ac3-404e-42fc-a3d3-1c75846538a8/chain/44787";
const PAYMASTER_URL =
  "https://rpc.zerodev.app/api/v3/e46f4ac3-404e-42fc-a3d3-1c75846538a8/chain/44787";

type SmartWalletContextType = {
  kernelClient: any; // Replace with proper type from ZeroDev SDK
  smartAccountAddress: `0x${string}` | null;
  isInitializing: boolean;
  error: Error | null;
};

const SmartWalletContext = createContext<SmartWalletContextType>({
  kernelClient: null,
  smartAccountAddress: null,
  isInitializing: false,
  error: null,
});

export const LocalSmartWalletProvider = ({
  children,
  zeroDevProjectId = "e46f4ac3-404e-42fc-a3d3-1c75846538a8",
}: {
  children: React.ReactNode;
  zeroDevProjectId: string;
}) => {
  const { wallets } = useWallets();
  const { authenticated,exportWallet } = usePrivy();
  const [kernelClient, setKernelClient] = useState<any>(null);
  const [smartAccountAddress, setSmartAccountAddress] = useState<
    `0x${string}` | null
  >(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<Error | null>(null);



  useEffect(() => {
    const initializeSmartWallet = async () => {
      if (!authenticated && !wallets[0]) {
        setKernelClient(null);
        setSmartAccountAddress(null);
        return;
      }

      try {
        setIsInitializing(true);
        setError(null);
       console.log("signer", wallets);
        // Initialize public client
        const publicClient = createPublicClient({
          transport: http(celoAlfajores.rpcUrls.default.http[0]),
        });
        let provider = await wallets[0].getEthereumProvider()
        console.log("eth",provider)
        // Create ZeroDev ECDSA validator
        const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
          signer:provider,
          entryPoint: getEntryPoint("0.7"),
          kernelVersion: KERNEL_V3_1,
        });

        // Create Kernel account
        const account = await createKernelAccount(publicClient, {
          plugins: {
            sudo: ecdsaValidator,
          },
          entryPoint: getEntryPoint("0.7"),
          kernelVersion: KERNEL_V3_1,
        });

        // Create Kernel client
        const client = createKernelAccountClient({
          account,
          chain: celoAlfajores,
          bundlerTransport: http(BUNDLER_URL),
          paymaster: {
            getPaymasterData: async (userOperation) => {
              const zerodevPaymaster = createZeroDevPaymasterClient({
                chain: celoAlfajores,
                transport: http(PAYMASTER_URL),
              });
              return zerodevPaymaster.sponsorUserOperation({
                userOperation,
              });
            },
          },
        });
        console.log("smart accounts client", client);
        console.log("smart accounts client", client.getChainId());

        setKernelClient(client);
        setSmartAccountAddress(account.address);
      } catch (err) {
        console.error("Error initializing smart wallet:", err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsInitializing(false);
      }
    };
    initializeSmartWallet();
  }, [authenticated, wallets, zeroDevProjectId]);

  return (
    <SmartWalletContext.Provider
      value={{ kernelClient, smartAccountAddress, isInitializing, error }}
    >
      {children}
    </SmartWalletContext.Provider>
  );
};

export const useSmartWallet = () => {
  const context = useContext(SmartWalletContext);
  if (context === undefined) {
    throw new Error("useSmartWallet must be used within a LocalSmartWalletProvider");
  }
  return context;
};
