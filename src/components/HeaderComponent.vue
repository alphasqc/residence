<template>
    <div class="header">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
        >
            <el-menu-item index="1-1" @click="Reset">LOGO</el-menu-item>
            <el-menu-item index="1-2">首页</el-menu-item>
            <el-menu-item index="1-3">茶室</el-menu-item>
            <el-menu-item index="1-4">居所</el-menu-item>

            <div class="flex-grow" />

            <el-menu-item index="2">卧室</el-menu-item>
        </el-menu>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const activeIndex = ref('1-2')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}

const Reset = () => {
    location.reload()
}
</script>

<style>
@import '@style/index.css';
</style>
