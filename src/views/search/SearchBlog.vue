<template>
    <div class="searchblog">
        <skeleton-component v-show="showSynthesis" />
        <div class="primary-box" v-show="!showSynthesis">
            <template v-for="(item, index) in blogInfo" :key="index">
                <div class="blog-box">
                    <div class="primary-img" v-show="item.blogImg != ''">
                        <img :src=item.blogImg alt="">
                    </div>
                    <div class="primary-test">
                        <div class="ptitle">{{ item.blogTitle }}</div>
                        <div class="pcontent">
                            {{ item.blogContent }}
                        </div>
                        <div class="pwriter">{{ item.User.userName }}</div>
                    </div>
                </div>
            </template>
        </div>
        <el-card shadow="always" v-show="dataif">未找到相关数据</el-card>
    </div>
</template>

<script setup>
import SkeletonComponent from '@components/SkeletonComponent.vue'
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// 控制骨架屏显示
const showSynthesis = ref(true)
const searchInput = JSON.parse(localStorage.getItem('searchinput'));

// 数据获取
const blogInfo = ref([]);
const dataif = ref(false);
axios.request({
    method: 'post',
    url: '/api/blogs/search',
    data: {
        searchInput: searchInput
    }
}).then((res) => {
    blogInfo.value = res.data.data.reverse();
    if (blogInfo.value != '') {
        setTimeout(function () {
            showSynthesis.value = false;
        }, 500);
    } else {
        setTimeout(function () {
            showSynthesis.value = false;
            dataif.value = true;
        }, 500);
    }
})

</script>

<style scoped>
@import '@style/primary.css';
</style>
