<template>
    <div class="writer">
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
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

var blogInfo = ref([]);

axios.request({
    method: 'post',
    url: '/api/blogs/showblog',
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
