<template>
    <div class="skeleton">
        <el-skeleton :rows="9" animated />
    </div>
</template> 

<style scoped>
.el-skeleton {
    display: flex;
    flex-direction: column;
    justify-content: left;
    padding: 1rem;
    border-radius: 2px;
    width: 40rem;
    box-shadow: 0px 0px 2px rgba(206, 206, 206, 0.5);
    background-color: #fff;
}
</style>
