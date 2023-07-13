<template>
    <!-- Navbar -->
    <Navbar></Navbar>

    <!-- Main page -->
    <h1 class="text-3xl font-bold underline">
        Track Product here.
    </h1>
    <div class="flex">
      <input v-model="productID" type="text" class="w-3/4 text-center p-[5px] m-[10px] rounded-[5px] border-[2px]"
        placeholder="productID ">
      <div class="flex flex-col justify-center w-1/4 p-[5px]">
        <button @click='getInfo(productID)'
          class="h-[35px] rounded-[5px] bg-[#ff0059]/[0.5] hover:bg-[#ff0059]">Track</button>
      </div>
    </div>

    <div v-for="i in productInfo">
        Time: {{ i [1] }}<br>
        Value: {{ i [2] }}<br>
        Color: {{ i [3] }}
        <br>
        <br>
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
    name: 'Home',
    components: {
        Navbar
    },
    data() {
        return {
            productInfo: null
        }
    },
    methods: {
        ...mapActions(useInfo, ['trackInfo']),
        async getInfo(id) {
            this.productInfo = await this.trackInfo(id)
        }
    }
}

</script>