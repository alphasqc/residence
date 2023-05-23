<template>
    <div class="user">
        <el-table :data="userList" style="width: 100%; height: 100%;">
            <el-table-column prop="userID" label="ID" width="50px" />
            <el-table-column prop="userName" label="用户名" width="80px" />
            <el-table-column prop="userPassword" label="用户密码" />
            <el-table-column prop="userSex" label="用户性别" />
            <el-table-column prop="userPhone" label="用户电话" />
            <el-table-column prop="userEmail" label="用户邮箱" />
            <el-table-column prop="userAvator" label="用户头像" />
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button type="primary" :icon="Edit" circle @click="setData(scope.row.userID)" />
                    <el-button type="danger" :icon="Delete" circle @click="deleteData(scope.row.userID)" />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import {
    Delete,
    Edit,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';

const userList = ref();

// 获取数据
axios.get('/api/user').then((res) => {
    userList.value = res.data.data
})

// 删除数据
const deleteData = (userID) => {
    axios.request({
        method: 'post',
        url: '/api/user/delete',
        data: {
            userID: userID
        }
    }).then((res) => {
        if(res.data.code == 200){
            ElMessage.success('删除成功!');
            axios.get('/api/user').then((res) => {
                userList.value = res.data.data
            })
        }else {
            ElMessage.error('删除失败!')
        }
    })
}

// 修改数据
const setData = (userID) => {
    console.log(userID)
}

</script>