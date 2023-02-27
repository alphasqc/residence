<template>
    <div class="tearoom">
        <div class="navcontent">

        </div>
        <div class="teacontent">
            <div class="skeleton" v-for="index in 5" :key="index">
                <el-skeleton :rows="5" animated />
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

</script>

<style scoped>
@import '@style/tearoom.css';
</style>
