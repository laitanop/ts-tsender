"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import AirdropForm from "./AirdropForm";
import { WalletConnectButton } from "./ConnectButton";

const LandingPage = () => {
  const [showForm, setShowForm] = useState(false);

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      const formElement = document.getElementById("airdrop-form");
      formElement?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fff9ec" }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left Side - Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                <Logo size={80} />
                <h1
                  className="text-5xl md:text-6xl font-bold"
                  style={{ color: "#5d2a42" }}
                >
                  Web3 TSender
                </h1>
              </div>
              <p
                className="text-2xl md:text-3xl font-semibold mb-4"
                style={{ color: "#fb6376" }}
              >
                The Most Gas-Efficient Airdrop Contract
              </p>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto md:mx-0">
                Airdrop ERC20 tokens to multiple recipients in a single
                transaction. Save time and gas fees with our optimized smart
                contract built in Huff.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={scrollToForm}
                  className="px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-lg"
                  style={{ backgroundColor: "#fb6376" }}
                >
                  Start Airdropping →
                </button>
                <a
                  href="#features"
                  className="px-8 py-4 rounded-lg font-semibold border-2 transition-all duration-200 hover:scale-105"
                  style={{
                    borderColor: "#5d2a42",
                    color: "#5d2a42",
                    backgroundColor: "transparent",
                  }}
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Side - Visual */}
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div
                  className="w-80 h-80 rounded-full opacity-20 blur-3xl"
                  style={{ backgroundColor: "#fb6376" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-64 h-64 rounded-2xl p-8 shadow-2xl"
                    style={{
                      backgroundColor: "#fff9ec",
                      border: "2px solid #ffdccc",
                    }}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: "#fb6376" }}
                        >
                          <span className="text-white font-bold text-xl">
                            T
                          </span>
                        </div>
                        <div>
                          <div
                            className="h-3 rounded mb-2"
                            style={{
                              backgroundColor: "#5d2a42",
                              width: "120px",
                            }}
                          />
                          <div
                            className="h-2 rounded"
                            style={{
                              backgroundColor: "#ffdccc",
                              width: "80px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div
                          className="h-2 rounded"
                          style={{ backgroundColor: "#ffdccc", width: "100%" }}
                        />
                        <div
                          className="h-2 rounded"
                          style={{ backgroundColor: "#ffdccc", width: "90%" }}
                        />
                        <div
                          className="h-2 rounded"
                          style={{ backgroundColor: "#ffdccc", width: "95%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="py-12 px-4 border-y"
        style={{ borderColor: "#ffdccc" }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: "#fb6376" }}
              >
                99%
              </div>
              <div className="text-gray-700">Gas Savings</div>
            </div>
            <div>
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: "#fb6376" }}
              >
                1 Tx
              </div>
              <div className="text-gray-700">Multiple Recipients</div>
            </div>
            <div>
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: "#fb6376" }}
              >
                ∞
              </div>
              <div className="text-gray-700">Unlimited Recipients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2
            className="text-4xl font-bold text-center mb-4"
            style={{ color: "#5d2a42" }}
          >
            Why Choose TSender?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Built for efficiency, designed for simplicity. Airdrop tokens to
            hundreds of recipients in a single transaction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className="p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg hover:scale-105"
              style={{
                backgroundColor: "#fff9ec",
                borderColor: "#ffdccc",
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "#fb6376" }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#5d2a42" }}
              >
                Gas Efficient
              </h3>
              <p className="text-gray-700">
                Save up to 99% on gas fees compared to individual transfers.
                Optimized smart contract built in Huff.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg hover:scale-105"
              style={{
                backgroundColor: "#fff9ec",
                borderColor: "#ffdccc",
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "#fb6376" }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#5d2a42" }}
              >
                Secure & Trusted
              </h3>
              <p className="text-gray-700">
                Audited smart contract with transparent code. Your tokens are
                safe and secure.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg hover:scale-105"
              style={{
                backgroundColor: "#fff9ec",
                borderColor: "#ffdccc",
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: "#fb6376" }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "#5d2a42" }}
              >
                Easy to Use
              </h3>
              <p className="text-gray-700">
                Simple interface. Just connect your wallet, enter addresses and
                amounts, and execute. No coding required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4" style={{ backgroundColor: "#fff" }}>
        <div className="container mx-auto max-w-6xl">
          <h2
            className="text-4xl font-bold text-center mb-4"
            style={{ color: "#5d2a42" }}
          >
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Get started in minutes. Follow these simple steps to airdrop your
            tokens.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              {
                step: "1",
                title: "Connect Wallet",
                description: "Connect your Web3 wallet (MetaMask, etc.)",
              },
              {
                step: "2",
                title: "Enter Token",
                description: "Paste the ERC20 token contract address",
              },
              {
                step: "3",
                title: "Add Recipients",
                description: "Enter recipient addresses (comma separated)",
              },
              {
                step: "4",
                title: "Set Amounts",
                description: "Specify the amount for each recipient",
              },
              {
                step: "5",
                title: "Execute",
                description: "Approve & execute the airdrop transaction",
              },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl shadow-lg"
                  style={{ backgroundColor: "#fb6376" }}
                >
                  {item.step}
                </div>
                <h3
                  className="text-lg font-semibold mb-2 text-center"
                  style={{ color: "#5d2a42" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div
            className="rounded-2xl p-12 text-center border-2"
            style={{
              backgroundColor: "#fff9ec",
              borderColor: "#ffdccc",
            }}
          >
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "#5d2a42" }}
            >
              Ready to Start Airdropping?
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust TSender for their token
              distributions. Fast, secure, and gas-efficient.
            </p>
            <button
              onClick={scrollToForm}
              className="px-10 py-5 rounded-lg font-semibold text-white text-lg transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-lg"
              style={{ backgroundColor: "#fb6376" }}
            >
              Create Your Airdrop Now →
            </button>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="airdrop-form" className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <AirdropForm />
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-4 border-t mt-20"
        style={{ borderColor: "#ffdccc" }}
      >
        <div className="container mx-auto max-w-6xl text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Logo size={32} />
            <span className="font-bold text-lg" style={{ color: "#5d2a42" }}>
              TSender
            </span>
          </div>
          <p className="text-sm text-gray-600">
            The most gas-efficient airdrop contract on earth, built in Huff
          </p>
          <p className="text-xs text-gray-500 mt-4">
            Always verify contract addresses before use. Test on Sepolia first.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
