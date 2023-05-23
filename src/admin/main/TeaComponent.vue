<template>
    <div class="tea">
        <el-table :data="teaList" style="width: 100%; height: 100%;">
            <el-table-column prop="teaID" label="ID" width="50px" />
            <el-table-column prop="userName" label="用户名" width="80px" />
            <el-table-column prop="teaType" label="讨论类型" />
            <el-table-column prop="teaText" label="讨论内容" />
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button type="primary" :icon="Edit" circle @click="setData(scope.row.teaID)" />
                    <el-button type="danger" :icon="Delete" circle @click="deleteData(scope.row.teaID)" />
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

const teaList = ref();

axios.get('/api/tea').then((res) => {
    teaList.value = res.data.data
})

// 删除数据
const deleteData = (teaID) => {
    axios.request({
        method: 'post',
        url: '/api/tea/delete',
        data: {
            teaID: teaID
        }
    }).then((res) => {
        if (res.data.code == 200) {
            ElMessage.success('删除成功!');
            axios.get('/api/tea').then((res) => {
                teaList.value = res.data.data
            })
        } else {
            ElMessage.error('删除失败!')
        }
    })
}

// 修改数据
const setData = (teaID) => {
    console.log(teaID)
}

</script>

<style>
@import '@style/admin.css';
</style>