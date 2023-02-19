<template>
    <div class="home">
        <el-container>
            <el-header>
                <header-component />
            </el-header>
            <el-main>
                <primary-view />
            </el-main>
        </el-container>
    </div>
</template>

<script setup>
import HeaderComponent from "@components/HeaderComponent.vue";
import PrimaryView from '@views/primary/PrimaryView.vue'

</script>

<style scoped>
@import '@style/index.css';
</style>
