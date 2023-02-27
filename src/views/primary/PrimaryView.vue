<template>
    <div class="primary">
        <nav class="navbox">
            <template v-for="item in primaryList" :key="item">
                <router-link :to="item.index">{{  item.title }}</router-link>
            </template>
        </nav>
        <div class="content">
            <div class="apicontent">
                <router-view>
                </router-view>
            </div>
            <div class="adcontent">
                <div class="ad-card">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const primaryList = [
    {
        index: '/synthesis',
        title: '综合'
    },
    {
        index: '/focus',
        title: '关注'
    },
    {
        index: '/front',
        title: '前端'
    },
    {
        index: '/backend',
        title: '后端'
    },
    {
        index: '/test',
        title: '测试'
    },
    {
        index: '/ui',
        title: 'UI'
    }
]
</script>

<style scoped>
@import '@style/primary.css';
</style>