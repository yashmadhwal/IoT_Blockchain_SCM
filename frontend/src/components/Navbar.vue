<template>
    <div class="flex justify-around mx-auto">
        <!-- Router links -->
        <div class="flex w-full justify-around ml-[10px]">
            <router-link to='/' class="flex flex-col justify-center">
                <!-- <div v-if="page == 'Home'"
                    class="text-center text-[20px] h-[50px] w-[100px] tracking-[1px] grid place-content-center p-[3px] hover:cursor-not-allowed rounded-[15px] bg-[#001514] text-white">
                    Home
                </div>
                <div v-else @click="currentpage('Home')"
                    class="text-center text-[20px] h-[50px] w-[100px] tracking-[1px] grid place-content-center p-[3px] hover:cursor-pointer rounded-[15px] bg-[#001514]/[0.5] hover:bg-[#001514] hover:text-white">
                    Home</div> -->
                <div @click="currentpage('Home')"
                    class="text-center text-[20px] h-[50px] w-[100px] tracking-[1px] grid place-content-center p-[3px] hover:cursor-pointer rounded-[15px] bg-[#001514]/[0.5] hover:bg-[#001514] hover:text-white">
                    Home</div>
            </router-link>
            <router-link to='/Producer' class="flex flex-col justify-center">
                <!-- <div v-if="page == 'Producer'"
                    class="text-center text-[20px] h-[50px] w-[100px] tracking-[1px] grid place-content-center p-[3px] hover:cursor-not-allowed rounded-[15px] bg-[#001514] text-white">
                    Producer
                </div>
                <div v-else @click="currentpage('Producer')"
                    class="text-center text-[20px] h-[50px] w-[100px] tracking-[1px] grid place-content-center p-[3px] hover:cursor-pointer rounded-[15px] bg-[#001514]/[0.5] hover:bg-[#001514] hover:text-white">
                    Producer</div> -->
                <div @click="currentpage('Producer')"
                    class="text-center text-[20px] h-[50px] w-[100px] tracking-[1px] grid place-content-center p-[3px] hover:cursor-pointer rounded-[15px] bg-[#001514]/[0.5] hover:bg-[#001514] hover:text-white">
                    Producer</div>
            </router-link>
            <router-link to='/Receive' class="flex flex-col justify-center">
                <!-- <div v-if="page == 'Receive'"
                    class="text-center text-[20px] h-[50px] w-[100px] tracking-[1px] grid place-content-center p-[3px] hover:cursor-not-allowed rounded-[15px] bg-[#001514] text-white">
                    Receiver
                </div>
                <div v-else @click="currentpage('Receive')"
                    class="text-center text-[20px] h-[50px] w-[100px] tracking-[1px] grid place-content-center p-[3px] hover:cursor-pointer rounded-[15px] bg-[#001514]/[0.5] hover:bg-[#001514] hover:text-white ">
                    Receiver</div> -->
                <div @click="currentpage('Receive')"
                    class="text-center text-[20px] h-[50px] w-[100px] tracking-[1px] grid place-content-center p-[3px] hover:cursor-pointer rounded-[15px] bg-[#001514]/[0.5] hover:bg-[#001514] hover:text-white ">
                    Receiver</div>
            </router-link>
            <router-link to='/Track' class="flex flex-col justify-center">
                <!-- <div v-if="page == 'Track'"
                    class="text-center text-[20px] h-[50px] w-[100px] tracking-[1px] grid place-content-center p-[3px] hover:cursor-not-allowed rounded-[15px] bg-[#001514] text-white">
                    Track
                </div>
                <div v-else @click="currentpage('Track')"
                    class="text-center text-[20px] h-[50px] w-[100px] tracking-[1px] grid place-content-center p-[3px] hover:cursor-pointer rounded-[15px] bg-[#001514]/[0.5] hover:bg-[#001514] hover:text-white ">
                    Track</div> -->
                <div @click="currentpage('Track')"
                    class="text-center text-[20px] h-[50px] w-[100px] tracking-[1px] grid place-content-center p-[3px] hover:cursor-pointer rounded-[15px] bg-[#001514]/[0.5] hover:bg-[#001514] hover:text-white ">
                    Track</div>
            </router-link>
        </div>
        <!-- Connect Wallet -->
        <div class="flex">
            <div class="w-[300px] pl-[5px] pr-[5px] mr-[10px]">
                <div @click="connectMetamask()" v-if='!loading && !login'
                    class="mt-[10px] mb-[10px] h-[50px] bg-[#ffad39] hover:bg-[#c28b3e] rounded-[30px] grid place-content-center cursor-pointer">
                    Connect MetaMask</div>
                <div v-if='loading'
                    class="mt-[10px] mb-[10px] h-[50px] bg-[#ffad39] rounded-[30px] grid place-content-center cursor-progress">
                    <div v-if='loading' class="flex"><img src="../assets/Images/Icons/loaging.png" alt=""
                            class="motion-reduce:hidden animate-spin dark:invert">&nbsp;&nbsp;Loading...</div>
                </div>

                <div v-if='login && !loading'
                    class="mt-[10px] mb-[10px] h-[50px] bg-[#c3842b] rounded-[30px] grid place-content-center cursor-not-allowed">
                    Connected: {{ shortWallet }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    mapActions,
    mapState
} from 'pinia'

import {
    useUser
} from '../stores/user'

import {
    useInfo
} from '../stores/info'

export default {
    name: 'ConnectWallet',
    props: {
        // Remove user role later 

    },
    data() {
        return {
            page: ''
        }
    },
    computed: {
        ...mapState(useUser, ['shortWallet', 'loading', 'login']),
        ...mapState(useInfo, ['infoLoaded', 'currentPage'])

    },
    methods: {
        ...mapActions(useUser, ['connectMetamask']),
        currentpage(page) {
            this.currentPage = page
        }
    }

}
</script>

<style>
* {
    /* border: 1px solid black; */
}
</style>