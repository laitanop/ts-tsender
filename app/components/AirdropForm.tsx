"use client";

import React, { useState } from "react";
import Input from "./common/input";

const AirdropForm = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [recipientAddresses, setRecipientAddresses] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      tokenAddress,
      recipientAddresses,
      amount,
      notes,
    });
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
          value={amount}
          type="number"
          large={true}
          onChange={setAmount}
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
          className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            backgroundColor: "#fb6376",
          }}
        >
          Create Airdrop
        </button>
      </div>
    </form>
  );
};

export default AirdropForm;
