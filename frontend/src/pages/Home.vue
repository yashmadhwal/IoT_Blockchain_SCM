<template>
  <!-- Navbar -->
  <Navbar></Navbar>

  <!-- Main page -->
  <!-- Here we will assign role -->
  <div class="text-3xl text-center">Admin Page</div>
  <div>

    <!-- Checking Status of address -->
    <div class="flex">
      <input v-model="addresStatus" type="text" class="w-3/4 text-center p-[5px] m-[10px] rounded-[5px] border-[2px]"
        placeholder="Input New Water Address ">
      <div class="flex flex-col justify-center w-1/4 p-[5px]">
        <button @click='getStatus(addresStatus.toString())'
          class="h-[35px] rounded-[5px] bg-[#ff0059]/[0.5] hover:bg-[#ff0059]">Get</button>
      </div>
    </div>

    <div>
      statusValue: {{ statusValue }}
    </div>

    <!-- Response -->
    <!-- Granting Access -->
    <div class="flex">
      <input v-model="grantAddress" type="text" class="w-3/4 text-center p-[5px] m-[10px] rounded-[5px] border-[2px]"
        placeholder="Input New Water Address ">
      <div class="flex flex-col justify-center w-1/4 p-[5px]">
        <button v-if="!setting" @click='grantAccess(grantAddress.toString())'
          class="h-[35px] rounded-[5px] bg-[#ff0059]/[0.5] hover:bg-[#ff0059]">Grant Access</button>
        <button v-if="setting" class="h-[35px] rounded-[5px] bg-[#ff0059] cursor-progress">Setting</button>
      </div>
    </div>

    <!-- Revoking Access -->
    <div class="flex">
      <input v-model="revokeAddress" type="text" class="w-3/4 text-center p-[5px] m-[10px] rounded-[5px] border-[2px]"
        placeholder="Input New Water Address ">
      <div class="flex flex-col justify-center w-1/4 p-[5px]">
        <button v-if="!setting" @click='revokeAccess(revokeAddress.toString())'
          class="h-[35px] rounded-[5px] bg-[#ff0059]/[0.5] hover:bg-[#ff0059]">revoke Access</button>
        <button v-if="setting" class="h-[35px] rounded-[5px] bg-[#ff0059] cursor-progress">Setting</button>
      </div>
    </div>

  </div>

  <p>Front can also make zones but we did it using blockchain network (testnet) scanner for tracking</p>
</template>
  
<script>
import Navbar from '../components/Navbar.vue'

import {
  mapState,
  mapActions
} from 'pinia'

import {
  useUser
} from '../stores/user'

import {
  useInfo
} from '../stores/info'


export default {
  name: 'Home',
  components: {
    Navbar
  },
  data() {
    return {
      statusValue: null,
      addresStatus: '',
      grantAddress: null,
      revokeAddress: null
    }
  },
  computed: {
    ...mapState(useUser, ['login']),
    ...mapState(useInfo, ['contractOwner', 'setting']),
  },
  methods: {
    ...mapActions(useInfo, ['CheckStatus', 'grantAccess', 'revokeAccess']),
    async getStatus(address) {
      this.statusValue = await this.CheckStatus(address)
    }
  }
}

</script>