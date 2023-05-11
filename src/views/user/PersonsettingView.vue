<template>
    <div class="personsetting">
        <div class="back-box">
            <router-link to="/personshow">&#60;&#60;返回用户中心</router-link>
        </div>
        <div class="setting-box">
            <el-form
                label-width="80px"
                :model="userList"
                :rules="rules"
                ref="ruleFormRef"
                @keydown.enter.native="setSubmit(ruleFormRef)"
                status-icon
                >
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="userList.userName" />
                </el-form-item>
                <el-form-item label="旧密码" prop="oldpass">
                    <el-input v-model="userList.oldpass" type="password" />
                </el-form-item>
                <el-form-item label="新密码" prop="newpass">
                    <el-input v-model="userList.newpass" type="password" />
                </el-form-item>
                <el-form-item label="性别" prop="userSex">
                    <el-radio-group v-model="userList.userSex" class="ml-4">
                        <el-radio label="1" size="large">男</el-radio>
                        <el-radio label="0" size="large">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="用户邮箱" prop="userEmail">
                    <el-input v-model="userList.userEmail" />
                </el-form-item>
                <el-form-item label="用户电话" prop="userPhone">
                    <el-input v-model="userList.userPhone" />
                </el-form-item>
                <el-form-item label="用户头像">
                    <el-input v-model="userList.userAvator" />
                </el-form-item>
            </el-form>
            <div class="set-button">
                <el-button type="primary" plain @click="setSubmit">提交</el-button>
                <el-button plain @click="cancelSet">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref, reactive, unref } from 'vue';
import { ElMessage } from 'element-plus';

// 数据获取
const userList = reactive({
    userID: '',
    userName: '',
    userPassword: '',
    userSex: '',
    userPhone: '',
    userEmail: '',
    userAvator: '',
    oldpass: '',
    newpass: ''
});

axios.request({
    method: 'post',
    url: '/api/user/setting',
    data: {
        userID: JSON.parse(localStorage.getItem("userInfo")).userID
    }
}).then((res) => {
    console.log(res)
    userList.userID = res.data.data[0].userID;
    userList.userName = res.data.data[0].userName;
    userList.userPassword = res.data.data[0].userPassword;
    userList.userSex = res.data.data[0].userSex;
    userList.userEmail = res.data.data[0].userEmail;
    userList.userPhone = res.data.data[0].userPhone;
    userList.userAvator = res.data.data[0].userAvator;
})

// 提交事件
const ruleFormRef = ref(null)
const router = useRouter()
const setSubmit = async (ruleFormRef) => {
    if(userList.oldpass == userList.userPassword){
        const form = unref(ruleFormRef);
        if (!form) return
        try {
            axios.request({
                method: 'post',
                url: '/api/user/update',
                data: {
                    userID: userList.userID,
                    userName: userList.userName,
                    userPassword: userList.newpass,
                    userSex: userList.userSex,
                    userEmail: userList.userEmail,
                    userPhone: userList.userPhone,
                    userAvator: userList.userAvator
                }
            })
            ElMessage.success('修改成功!');
            userList.oldpass = '';
            userList.newpass = '';
        } catch (error) {
        }
    }else {
        ElMessage.error('原密码错误!');
    }
}

// 返回事件
const cancelSet = () => {
    router.push('/personshow');
}

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
    if (regEmail.test(value)) {
        return callback()
    }
    callback(new Error('请输入合法邮箱!'));
}

// 表单验证规则
const rules = reactive({
    userName: [
        { required: true, message: '用户名不能为空!', trigger: 'blur' },
        { max: 20, message: '长度在20个字符以内', trigger: 'blur' }
    ],
    oldpass: [
        { required: true, message: '密码不能为空!', trigger: 'blur' },
        { min: 6, max: 16, message: '密码格式错误!', trigger: 'blur' }
    ],
    newpass: [
        { required: true, message: '密码不能为空!', trigger: 'blur' },
        { min: 6, max: 16, message: '密码格式错误!', trigger: 'blur' }
    ],
    userSex: [{ required: true, message: '性别未选择!', trigger: 'blur' }],
    userPhone: [
        { required: true, message: '电话不能为空!', trigger: 'blur' },
        { validator: validateMobile, trigger: 'blur' }
    ],
    userEmail: [
        { required: true, message: '邮箱不能为空!', trigger: 'blur' },
        { validator: validateEmail, trigger: 'blur' }
    ],
})


</script>

<style scoped>
@import '@style/user.css';
</style>