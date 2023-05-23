<template>
    <div class="tea">
        <el-table :data="blogList" style="width: 100%; height: 100%;">
            <el-table-column prop="blogID" label="ID" width="50px" />
            <el-table-column prop="blogTitle" label="文章标题" />
            <el-table-column prop="blogContent" label="文章内容" show-overflow-tooltip />
            <el-table-column prop="blogImg" label="文章图片" />
            <el-table-column prop="blogType" label="文章类型" />
            <el-table-column prop="blogReading" label="阅读量" />
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button type="primary" :icon="Edit" circle @click="setData(scope.row.blogID)" />
                    <el-button type="danger" :icon="Delete" circle @click="deleteData(scope.row.blogID)" />
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

const blogList = ref();

axios.get('/api/blogs').then((res) => {
    blogList.value = res.data.data
    console.log(blogList.value)
})

// 删除数据
const deleteData = (blogID) => {
    axios.request({
        method: 'post',
        url: '/api/blogs/delete',
        data: {
            blogID: blogID
        }
    }).then((res) => {
        if (res.data.code == 200) {
            ElMessage.success('删除成功!');
            axios.get('/api/blogs').then((res) => {
                blogList.value = res.data.data
            })
        } else {
            ElMessage.error('删除失败!')
        }
    })
}

// 修改数据
const setData = (userID) => {
    console.log(userID)
}

</script>

<style>
@import '@style/admin.css';
</style>