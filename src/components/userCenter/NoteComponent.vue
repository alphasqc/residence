<template>
    <div class="note">
        <template v-for="(item, index) in noteList" :key="index">
            <div class="note-box">
                <div class="primary-test">
                    <div class="ptitle">
                        <div>{{ item.noteContent }}</div>
                        <el-button type="danger" :icon="Delete" circle @click="noteDelete(item.noteID)" />
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';

const route = useRoute();

// 笔记创建
if (route.query.personshow == 'true') {
    var noteContent = prompt("新建笔记");
    if (noteContent) {
        axios.request({
            method: 'post',
            url: '/api/note/add',
            data: {
                UserUserID: JSON.parse(localStorage.getItem("userID")),
                noteContent: noteContent
            }
        }).then((res) => {
            if (res.data.code == 200) {
                ElMessage.success("笔记创建成功");
                // 笔记列表数据获取
                axios.request({
                    method: 'post',
                    url: '/api/note/show',
                    data: {
                        UserUserID: JSON.parse(localStorage.getItem("userInfo")).userID
                    }
                }).then((res) => {
                    noteList.value = res.data.data;
                    console.log(noteList.value)
                })

            }
        })
    } else if (noteContent === '') {
        ElMessage.warning("笔记内容不能为空!");
    } else {
    }
}

const noteList = ref();

// 笔记列表数据获取
axios.request({
    method: 'post',
    url: '/api/note/show',
    data: {
        UserUserID: JSON.parse(localStorage.getItem("userInfo")).userID
    }
}).then((res) => {
    noteList.value = res.data.data.reverse();
})

// 删除笔记
const noteDelete = (noteID) => {
    axios.request({
        method: 'post',
        url: '/api/note/delete',
        data: {
            noteID: noteID
        }
    }).then((res) => {
        if(res.data.code == 200){
            axios.request({
                method: 'post',
                url: '/api/note/show',
                data: {
                    UserUserID: JSON.parse(localStorage.getItem("userInfo")).userID
                }
            }).then((res) => {
                noteList.value = res.data.data;
                console.log(noteList.value)
            })
            ElMessage.success('删除成功!');
        }
    })
}
</script>

<style>
@import '@style/user.css';
</style>
