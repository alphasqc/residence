<template>
    <div class="ui">
        <skeleton-component v-show="showSynthesis" />
        <div class="primary-box" v-show="!showSynthesis">
            <template v-for="(item, index) in blogInfo" :key="index">
                <div class="blog-box" @click="jumpDetail">
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
        <el-card shadow="always" v-show="dataif">没有此分类的文章</el-card>
    </div>
</template>

<script setup>
import SkeletonComponent from '@components/SkeletonComponent.vue';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 页面跳转
const router = useRouter();
const jumpDetail = () => {
    router.push('/blogdetail')
}

// 控制骨架屏显示
const showSynthesis = ref(true)

// 数据获取
const dataif = ref(false);
const blogInfo = ref([])
axios.request({
    method: 'post',
    url: '/api/blogs/type',
    data: {
        blogType: 'UI'
    }
}).then((res) => {
    blogInfo.value = res.data.data.reverse();
    if(blogInfo.value != ''){
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
