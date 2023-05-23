<template>
    <div class="admin">
        <el-container>
          <el-aside width="200px">
            <aside-component />
          </el-aside>
          <el-main class="admin-main">
            <!-- 路由过渡动效 -->
            <router-view v-slot="{ Component }">
            <transition name="move" mode="out-in">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </transition>
            </router-view>
          </el-main>
        <div class="tohome" @click="jumpHome">返回</div>
        </el-container>
    </div>
</template>

<script setup>
import AsideComponent from './aside/AsideComponent.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const jumpHome = () => {
    router.push('/personshow');
}
</script>

<style>
@import '@style/admin.css';
</style>
