<template>
    <!-- Navbar -->
    <Navbar></Navbar>
  
    <!-- Main page -->
    <h1 class="text-3xl font-bold underline">
    Receive here. </h1>
    <div class="flex">
      <input v-model="productID" type="text" class="w-3/4 text-center p-[5px] m-[10px] rounded-[5px] border-[2px]"
        placeholder="productID ">
      <div class="flex flex-col justify-center w-1/4 p-[5px]">
        <button v-if="!setting" @click='receiveInfo(productID)'
          class="h-[35px] rounded-[5px] bg-[#ff0059]/[0.5] hover:bg-[#ff0059]">Receive</button>
        <button v-if="setting" class="h-[35px] rounded-[5px] bg-[#ff0059] cursor-progress">Receiving</button>
      </div>
    </div>
   
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
      name: 'Receive',
      components: {
        Navbar
      },
      data() {
          return {
       
          }
      },
    computed: {
    ...mapState(useUser, ['login']),
    ...mapState(useInfo, ['setting']),
  },
    methods: {
    ...mapActions(useInfo, ['receiveInfo']),
  }
  }
  
  </script>