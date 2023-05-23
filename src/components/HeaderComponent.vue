<template>
    <div class="header">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            :ellipsis="false"
            router
            >

            <div class="logo" @click="Reset">
                <img src="../../public/logo.png" />
            </div>
            <template v-for="item in navItems">
                <el-menu-item :index="item.index">{{ item.title }}</el-menu-item>
            </template>

            <div class="flex-grow" />

            <div class="headercomponent">
                <div class="searchinput">
                    <input
                        v-model="searchtest"
                        placeholder="居所中探索"
                        @keydown.enter.native="searchContent"
                        />
                    <el-icon :size="14" @click="searchContent">
                        <Search />
                    </el-icon>
                </div>
        
                <el-dropdown split-button type="primary">
                    创作中心
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="writeBlog">写文章</el-dropdown-item>
                            <el-dropdown-item @click="writeTea">写讨论</el-dropdown-item>
                            <el-dropdown-item @click="writeTest">写笔记</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

                <!-- 登录入口 -->
                <img src="../assets/sign in.svg" @click="jumpLogin" v-show="userToken"/>
                <el-popover
                    placement="top-start"
                    :width="220"
                    trigger="hover"
                >
                    <template #reference>
                        <div class="user-head" v-show="!userToken">{{ userInfo.userName }}</div>
                    </template>

                    <div class="popover-box" >
                        <el-button text @click="jumpUser">用户中心</el-button>
                        <el-button text @click="offUser">退出登录</el-button>
                    </div>
                </el-popover>
            </div>

        </el-menu>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import route from '@/router';
import { useRouter } from 'vue-router';
import { Search } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

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

// 获取当前焦点路由
const activeIndex = ref('');
watch(() => route.currentRoute.value.fullPath, (newPath, oldPath) => { 
    if(newPath == '/synthesis'){
        activeIndex.value = '/primary';
    }else { 
        activeIndex.value = newPath;
    }
}, { immediate: true });

// 搜索部分
const searchtest = ref('');
const searchContent = () => {
    if(searchtest.value != ''){
        router.push('/search');
        localStorage.setItem('searchinput', JSON.stringify(searchtest.value))
        searchtest.value = '';
    }else {
        ElMessage.warning('请输入内容再进行搜索');
    }
}

// LOGO刷新
const router = useRouter();
const Reset = () => {
    router.push('/primary');
}

// 是否登录
const userToken = ref(true);
if(localStorage.getItem('token')){
    userToken.value = false;
}

// 登录跳转
const jumpLogin = () => {
    router.push('/login');
}

// 个人页跳转
const jumpUser = () => {
    router.push('/loading');
    localStorage.setItem('userID', JSON.parse(localStorage.getItem('userInfo')).userID)
}

// 退出登录
const offUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    // location.reload();
    router.push('/login');
}

const userInfo = ref([]);
if(userToken.value) {
    userInfo.value.userNmae = '未登录'
} else {    
    userInfo.value = JSON.parse(localStorage.getItem('userInfo'));
}

// 创作中心按钮组
const writeBlog = () => {
    if (localStorage.getItem('userInfo') == null) {
        ElMessage.warning('请先登录')
    } else {
        router.push('/blogwrite')
    }
}

const writeTea = () => {
    if (localStorage.getItem('userInfo') == null) {
        ElMessage.warning('请先登录')
    } else {
        router.push('/tearoom')
    }
}

const writeTest = () => {
    if (localStorage.getItem('userInfo') == null) {
        ElMessage.warning('请先登录')
    } else {
        router.push({
            path: '/loading',
            query: { personshow: true }
        });
    }
}

</script>

<style>
@import '@style/index.css';
@import '@style/header.css';
</style>
