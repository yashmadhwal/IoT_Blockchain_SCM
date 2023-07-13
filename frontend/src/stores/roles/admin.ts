import { defineStore } from "pinia";
import { ethers, providers } from "ethers";

import { useInfo } from "../info";
import { useUser } from "../user";
import { DEFAULT_CHAINID } from "../info";
import { useContracts } from "../../../utils";

// import { useToken } from './contract/token'
export const useAdmin = defineStore("admin", {
  state: () => {
    return {
      AdminWallet: "",
      setting: false,
      chainId: DEFAULT_CHAINID,
    };
  },
  getters: {},
  actions: {
    async setNewWater(address: string) {
      const { h2p } = useContracts(DEFAULT_CHAINID);
      this.setting = true;
      const user = useUser();
      const info = useInfo();
      // passing to set new values
      try {
        let tx = await h2p.connect(user.signer!).setWaterProvider(address);
        // console.log('before weight lastTx', tx.hash)
        await tx.wait();
        console.log("Transaction Hash", tx.hash);
        // console.log('after weight lastTx', tx.hash)
        // Updating new Addresses
        await info.loadingAddresses();
      } catch (e) {
        console.log(e);
      }
      this.setting = false;
    },
    
    async setNewElectricity(address: string) {
      const { h2p } = useContracts(DEFAULT_CHAINID);
      this.setting = true;
      const user = useUser();
      const info = useInfo();
      // passing to set new values
      try {
        let tx = await h2p.connect(user.signer!).setEnergyProvider(address);
        // console.log('before weight lastTx', tx.hash)
        await tx.wait();
        console.log("Transaction Hash", tx.hash);
        // console.log('after weight lastTx', tx.hash)
        // Updating new Addresses
        await info.loadingAddresses();
      } catch (e) {
        console.log(e);
      }
      this.setting = false;
    },

    async setNewHydrogen(address: string) {
      const { h2p } = useContracts(DEFAULT_CHAINID);
      this.setting = true;
      const user = useUser();
      const info = useInfo();
      // passing to set new values
      try {
        let tx = await h2p.connect(user.signer!).setFuelProvider(address);
        // console.log('before weight lastTx', tx.hash)
        await tx.wait();
        console.log("Transaction Hash", tx.hash);
        // console.log('after weight lastTx', tx.hash)
        // Updating new Addresses
        await info.loadingAddresses();
      } catch (e) {
        console.log(e);
      }
      this.setting = false;
    },
  },
});
