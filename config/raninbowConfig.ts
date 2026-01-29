import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { anvil, zksync, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "ts-sender",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  chains: [sepolia],
  ssr: false,
});
