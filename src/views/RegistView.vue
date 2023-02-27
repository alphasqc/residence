<template>
    <div class="login">
        <div class="login-box">
            <div class="login-title">
                LOGO
            </div>

            <el-form label-position="left" label-width="4rem" :model="registList">
                <el-form-item label="用户名">
                    <el-input v-model="registList.username" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="registList.password" />
                </el-form-item>
            </el-form>

            <el-button size="large" type="primary" @click="jumpRegist">注册</el-button>

        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const registList = {
    username: '',
    password: ''
}

const router = useRouter()
const jumpRegist = () => {
    router.push('/login')
}
</script>

<style scoped>
@import '@style/login.css';
</style>
