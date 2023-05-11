<template>
    <div class="residence">
        <!-- <div class="residence-box"> -->
            <div class="skeleton-box" v-show="skeletondom">
                <template v-for="item in userItems" :key="item">
                    <div class="user-card">
                        <div class="skeleton" id="skeleton-card">
                            <el-skeleton style="--el-skeleton-circle-size: 80px" animated >
                                <template #template>
                                <el-skeleton-item variant="circle" />
                                </template>
                            </el-skeleton>
                            <br />
                            <el-skeleton :rows="1"  animated />
                        </div>
                    </div>
                </template>
            </div>
            <div class="user-box" v-show="!skeletondom">
                <template v-for="(item,index) in userList" :key="index">
                    <div class="user-card" id="user-card" @click="jumpUser(item.userID)">
                        <el-skeleton style="--el-skeleton-circle-size: 80px" >
                            <template #template>
                            <el-skeleton-item variant="circle" />
                            </template>
                        </el-skeleton>
                        <br />
                        {{ item.userName }}
                    </div>
                </template>
            </div>
        <!-- </div> -->
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userItems = new Array(5).fill(
)

const skeletondom = ref(true);
const userdom = ref(false);

// 用户数据获取
const userList = ref()
axios.get('/api/user').then((res) => {
    userList.value = res.data.data;
    if(userList.value != ''){
        setTimeout(function () {
            skeletondom.value = false;
        }, 500);
    }
})

// 用户跳转
const router = useRouter();

const jumpUser = (userID) => {
    router.push('/personshow');
    localStorage.setItem('userID', userID)
}
</script>

<style scoped>
@import "@style/residence.css";
</style>
