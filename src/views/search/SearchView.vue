<template>
    <div class="search">
        <div class="content">
            
            <div class="apicontent">
                <skeleton-component />
            </div>
            
            <div class="adcontent">
                <div class="ad-card">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import SkeletonComponent from '@components/SkeletonComponent.vue'
</script>

<style scoped>
@import '@style/primary.css';
</style>
