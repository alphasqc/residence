<template>
    <div class="like">
        <template v-for="(item, index) in blogInfo" :key="index">
            <div class="blog-box" @click="jumpDetail(item.Blog.blogID)">
                <div class="primary-img" v-show="item.blogImg != ''">
                    <img :src=item.blogImg alt="">
                </div>
                <div class="primary-test">
                    <div class="ptitle">
                        {{ item.Blog.blogTitle }}
                    </div>
                    <div class="pcontent">
                        {{ item.Blog.blogContent }}
                    </div>
                    <div class="pwriter">
                        {{ item.User.userName }}
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
    url: '/api/like/show',
    data: {
        UserUserID: JSON.parse(localStorage.getItem('userID'))
    }
}).then((res) => {
    blogInfo.value = res.data.data.reverse();
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
