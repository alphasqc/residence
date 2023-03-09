<template>
    <div class="regist">
        <div class="regist-box">
            <div class="regist-title">
                LOGO
            </div>

            <el-form
                class="regist-form"
                label-position="left"
                label-width="5rem"
                :model="registList"
                :rules="rules"
                ref="ruleFormRef"
                @keydown.enter.native="jumpRegist(ruleFormRef)"
                status-icon
                >
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="registList.username" placeholder="输入20位以内用户名" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="registList.password" type="password" placeholder="请输入6~16位密码" />
                </el-form-item>
                <el-form-item label="确认密码" prop="checkpass">
                    <el-input v-model="registList.checkpass" type="password" placeholder="请再次输入密码" />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="registList.sex" class="ml-4">
                        <el-radio label="1" size="large">男</el-radio>
                        <el-radio label="0" size="large">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="registList.phone" placeholder="请输入11位手机号码" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registList.email" placeholder="请输入正确的邮箱地址" />
                </el-form-item>
            </el-form>

            <el-button size="large" type="primary" @click="jumpRegist(ruleFormRef)">注册</el-button>

        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { reactive, ref, unref } from 'vue';
import axios from 'axios';

const ruleFormRef = ref(null)

// 表单数据
const registList = reactive({
    username: '',
    password: '',
    checkpass: '',
    sex: '',
    phone: '',
    email: ''
})

// 检查手机号码格式
const validateMobile = (rule, value, callback) => {
    const regPhone = /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/
    if (regPhone.test(value)) {
        return callback()
    }
    callback(new Error('请输入合法手机号!'));
}

// 检查邮箱格式
const validateEmail = (rule, value, callback) => {
    const regEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
    if(regEmail.test(value)){
        return callback()
    }
    callback(new Error('请输入合法邮箱!'));
}

// 检查两次密码是否相同
const validatePass = (rule, value, callback) => {
    if(value === registList.password){
        return callback()
    }
    callback(new Error('两次密码不同!'));
}

// 表单验证规则
const rules = reactive({
    username: [
        { required: true, message: '用户名不能为空!', trigger: 'blur' },
        { max: 20, message: '长度在20个字符以内', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空!', trigger: 'blur' },
        { min: 6, max:16, message: '密码格式错误!', trigger: 'blur' }
    ],
    checkpass: [
        { required: true, message: '密码不能为空!', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
    ],
    sex: [{ required: true, message: '性别未选择!', trigger: 'blur' }],
    phone: [
        { required: true, message: '电话不能为空!', trigger: 'blur' },
        { validator: validateMobile, trigger: 'blur' }
    ],
    email: [
        { required: true, message: '邮箱不能为空!', trigger: 'blur' },
        { validator: validateEmail, trigger: 'blur' }
    ],
})

// 注册按钮事件
const router = useRouter()
const jumpRegist = async (ruleFormRef) => {
    const form = unref(ruleFormRef);
    if (!form) return
    try {
        await form.validate()
        const { username, password, sex, phone, email } = registList
        console.log(username, password, sex, phone, email)
        axios.request({
            method: 'post',
            url: '/api/user/add',
            data: {
                userName: username,
                userPassword: password,
                userSex: sex,
                userPhone: phone,
                userEmail: email,
                userAvator: '1.jpg',
                userIsadmin: '0'
            }
        })
        router.push('/login')
    } catch (error) {
    }
}
</script>

<style scoped>
@import '@style/login.css';
</style>
