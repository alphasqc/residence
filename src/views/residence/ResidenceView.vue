<template>
    <div class="residence">
        <div class="residence-box">
            <template v-for="item in userItems" :key="item">
                <div class="user-card">
                    <div class="skeleton">
                        <el-skeleton style="--el-skeleton-circle-size: 80px" animated >
                            <template #template>
                            <el-skeleton-item variant="circle" />
                            </template>
                        </el-skeleton>
                        <br />
                        <el-skeleton :rows="1"  animated />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup>
const userItems = new Array(36).fill(
    {
        name: "程序员",
        title: "这个人很懒,什么都没留下!"
    }
)
</script>

<style scoped>
@import "@style/residence.css";
</style>
