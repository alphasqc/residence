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
                :rules="loginRules"
                ref="rulesList"
                @keydown.enter.native="jumpLogin(rulesList)"
            >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginList.username" placeholder="请输入用户名或者手机号码" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginList.password" placeholder="请输入密码" type="password" />
                </el-form-item>
            </el-form>

            <el-button size="large" type="primary" @click="jumpLogin(rulesList)">登录</el-button>

            <router-link to="/regist">没有账号?现在注册</router-link>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { reactive, ref, unref } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import store from '../../store';

const rulesList = ref(null)

// 登录表单数据
const loginList = reactive({
    username: '',
    password: ''
})

// 表单检验规则
const loginRules = reactive({
    username: [{ required: true, message: '账号不能为空!', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空!', trigger: 'blur' }]
})

// 清空表单
const resetForm = async (rulesList) => {
    rulesList.resetFields()
}

// 登录事件
const router = useRouter()
const jumpLogin = async (rulesList) => {
    const form = unref(rulesList);
    if (!form) return
    try {
        await form.validate()
        const { username, password } = loginList
        axios.request({
            method: 'post',
            url: '/api/user/login',
            data: {
                userName: username,
                userPassword: password
            }
        }).then((res) => {
            if(res.data.code == '401'){
                resetForm(rulesList);
                ElMessage.error('用户名或者密码错误!');
            }else {
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("userInfo", JSON.stringify(res.data.data.finduser[0]));
                router.push('/primary');
            }
        })
    } catch (error) {
    }
}
</script>

<style scoped>
@import '@style/login.css';
</style>
