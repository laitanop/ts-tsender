"use client";

import React, { useState, useEffect } from "react";
import Input from "./common/input";
import { useChainId, useConfig, useAccount, useWriteContract } from "wagmi";
import { chainsToTSender, tsenderAbi, erc20Abi } from "../constants";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";

type MessageType = "error" | "success" | "info" | "warning";

const AirdropForm = () => {
  const [message, setMessage] = useState<{
    text: string;
    type: MessageType;
    txHash?: string;
  } | null>(null);
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipientAddresses, setRecipientAddresses] = useState("");
  const [amounts, setAmounts] = useState("");
  const [notes, setNotes] = useState("");
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const { writeContractAsync, isPending, data } = useWriteContract();

  // Clear "connect wallet" message when wallet connects
  useEffect(() => {
    if (
      account.address &&
      message?.text?.includes("Please connect your wallet")
    ) {
      setMessage(null);
    }
  }, [account.address, message]);

  // Clear "enter token address" message when token address is entered
  useEffect(() => {
    if (
      tokenAddress.trim() &&
      message?.text?.includes("token address") &&
      message?.type === "error"
    ) {
      setMessage(null);
    }
  }, [tokenAddress, message]);

  // Clear recipient/amount error messages when fields are filled
  useEffect(() => {
    if (
      recipientAddresses.trim() &&
      amounts.trim() &&
      message?.text?.includes("recipient") &&
      message?.type === "error"
    ) {
      // Only clear if it's a "missing field" error, not a validation error
      if (
        message.text.includes("Please enter") ||
        message.text.includes("at least one")
      ) {
        setMessage(null);
      }
    }
  }, [recipientAddresses, amounts, message]);

  // Clear "network not available" message when switching to supported network
  useEffect(() => {
    const tsenderAddress = chainsToTSender[chainId]?.tsender;
    if (
      tsenderAddress &&
      message?.text === "TSender not available on this network"
    ) {
      setMessage(null);
    }
  }, [chainId, message]);

  // Auto-clear success messages after 5 seconds
  useEffect(() => {
    if (message?.type === "success") {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  async function getTokenDecimals(): Promise<number> {
    const result = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "decimals",
    });
    return result as number;
  }

  async function getApprovedAmount(tSenderAddress: string): Promise<bigint> {
    const result = await readContract(config, {
      abi: erc20Abi,
      address: tokenAddress as `0x${string}`,
      functionName: "allowance",
      args: [account.address, tSenderAddress as `0x${string}`],
    });
    return result as bigint;
  }

  function parseAmounts(amountsString: string, decimals: number): bigint[] {
    return amountsString
      .split(/[,\n]+/)
      .map((amt) => amt.trim())
      .filter((amt) => amt !== "")
      .map((amt) => {
        const parsed = parseFloat(amt);
        // Handle decimals by multiplying first, then converting to BigInt
        const scaled = Math.round(parsed * 10 ** decimals);
        return BigInt(scaled);
      });
  }

  function calculateTotalBigInt(amountsBigInt: bigint[]): bigint {
    return amountsBigInt.reduce((sum, amt) => sum + amt, BigInt(0));
  }

  function isValidEthereumAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }

  function getBlockExplorerUrl(chainId: number, txHash: string): string {
    const explorerUrls: { [key: number]: string } = {
      1: `https://etherscan.io/tx/${txHash}`, // Ethereum Mainnet
      11155111: `https://sepolia.etherscan.io/tx/${txHash}`, // Sepolia
      42161: `https://arbiscan.io/tx/${txHash}`, // Arbitrum
      10: `https://optimistic.etherscan.io/tx/${txHash}`, // Optimism
      8453: `https://basescan.org/tx/${txHash}`, // Base
      324: `https://explorer.zksync.io/tx/${txHash}`, // zkSync Era
      31337: `#`, // Local/Anvil - no explorer
    };
    return explorerUrls[chainId] || `#`;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null); // Clear previous messages

    // Validate wallet connection
    if (!account.address) {
      setMessage({
        text: "⚠️ Please connect your wallet to continue",
        type: "error",
      });
      return;
    }

    // Validate token address
    if (!tokenAddress.trim()) {
      setMessage({
        text: "⚠️ Please enter a token address",
        type: "error",
      });
      return;
    }

    if (!isValidEthereumAddress(tokenAddress.trim())) {
      setMessage({
        text: "⚠️ Invalid token address format. Please enter a valid Ethereum address (0x...)",
        type: "error",
      });
      return;
    }

    // Validate network support
    const tsenderAddress = chainsToTSender[chainId]?.tsender;
    if (!tsenderAddress) {
      setMessage({
        text: "⚠️ TSender is not available on this network. Please switch to a supported network",
        type: "error",
      });
      return;
    }

    // Validate recipient addresses
    if (!recipientAddresses.trim()) {
      setMessage({
        text: "⚠️ Please enter at least one recipient address",
        type: "error",
      });
      return;
    }

    // Validate amounts
    if (!amounts.trim()) {
      setMessage({
        text: "⚠️ Please enter at least one amount",
        type: "error",
      });
      return;
    }

    try {
      // Fetch token decimals
      setMessage({
        text: "🔍 Fetching token information...",
        type: "info",
      });
      const decimals = await getTokenDecimals();

      // Parse amounts with proper decimal handling
      const amountsBigInt = parseAmounts(amounts, decimals);

      // Validate parsed amounts
      if (amountsBigInt.length === 0) {
        setMessage({
          text: "⚠️ Invalid amounts. Please enter valid numbers separated by commas or new lines",
          type: "error",
        });
        return;
      }

      // Check for invalid amounts (zero or negative)
      const invalidAmounts = amountsBigInt.filter((amt) => amt <= 0);
      if (invalidAmounts.length > 0) {
        setMessage({
          text: "⚠️ All amounts must be greater than zero",
          type: "error",
        });
        return;
      }

      const totalBigInt = calculateTotalBigInt(amountsBigInt);

      // Parse recipient addresses
      const recipients = recipientAddresses
        .split(/[,\n]+/)
        .map((addr) => addr.trim())
        .filter((addr) => addr !== "");

      // Validate recipient addresses format
      const invalidRecipients = recipients.filter(
        (addr) => !isValidEthereumAddress(addr)
      );
      if (invalidRecipients.length > 0) {
        setMessage({
          text: `⚠️ Invalid recipient address format: ${invalidRecipients[0]}. Please enter valid Ethereum addresses (0x...)`,
          type: "error",
        });
        return;
      }

      // Validate recipient and amount count match
      if (recipients.length === 0) {
        setMessage({
          text: "⚠️ Please enter at least one recipient address",
          type: "error",
        });
        return;
      }

      if (recipients.length !== amountsBigInt.length) {
        setMessage({
          text: `⚠️ Mismatch: You have ${recipients.length} recipient${recipients.length > 1 ? "s" : ""} but ${amountsBigInt.length} amount${amountsBigInt.length > 1 ? "s" : ""}. Please ensure each recipient has a corresponding amount`,
          type: "error",
        });
        return;
      }

      // Check current allowance
      setMessage({
        text: "🔍 Checking token approval status...",
        type: "info",
      });
      const approvedAmount = await getApprovedAmount(tsenderAddress);

      //Approve if needed
      if (approvedAmount < totalBigInt) {
        setMessage({
          text: "🔐 Token approval required. Please check your wallet and approve the transaction to allow TSender to spend your tokens",
          type: "warning",
        });
        const approvalHash = await writeContractAsync({
          abi: erc20Abi,
          address: tokenAddress as `0x${string}`,
          functionName: "approve",
          args: [tsenderAddress as `0x${string}`, totalBigInt],
        });

        // Show approval transaction hash while waiting for confirmation
        setMessage({
          text: "⏳ Token approval transaction submitted! Waiting for confirmation on the blockchain...",
          type: "info",
          txHash: approvalHash,
        });
        //Wait for approval to be confirmed
        await waitForTransactionReceipt(config, {
          hash: approvalHash,
        });
        setMessage({
          text: "✅ Token approved successfully! Proceeding to create airdrop...",
          type: "success",
          txHash: approvalHash,
        });
      }

      //Execute airdrop
      setMessage({
        text: "🚀 Creating airdrop. Please check your wallet and confirm the transaction...",
        type: "info",
      });
      const airdropHash = await writeContractAsync({
        abi: tsenderAbi,
        address: tsenderAddress as `0x${string}`,
        functionName: "airdropERC20",
        args: [tokenAddress, recipients, amountsBigInt, totalBigInt],
      });

      // Show transaction hash immediately while waiting for confirmation
      setMessage({
        text: "⏳ Airdrop transaction submitted! Waiting for confirmation on the blockchain...",
        type: "info",
        txHash: airdropHash,
      });

      // Wait for airdrop transaction to be confirmed
      await waitForTransactionReceipt(config, {
        hash: airdropHash,
      });

      setMessage({
        text: `✅ Airdrop created successfully! ${recipients.length} recipient${recipients.length > 1 ? "s" : ""} will receive tokens`,
        type: "success",
        txHash: airdropHash,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      setMessage({
        text: `❌ Transaction failed: ${errorMessage}. Please check your wallet and try again`,
        type: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto p-6 rounded-xl mt-5"
      style={{ backgroundColor: "#fff9ec" }}
    >
      <h2 className="text-2xl font-bold mb-6" style={{ color: "#5d2a42" }}>
        Create Airdrop
      </h2>
      {message && (
        <div
          className={`mb-4 p-4 rounded-lg font-medium ${
            message.type === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : message.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : message.type === "warning"
                  ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
          }`}
        >
          <div>{message.text}</div>
          {message.txHash && (
            <div className="mt-3 pt-3 border-t border-current border-opacity-20">
              <div className="text-sm font-semibold mb-2">
                Transaction Details:
              </div>
              <div className="text-sm space-y-1">
                <div>
                  <span className="font-medium">Hash:</span>{" "}
                  <span className="font-mono break-all">{message.txHash}</span>
                </div>
                {getBlockExplorerUrl(chainId, message.txHash) !== "#" && (
                  <div>
                    <a
                      href={getBlockExplorerUrl(chainId, message.txHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-80 font-medium"
                    >
                      View on Block Explorer →
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="space-y-4">
        <Input
          label="Token Address"
          placeholder="0x..."
          value={tokenAddress}
          type="text"
          onChange={setTokenAddress}
        />

        <Input
          label="Recipient Addresses (separated by commas or new lines)"
          placeholder="0x...0x..."
          value={recipientAddresses}
          large={true}
          onChange={setRecipientAddresses}
        />

        <Input
          label="Amount(separated by commas or new lines)"
          placeholder="100, 200, 300"
          value={amounts}
          type="number"
          large={true}
          onChange={setAmounts}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "#fb6376",
          }}
        >
          {isPending
            ? message?.type === "warning" || message?.text.includes("approval")
              ? "Approving Tokens..."
              : message?.text.includes("Creating airdrop")
                ? "Creating Airdrop..."
                : "Processing..."
            : "Create Airdrop"}
        </button>
      </div>
    </form>
  );
};

export default AirdropForm;
