This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# TSenderReference

A simple reference contract for **airdropping ERC20 tokens** to multiple recipients in a single transaction.  
Designed to be called from a frontend (UI) after the user approves token spending.

---

## Contract Overview

**Contract:** `TSenderReference`  
**Solidity Version:** `0.8.24`  
**License:** MIT

This contract allows a sender to distribute ERC20 tokens to many recipients at once.  
It also provides a helper function to validate recipient and amount lists before submitting a transaction.

> ⚠️ This is a **reference implementation** and is **not optimized for gas**.

---

## Core Functions

### `airdropERC20`

Airdrops ERC20 tokens to a list of recipients.

```solidity
function airdropERC20(
    address tokenAddress,
    address[] calldata recipients,
    uint256[] calldata amounts,
    uint256 totalAmount
) external

```

---

## Testing on Sepolia Testnet

This guide will help you test the TSender application on the Sepolia testnet.

### Prerequisites

1. **MetaMask or compatible Web3 wallet** installed in your browser
2. **Sepolia ETH** for gas fees
3. **Test tokens** on Sepolia (see below for faucets)

### Step 1: Connect to Sepolia Network

1. Open MetaMask and switch to **Sepolia Test Network**
   - If Sepolia is not visible, go to Settings → Networks → Add Network
   - Network Name: `Sepolia`
   - RPC URL: `https://rpc.sepolia.org`
   - Chain ID: `11155111`
   - Currency Symbol: `ETH`
   - Block Explorer: `https://sepolia.etherscan.io`

### Step 2: Get Sepolia ETH (Gas Fees)

You need Sepolia ETH to pay for transaction gas fees:

1. **Sepolia Faucet** (Recommended):
   - Visit: https://sepoliafaucet.com/
   - Connect your wallet
   - Request testnet ETH (usually 0.5 ETH per request)

2. **Alchemy Sepolia Faucet**:
   - Visit: https://sepoliafaucet.com/ (or https://www.alchemy.com/faucets/ethereum-sepolia)
   - Sign in with Alchemy account (free)
   - Request testnet ETH

3. **Infura Sepolia Faucet**:
   - Visit: https://www.infura.io/faucet/sepolia
   - Connect your wallet
   - Request testnet ETH

### Step 3: Get Test Tokens

#### Option A: PYUSD (PayPal USD) on Sepolia

**Token Address:** `0x6f14C02fC1F78322cD7d707aB8956Aceb4bE59D6`

**How to get PYUSD:**

1. Visit the PYUSD contract on Sepolia: https://sepolia.etherscan.io/address/0x6f14C02fC1F78322cD7d707aB8956Aceb4bE59D6
2. Connect your wallet to Etherscan
3. Use the `mint` function (if available) or request from a faucet
4. Alternatively, use a DEX like Uniswap on Sepolia to swap ETH for PYUSD

**How to import PYUSD into MetaMask:**

1. Open MetaMask
2. Click "Import tokens"
3. Paste the token address: `0x6f14C02fC1F78322cD7d707aB8956Aceb4bE59D6`
4. Token Symbol: `PYUSD`
5. Decimals: `6`
6. Click "Add Custom Token"

#### Option B: Other Test Tokens on Sepolia

**USDC (Testnet):**

- Address: `0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238`
- Decimals: `6`
- Get from: https://app.compound.finance/ (Sepolia testnet)

**DAI (Testnet):**

- Address: `0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6`
- Decimals: `18`
- Get from: https://app.compound.finance/ (Sepolia testnet)

**WETH (Wrapped ETH):**

- Address: `0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14`
- Decimals: `18`
- Wrap ETH using Uniswap or directly via contract

### Step 4: Import Token into MetaMask

1. Open MetaMask
2. Click on "Assets" tab
3. Scroll down and click "Import tokens"
4. Paste the token contract address
5. MetaMask should auto-fill the token symbol and decimals
6. Click "Add Custom Token"
7. Confirm the import

### Step 5: Test the Airdrop Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open the application:**
   - Navigate to http://localhost:3000
   - Connect your MetaMask wallet (make sure you're on Sepolia network)

3. **Fill in the form:**
   - **Token Address**: Enter one of the test token addresses above (e.g., `0x6f14C02fC1F78322cD7d707aB8956Aceb4bE59D6` for PYUSD)
   - **Recipient Addresses**: Enter multiple addresses separated by commas or new lines
     - Example: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb, 0x8ba1f109551bD432803012645Hac136c22C9e00`
   - **Amounts**: Enter corresponding amounts separated by commas or new lines
     - Example: `100, 200, 300` (for PYUSD with 6 decimals, this means 0.0001, 0.0002, 0.0003 PYUSD)

4. **Approve tokens:**
   - Click "Create Airdrop"
   - If you haven't approved tokens yet, you'll be prompted to approve
   - Confirm the approval transaction in MetaMask
   - Wait for confirmation

5. **Execute airdrop:**
   - After approval, the airdrop transaction will be submitted automatically
   - Confirm the transaction in MetaMask
   - Wait for confirmation

6. **Verify results:**
   - Check the transaction hash displayed in the success message
   - Click "View on Block Explorer" to see the transaction on Etherscan
   - Verify that tokens were transferred to all recipients

### Step 6: Verify Token Balances

1. Check recipient addresses on Etherscan:
   - Visit: https://sepolia.etherscan.io/
   - Enter recipient address
   - Click on "Token" tab to see token balances

2. Or check in MetaMask:
   - Switch to recipient account (if you have access)
   - View token balance

### Troubleshooting

**Issue: "TSender not available on this network"**

- Make sure you're connected to Sepolia testnet (Chain ID: 11155111)
- Check that the contract is deployed on Sepolia

**Issue: "Insufficient balance"**

- Ensure you have enough tokens in your wallet
- Check that you have enough Sepolia ETH for gas fees

**Issue: "Transaction failed"**

- Check that you have approved enough tokens
- Verify recipient addresses are valid
- Ensure amounts match recipients count

**Issue: Token not showing in MetaMask**

- Manually import the token using the contract address
- Check that you're on the correct network

### Useful Links

- **Sepolia Etherscan**: https://sepolia.etherscan.io
- **Sepolia Faucet**: https://sepoliafaucet.com/
- **Uniswap Sepolia**: https://app.uniswap.org/ (switch to Sepolia network)
- **Compound Sepolia**: https://app.compound.finance/ (for test tokens)

### Example Test Data

**Token Address (PYUSD):**

```
0x6f14C02fC1F78322cD7d707aB8956Aceb4bE59D6
```

**Recipient Addresses:**

```
0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
0x8ba1f109551bD432803012645Hac136c22C9e00
0x1234567890123456789012345678901234567890
```

**Amounts:**

```
100
200
300
```

> **Note:** Amounts are in the token's smallest unit. For PYUSD (6 decimals), `100` = `0.0001 PYUSD`. For tokens with 18 decimals, `100` = `0.0000000000000001 tokens`.
