<template>
    <div class="home">
        <el-container>
            <el-header>
                <header-component />
            </el-header>
            <el-main>
                <!-- <primary-view /> -->
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <keep-alive :include="navList">
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import HeaderComponent from "@components/HeaderComponent.vue";
import axios from "axios";

axios.get('/api/user').then((res) => {
    console.log(res.data.data)
})

const navList = []
</script>

<style scoped>
@import '@style/index.css';
</style>
