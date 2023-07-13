<template>
    <!-- Navbar -->
    <Navbar></Navbar>
    <!-- Main page -->
    <h1 class="text-3xl font-bold underline">
        This is Producer
    </h1>
    <div class="flex">
      <input v-model="destination" type="text" class="w-3/4 text-center p-[5px] m-[10px] rounded-[5px] border-[2px]"
        placeholder="destination">
        <input v-model="receiver" type="text" class="w-3/4 text-center p-[5px] m-[10px] rounded-[5px] border-[2px]"
        placeholder="receiver">
        <input v-model="transportation" type="text" class="w-3/4 text-center p-[5px] m-[10px] rounded-[5px] border-[2px]"
        placeholder="transportation">

      <div class="flex flex-col justify-center w-1/4 p-[5px]">
        <button v-if="!setting" @click='producePackage(destination.toString(),receiver.toString(),transportation.toString())'
          class="h-[35px] rounded-[5px] bg-[#ff0059]/[0.5] hover:bg-[#ff0059]">Make Package</button>
          <button v-if="setting" class="h-[35px] rounded-[5px] bg-[#ff0059] cursor-progress">Producing</button>
      </div>
    </div>

    <!--  -->
    
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
    name: 'Producer',
    components: {
        Navbar
    },
    data() {
        return {

        }
    },
    computed: {
    ...mapState(useUser, ['login']),
    ...mapState(useInfo, ['contractOwner','setting']),
  },
    methods: {
    ...mapActions(useInfo, ['producePackage']),
  }
}

</script>