<template>
    <div class="blogdetail">
        <div class="ribbon">
            <div class="bloglike">
                <img :src="likesrc" @click="likeSubmit" />
            </div>
            <div class="blogstar">
                <img :src="starsrc" @click="starSubmit" />
            </div>
        </div>
        <div class="maincontent">
            <div class="blogcontent">
                <p class="ptitle">
                    {{ blogdata.blogTitle }}
                </p>
                <span class="pwriter">
                    {{ writerdata.userName }}
                </span>
                <div class="pcontent">
                    {{ blogdata.blogContent }}
                </div>
            </div>
            <div class="writecontent">
                <p class="wtitle">
                    评论
                </p>
                <textarea class="writeinput" v-model="commentContent" placeholder="输入你想评论的内容" />
                <el-button type="primary" @click="submitComment">发送</el-button>
            </div>
            <div class="commentarea">
                <template v-for="(item, index) in commentData" :key="index">
                    <div class="comment-box">
                        <div class="commentwriter">
                            <div class="userimg"></div>
                            {{  item.User.userName }}
                        </div>
                        <div class="commentContent">
                            {{ item.commentContent }}
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="adcontent">
            <div class="ad-card">
                <img src="../../assets/adimg-1.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import likeImg from '@/assets/like.svg'
import nolikeImg from '@/assets/nolike.svg'
import starImg from '@/assets/star.svg'
import nostarImg from '@/assets/nostar.svg'
import { ElMessage } from 'element-plus';

const blogdata = ref('');
const writerdata = ref('');

const route = useRoute();

// 文章内容获取
axios.request({
    method: 'post',
    url: '/api/blogs/find',
    data: {
        blogID: route.query.blogID
    }
}).then((res) => {
    blogdata.value = res.data.data[0];
    axios.request({
        method: 'post',
        url: '/api/user/find',
        data: {
            userID: blogdata.value.UserUserID
        }
    }).then((res) => {
        writerdata.value = res.data.data[0]
    })
});


const commentContent = ref('');
const toID = ref('');

// 评论功能
const submitComment = () => {
    if (localStorage.getItem('userInfo') == null) {
        ElMessage.warning('请先登录')
    } else {
        if(toID.value == ''){
            toID.value = 0
        }
        axios.request({
            method: 'post',
            url: '/api/comment/add',
            data: {
                blogID: blogdata.value.blogID,
                UserUserID: JSON.parse(localStorage.getItem('userInfo')).userID,
                commentContent: commentContent.value,
                toID: toID.value
            }
        }).then((res) => {
            if(res.data.code == 200) {
                commentContent.value = '';
                axios.request({
                    method: 'post',
                    url: 'api/comment/find',
                    data: {
                        blogID: route.query.blogID
                    }
                }).then((res) => {
                    commentData.value = res.data.data
                })
            }
        })
    }
}

const commentData = ref('')

// 评论获取
axios.request({
    method: 'post',
    url: 'api/comment/find',
    data: {
        blogID: route.query.blogID
    }
}).then((res) => {
    commentData.value = res.data.data.reverse();
})

// 左侧菜单及图标
const like = ref('');
const star = ref(false);
const likesrc = ref('');
const starsrc = ref(starImg);

if(localStorage.getItem('userInfo') == null){
    likesrc.value = likeImg;
    starsrc.value = starImg;
}else {
// 查询点赞情况
    axios.request({
        method: 'post',
        url: '/api/like/find',
        data: {
            BlogBlogID: route.query.blogID,
            UserUserID: JSON.parse(localStorage.getItem('userInfo')).userID
        }
    }).then((res) => {
        if (res.data.code == 200) {
            likesrc.value = nolikeImg;
            like.value = true;
        } else {
            likesrc.value = likeImg;
            like.value = false;
        }
    })

    // 查询收藏情况
    axios.request({
        method: 'post',
        url: '/api/star/find',
        data: {
            BlogBlogID: route.query.blogID,
            UserUserID: JSON.parse(localStorage.getItem('userInfo')).userID
        }
    }).then((res) => {
        if (res.data.code == 200) {
            starsrc.value = nostarImg;
            star.value = true;
        } else {
            starsrc.value = starImg;
            star.value = false;
        }
    })

}

// 点赞
const likeSubmit = () => {
    if(localStorage.getItem('userInfo') == null){
        ElMessage.warning('请先登录')
    }else {
        like.value = !like.value;
        if (like.value == true) {
            axios.request({
                method: 'post',
                url: '/api/like/add',
                data: {
                    BlogBlogID: route.query.blogID,
                    UserUserID: JSON.parse(localStorage.getItem('userInfo')).userID
                }
            })
            likesrc.value = nolikeImg;
            ElMessage.success('点赞成功');
        } else {
            axios.request({
                method: 'post',
                url: '/api/like/delete',
                data: {
                    BlogBlogID: route.query.blogID,
                    UserUserID: JSON.parse(localStorage.getItem('userInfo')).userID
                }
            })
            likesrc.value = likeImg;
            ElMessage.warning('取消点赞成功');
        }
    }
}

// 收藏
const starSubmit = () => {
    if (localStorage.getItem('userInfo') == null) {
        ElMessage.warning('请先登录')
    } else {
        star.value = !star.value;
        if (star.value == true) {
            axios.request({
                method: 'post',
                url: '/api/star/add',
                data: {
                    BlogBlogID: route.query.blogID,
                    UserUserID: JSON.parse(localStorage.getItem('userInfo')).userID
                }
            })
            starsrc.value = nostarImg;
            ElMessage.success('收藏成功');
        } else {
            axios.request({
                method: 'post',
                url: '/api/star/delete',
                data: {
                    BlogBlogID: route.query.blogID,
                    UserUserID: JSON.parse(localStorage.getItem('userInfo')).userID
                }
            })
            starsrc.value = starImg;
            ElMessage.warning('取消收藏成功');
        }
    }
}

</script>

<style scoped>
@import "@style/primary.css";
@import "@style/blog.css";
</style>
