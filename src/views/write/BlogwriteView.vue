<template>
    <div class="blogwrite">
        <div class="write-head">
            <input v-model="blogInfo.title" placeholder="请输入文章标题" />

            <div class="flex-write" />

            <el-button class="drafts-button" type="primary" size="large" plain>存草稿箱</el-button>
            <el-button type="primary" size="large" @click="submitBlog">发布</el-button>
            <div class="write-user" >{{ userInfo.userName }}</div>
        </div>
        <div class="write-content">
            <textarea ref="textareaRef" :rows="rows" v-model="blogInfo.content" placeholder="请输入正文" />
            <el-select v-model="value" @change="chooseSelect" clearable placeholder="选择分类" >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    />
            </el-select>
        </div>s
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const blogInfo = ref({
    title: '',
    content: '',
    img: ''
});

const submitBlog = () => {
    axios.request({
        method: 'post',
        url: '/api/blogs/add',
        data: {
            UserUserID: userInfo.userID,
            blogTitle: blogInfo.value.title,
            blogContent: blogInfo.value.content,
            blogType: selectNum.value,
            blogImg: blogInfo.value.img
        }
    }).then((res) => {
        console.log(res)
    })
    router.push('/primary')
};

// 类型选中
const teaText = ref('');

const value = ref('')
const options = [
    {
        value: '前端',
        label: '前端',
    },
    {
        value: '后端',
        label: '后端',
    },
    {
        value: '测试',
        label: '测试',
    },
    {
        value: 'UI',
        label: 'UI',
    },
];
const selectNum = ref('')
const chooseSelect = (val) => {
    selectNum.value = val
}

// 正文输入高度自适应
const textareaRef = ref(null);
const rows = ref(1);

onMounted(() => {
    nextTick(adaptText);
});

watch(() => blogInfo.value.content , () => {
    nextTick(adaptText);
})

const adaptText = () => {
    let textarea = textareaRef.value;

    textarea.style.height = 'auto';
    const height = textarea.scrollHeight;

    if(height){
        textarea.style.height = height + 'px';
    }
};
</script>

<style scoped>
@import '@style/write.css';
</style>
