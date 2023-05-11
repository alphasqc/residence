<template>
    <div class="searchtea">
        <div v-show="teaDom">
            <template v-for="index in 5" :key="index">
                <el-skeleton class="skeleton" :rows="5" animated />
            </template>
        </div>

        <div v-show="!teaDom">
            <template v-for="(item, index) in teaList" :key="index">
                <div  class="tea-main" >
                    <div class="tea-box">
                        <div class="user-head">{{ item.userName }}</div>
                        <span>{{ item.userName }}</span>
                        <div style="flex: 1;" />
                        <div>{{ item.teaType }}</div>
                    </div>
                    <div class="teabox-text">
                        {{ item.teaText }}
                    </div>
                </div>
            </template>
        </div>
        <el-card shadow="always" v-show="dataif">未找到相关数据</el-card>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

// 骨架屏显示
const teaDom = ref(true)

// 数据获取
const dataif = ref(false);
const teaList = ref();
axios.request({
    method: 'post',
    url: '/api/tea/search',
    data: {
        searchInput: JSON.parse(localStorage.getItem('searchinput'))
    }
}).then((res) => {
    teaList.value = res.data.data.reverse();
    if (teaList.value != '') {
        setTimeout(function () {
            teaDom.value = false;
        }, 500);
    } else {
        setTimeout(function () {
            teaDom.value = false;
            dataif.value = true;
        }, 500);
    }
})

</script>

<style scoped>
@import '@style/tearoom.css';
</style>
