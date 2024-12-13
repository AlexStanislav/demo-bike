<template>
    <section class="not-found">
        <h1 class="not-found__title">404 Not Found</h1>
    </section>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    document.querySelector('.desktop-header')?.classList.add('desktop-header--scrolled');
})

</script>
<style scoped>
.not-found {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>