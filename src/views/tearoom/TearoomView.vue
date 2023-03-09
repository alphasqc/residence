<template>
    <div class="tearoom">
        <div class="navcontent">
        </div>
        <div class="teacontent">

            <div class="skeleton">
                <el-input
                    v-model="teaText"
                    maxlength="300"
                    placeholder="有什么想说的就和茶室里的家伙们说说吧。"
                    :autosize="{ minRows: 6, maxRows: 6 }"
                    show-word-limit
                    type="textarea"
                />
                <div class="tea-set">
                    <el-select v-model="value" @change="chooseSelect" clearable placeholder="选择分类" >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                    </el-select>
                    <el-button type="primary" @click="submitTea">提交</el-button>
                </div>
            </div>

            <!-- 中间内容 -->
            <div v-show="teaDom">
                <template v-for="index in 5" :key="index">
                    <el-skeleton class="skeleton" :rows="5" animated />
                </template>
            </div>

            <div v-show="!teaDom">
                <template v-for="(item,index) in teaList" :key="index">
                    <div  class="tea-main" >
                        <div class="tea-box">
                            <div class="user-head">{{ item.userName }}</div>
                            <span>{{ item.userName }}</span>
                            <div style="flex: 1;" />
                            <div>{{ item.teaType }}</div>
                        </div>
                        <div class="teabox-text">
                            {{ item.teaText }}
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="usercontent">
            <div class="user-box">
            </div>
            <div class="topic-box">
                
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

// 提交内容
const teaText = ref('');

const value = ref('')
const options = [
    {
        value: '技术交流',
        label: '技术交流',
    },
    {
        value: '日常交流',
        label: '日常交流',
    },
    {
        value: '闲情逸事',
        label: '闲情逸事',
    },
];
const selectNum = ref('')
const chooseSelect = (val) => {
    selectNum.value = val
}

// 骨架屏显示
const teaDom = ref(true)

const userInfo = JSON.parse(localStorage.getItem('userInfo'));
// 提交事件
const submitTea = () => {
    axios.request({
        method: 'post',
        url: '/api/tea/add',
        data: {
            teaText: teaText.value,
            userName: userInfo.userName,
            teaType: selectNum.value
        }
    }).then(()=> {
        location.reload();
    })
}

// 获取内容
const teaList = ref()
axios.get('/api/tea').then((res) => {
    teaList.value = JSON.parse(JSON.stringify(res.data.data));
    if(teaList.value != ''){
        setTimeout(function () {
            teaDom.value = false;
        }, 500);
    }
})
</script>

<style scoped>
@import '@style/tearoom.css';
</style>
