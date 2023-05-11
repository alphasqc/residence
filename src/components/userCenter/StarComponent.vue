<template>
    <div class="star">
        <template v-for="(item, index) in blogInfo" :key="index">
            <div class="blog-box" @click="jumpDetail(item.blogID)">
                <div class="primary-img" v-show="item.blogImg != ''">
                    <img :src=item.blogImg alt="">
                </div>
                <div class="primary-test">
                    <div class="ptitle">
                        {{ item.blogTitle }}
                    </div>
                    <div class="pcontent">
                        {{ item.blogContent }}
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

var blogInfo = ref([]);

axios.request({
    method: 'post',
    url: '/api/star/show',
    data: {
        UserUserID: JSON.parse(localStorage.getItem('userID'))
    }
}).then((res) => {
    for(var i = 0;i < res.data.data.length;i++){
        blogInfo.value[i] = res.data.data[i].Blog
    }
    blogInfo.value = blogInfo.value.reverse();
})

const jumpDetail = (blogID) => {
    router.push({
        path: '/blogdetail',
        query: { blogID: blogID }
    });
}
</script>

<style>
@import '@style/user.css';
</style>
