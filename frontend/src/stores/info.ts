import { defineStore } from "pinia";
import { ethers, providers } from "ethers";

import { safe, useContracts } from "../../utils";

import { useUser } from "./user";

export type Chain = "97"; 
export const DEFAULT_CHAINID = "97" as Chain;

interface Roles {
  electricity: string;
  water: string;
  fuel: string;
}

export const useInfo = defineStore("info", {
  state: () => {
    return {
      currentPage: '',
      infoLoaded: false,
      setting: false
    };
  },
  getters: {
    // signer: (state) => state._signer(),
  },
  actions: {
    async environmentsetup() {
      console.log("All information loading");
      // Avoiding Reloading of Dashboard
      if (this.infoLoaded === false) {



        // Checking That if the Information is loaded or not
        this.infoLoaded = true;
      }
      console.log("All information loaded");
    },

    async CheckStatus(address: string) {
      const { iotc } = useContracts(DEFAULT_CHAINID);
      // console.log("ContractOwner Loading");
      console.log('---',address)
      const response = await iotc.userAccess(address);
      console.log(response)
      return response;
      // console.log("ContractOwner Loaded");
    },

    async grantAccess(address: string) {
      const { iotc } = useContracts(DEFAULT_CHAINID);


      this.setting = true;

      const user = useUser();
      const info = useInfo();
      // passing to set new values
      try {
        let tx = await iotc.connect(user.signer!).grantAccess(address);
        // console.log('before weight lastTx', tx.hash)
        await tx.wait();
        alert(`Transaction Hash ` + tx.hash);
        // console.log('after weight lastTx', tx.hash)
        // Updating new Addresses
      } catch (e) {
        console.log(e);
      }
      this.setting = false;
    },

    async revokeAccess(address: string) {
      const { iotc } = useContracts(DEFAULT_CHAINID);


      this.setting = true;

      const user = useUser();
      const info = useInfo();
      // passing to set new values
      try {
        let tx = await iotc.connect(user.signer!).revokeAccess(address);
        // console.log('before weight lastTx', tx.hash)
        await tx.wait();
        alert(`Transaction Hash ` + tx.hash);
        // console.log('after weight lastTx', tx.hash)
        // Updating new Addresses
      } catch (e) {
        console.log(e);
      }
      this.setting = false;
    },

    async producePackage(destination:string,receiver:string,transportation:string){
      // console.log(destination,receiver,transportation)
      const { iotc } = useContracts(DEFAULT_CHAINID);


      this.setting = true;

      const user = useUser();
      const info = useInfo();
      // passing to set new values
      try {
        let tx = await iotc.connect(user.signer!).initializeProduct(destination,receiver,transportation);
        // console.log('before weight lastTx', tx.hash)
        await tx.wait();
        alert(`Transaction Hash ` + tx.hash);
        // console.log('after weight lastTx', tx.hash)
        // Updating new Addresses
      } catch (e) {
        console.log(e);
      }
      this.setting = false;
    },

    async receiveInfo(productId:number){
      const { iotc } = useContracts(DEFAULT_CHAINID);
      console.log('==productId',productId)

      this.setting = true;

      const user = useUser();
      const info = useInfo();
      // passing to set new values
      try {
        let tx = await iotc.connect(user.signer!).receiveProduct(productId);
        await tx.wait();
        alert(`Transaction Hash ` + tx.hash);
      } catch (e) {
        console.log(e);
      }
      this.setting = false;
    },


    async trackInfo(productId:number){
      const { iotc } = useContracts(DEFAULT_CHAINID);
      console.log('==productId',productId)

      this.setting = true;

      const user = useUser();
      const info = useInfo();
      // passing to set new values
      try {
        const response = await iotc.getProductionJourney(productId);
        return response
      } catch (e) {
        console.log(e);
      }
      this.setting = false;
    },


    async ContractOwner() {
      // const { h2p } = useContracts(DEFAULT_CHAINID);
      // console.log("ContractOwner Loading");
      // this.contractOwner = await h2p.owner();
      // console.log("ContractOwner Loaded");
    },
  },
});
