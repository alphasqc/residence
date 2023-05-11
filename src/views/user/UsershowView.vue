<template>
    <div class="personshow">
        <div class="left-box">
            <div class="person-card">
                <div class="person-data">
                    <div class="person-img">
                        {{ userList.userName }}
                    </div>
                    <div class="userdata">
                        <div class="username">
                            {{ userList.userName }}
                        </div>
                        <div class="useremail">
                            {{ userList.userEmail }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="person-box">
                <nav class="navbox">
                    <template v-for="item in personList" :key="item">
                        <router-link :to="item.index">{{ item.title }}</router-link>
                    </template>
                </nav>
                <div class="listbox">
                    <router-view>
                    </router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// 用户数据获取
const route = useRoute();
const userList = ref('')

axios.request({
    method: 'post',
    url: '/api/user/find',
    data: {
        userID: JSON.parse(localStorage.getItem('userID'))
    }
}).then((res) => {
    userList.value = res.data.data[0];
})

const personList = [
    {
        index: '/writer',
        title: '发表'
    },
    {
        index: '/star',
        title: '收藏'
    },
    {
        index: '/like',
        title: '点赞'
    }
]

</script>

<style scoped>
@import '@style/user.css';
</style>
