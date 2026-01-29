"use client";

import React, { useState } from "react";
import Input from "./common/input";
import { useChainId, useConfig, useAccount, useWriteContract } from "wagmi";
import { chainsToTSender, tsenderAbi, erc20Abi } from "../constants";
import { readContract, waitForTransactionReceipt } from "@wagmi/core";

const AirdropForm = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipientAddresses, setRecipientAddresses] = useState("");
  const [amounts, setAmounts] = useState("");
  const [notes, setNotes] = useState("");
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!account.address) {
      alert("Please connect your wallet");
      return;
    }

    if (!tokenAddress) {
      alert("Please enter a token address");
      return;
    }

    const tsenderAddress = chainsToTSender[chainId]?.tsender;
    if (!tsenderAddress) {
      alert("TSender not available on this network");
      return;
    }

    try {
      // Fetch token decimals
      const decimals = await getTokenDecimals();
      console.log("Token decimals:", decimals);

      // Parse amounts with proper decimal handling
      const amountsBigInt = parseAmounts(amounts, decimals);
      const totalBigInt = calculateTotalBigInt(amountsBigInt);
      console.log("Amounts (with decimals):", amountsBigInt);
      console.log("Total (with decimals):", totalBigInt);

      // Parse recipient addresses
      const recipients = recipientAddresses
        .split(/[,\n]+/)
        .map((addr) => addr.trim())
        .filter((addr) => addr !== "");

      if (recipients.length !== amountsBigInt.length) {
        alert(
          `Mismatch: ${recipients.length} recipients but ${amountsBigInt.length} amounts`
        );
        return;
      }

      // Check current allowance
      const approvedAmount = await getApprovedAmount(tsenderAddress);
      console.log("Approved amount:", approvedAmount, "Total needed:", totalBigInt);

      // Approve if needed
      if (approvedAmount < totalBigInt) {
        console.log("Approving tokens...");
        const approvalHash = await writeContractAsync({
          abi: erc20Abi,
          address: tokenAddress as `0x${string}`,
          functionName: "approve",
          args: [tsenderAddress as `0x${string}`, totalBigInt],
        });

        // Wait for approval to be confirmed
        const approvalReceipt = await waitForTransactionReceipt(config, {
          hash: approvalHash,
        });
        console.log("Approval confirmed:", approvalReceipt);
      }

      // Execute airdrop
      console.log("Executing airdrop...");
      await writeContractAsync({
        abi: tsenderAbi,
        address: tsenderAddress as `0x${string}`,
        functionName: "airdropERC20",
        args: [tokenAddress, recipients, amountsBigInt, totalBigInt],
      });

      console.log("Airdrop successful!");
    } catch (err) {
      console.error("Airdrop failed:", err);
      alert(`Transaction failed: ${err instanceof Error ? err.message : "Unknown error"}`);
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

        <Input
          label="Notes (Optional)"
          placeholder="Add any additional notes..."
          value={notes}
          large={true}
          onChange={setNotes}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: "#fb6376",
          }}
        >
          {isPending ? "Processing..." : "Create Airdrop"}
        </button>
      </div>
    </form>
  );
};

export default AirdropForm;
