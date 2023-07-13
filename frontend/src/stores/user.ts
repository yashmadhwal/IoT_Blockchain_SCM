import { defineStore } from "pinia";
import { ethers, providers } from "ethers";

import { useInfo } from "./info";
import { DEFAULT_CHAINID } from "./info";


// import { useToken } from './contract/token'
export const useUser = defineStore("user", {
  state: () => {
    return {
      wallet: "",
      shortWallet: "",
      loading: false,
      login: false,
      chainId: DEFAULT_CHAINID,
      userRole: '',
      _signer: () => null as null | providers.JsonRpcSigner,
    };
  },
  getters: {
    signer: (state) => state._signer(),
  },
  actions: {
    async connect(
      wallet: string,
      signer: providers.JsonRpcSigner,
      chainId: string
    ) {
      console.log("Connect: ", wallet, chainId);
      // this.wallet = wallet;
      this.wallet = ethers.utils.getAddress(wallet);
      this.shortWallet = wallet.slice(0, 6) + "..." + wallet.slice(-4);
      this.connected = true;
      this._signer = () => signer;
      this.login = true;
      this.chainId = chainId.toString();
    },

    async connectMetamask() {
      console.log("Connecting to metamask...");
      console.log("loading", this.loading);
      console.log("chain ID", this.chainId);
      this.loading = true;

      console.log("this.loading", this.loading);
      const info = useInfo();

      // If InfoLoaded is false, then environmental setup required
      const infoLoad = info.infoLoaded;
      if (infoLoad === false) {
        await info.environmentsetup();
      }

      try {
        if (!(window as any).ethereum)
          throw new Error("Please set up MetaMask properly");

        const wallet = (
          await (window as any).ethereum.request?.({
            method: "eth_requestAccounts",
          })
        )[0] as string;

        const provider = new providers.Web3Provider(
          ((window as any).ethereum as any) || (window as any).web3
        );
        const signer = provider.getSigner();
        const chainId = (await provider?.getNetwork())?.chainId;
  
        if ((await signer.getChainId()).toString() != this.chainId) {
          this.loading = false;
          this.openConnectWindow();
          return;
        }
        
          await this.connect(wallet, signer, chainId.toString());  
          ((window as any).ethereum as any).once(
            "chainChanged",
            async (chainId: string) => {
              await this.connectMetamask();
            }
          );
      
        
        
      } catch (err: any) {
        console.log("error");
        console.log(err);
      }
      
      this.loading = false;
      console.log("loading", this.loading);
    }
  },
});
