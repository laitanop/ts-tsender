import { WalletConnectButton } from "./ConnectButton";

const Header = () => {
  return (
    <header className="w-full border-b" style={{ borderColor: "#ffdccc", backgroundColor: "#fff9ec" }}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
            style={{ backgroundColor: "#5d2a42", color: "#fff9ec" }}
          >
            T
          </div>
          <div className="flex flex-col">
            <span 
              className="font-bold text-xl"
              style={{ color: "#5d2a42" }}
            >
              TSender
            </span>
            <p 
              className="text-xs leading-tight"
              style={{ color: "#fb6376" }}
            >
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
