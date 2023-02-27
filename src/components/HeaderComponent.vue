<template>
    <div class="header">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            router
            >

            <div class="logo" @click="Reset">LOGO</div>
            <template v-for="item in navItems">
                <el-menu-item :index="item.index">{{ item.title }}</el-menu-item>
            </template>

            <div class="flex-grow" />

            <div class="headercomponent">
                <div class="searchinput">
                    <input
                        v-model="searchtest"
                        placeholder="居所中探索"
                        @keydown.enter.native="searchContent(searchtest)"
                        />
                    <el-icon :size="14" @click="searchContent(searchtest)">
                        <Search />
                    </el-icon>
                </div>
        
                <el-dropdown split-button type="primary">
                    创作中心
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>写文章</el-dropdown-item>
                            <el-dropdown-item>写笔记</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <img src="../assets/sign in.svg" @click="jumpLogin" />
            </div>

        </el-menu>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import route from '@/router'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

// 页面导航列表
const navItems = [
    {
        index: '/primary',
        title: '首页'
    },
    {
        index: '/tearoom',
        title: '茶室'
    },
    {
        index: '/residence',
        title: '居所'
    }
];

const activeIndex = ref('');
if(route.currentRoute.value.fullPath == '/synthesis'){
    activeIndex.value = '/primary';
}else { 
    activeIndex.value = route.currentRoute.value.fullPath;
}

// 搜索部分
const searchtest = ref('');
const searchContent = (text) => {
    console.log(text);
}

// LOGO刷新
const router = useRouter();
const Reset = () => {
    activeIndex.value = '/primary';
    router.push('/primary');
}

// 登录跳转
const jumpLogin = () => {
    router.push('/personshow')
}
</script>

<style>
@import '@style/index.css';
@import '@style/header.css';
</style>
