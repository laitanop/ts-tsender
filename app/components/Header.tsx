import { WalletConnectButton } from "./ConnectButton";
import Logo from "./Logo";

const Header = () => {
  return (
    <header
      className="w-full border-b"
      style={{ borderColor: "#ffdccc", backgroundColor: "#fff9ec" }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Logo size={48} />
          <div className="flex flex-col">
            <span className="font-bold text-xl" style={{ color: "#5d2a42" }}>
              TSender
            </span>
            <p className="text-xs leading-tight" style={{ color: "#fb6376" }}>
              The most gas efficient airdrop contract on earth, built in huff
            </p>
          </div>
        </div>

        {/* Connect Button */}
        <WalletConnectButton />
      </div>
    </header>
  );
};

export default Header;
