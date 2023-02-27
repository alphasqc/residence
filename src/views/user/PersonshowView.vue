<template>
    <div class="personshow">
        <div class="left-box">
            <div class="person-card">
                <el-button type="primary" @click="jumpSetting">
                    个人设置
                </el-button>
            </div>
            <div class="person-box">

            </div>
        </div>
        <div class="right-box">
            <div class="person-number">

            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
const jumpSetting = () => {
    router.push('/personsetting')    
}
</script>

<style scoped>
@import '@style/user.css';
</style>
