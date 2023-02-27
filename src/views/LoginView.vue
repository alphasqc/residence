<template>
    <div class="login">
        <div class="login-box">
            <div class="login-title">
                LOGO
            </div>

            <el-form
                label-position="left"
                label-width="4rem"
                :model="loginList"
            >
                <el-form-item label="用户名">
                    <el-input v-model="loginList.username" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="loginList.password" />
                </el-form-item>
            </el-form>

            <el-button size="large" type="primary" @click="jumpLogin">登录</el-button>

            <router-link to="/regist">没有账号?现在注册</router-link>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const loginList = {
    username: '',
    password: ''
}

const router = useRouter()
const jumpLogin = () => {
    router.push('/primary')
}
</script>

<style scoped>
@import '@style/login.css';
</style>
