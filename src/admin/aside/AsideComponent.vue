<template>
    <div class="aside">
        <el-row class="tac">
            <el-col :span="24">
                <h4 class="mb-2" style="color: white;">
                    <img src="../../../public/logo.ico" style="height: 30px;width: 30px; vertical-align:middle;" />
                    后台管理系统
                </h4>
                <el-menu
                    default-active="/user"
                    class="el-menu-vertical-demo"
                    background-color="rgb(48, 65, 86)" 
                    text-color="#fff"
                    @select="selectNav"
                    >
                    <template v-for="item in navItem" :key="item">
                        <el-menu-item :index="item.index">
                            <span>{{ item.title }}</span>
                        </el-menu-item>
                    </template>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navItem = ref([
    {
        index: "/user",
        title: '用户管理'
    },
    {
        index: "/blog",
        title: '文章管理'
    },
    {
        index: "/tea",
        title: '讨论管理'
    }
]);


const selectNav = (key, keyPath) => {
    router.push(key);
}
</script>

<style>
@import '@style/admin.css';
</style>
