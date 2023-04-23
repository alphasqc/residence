<template>
    <div class="search">
        <nav class="navbox">
            <template v-for="item in primaryList" :key="item">
                <router-link :to="item.index">{{ item.title }}</router-link>
            </template>
        </nav>
        <div class="content">
            <div class="apicontent">
                <router-view>
                </router-view>
            </div>
            <div class="adcontent">
                <div class="ad-card">
                    <img src="../../assets/adimg-1.jpg" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const primaryList = [
    {
        index: '/searchblog',
        title: '文章'
    },
    {
        index: '/searchtea',
        title: '讨论'
    },
    {
        index: '/searchuser',
        title: '用户'
    }
];
</script>

<style scoped>
@import '@style/primary.css';
</style>
