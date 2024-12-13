<template>
    <section class="screen-loader">
        <div class="top-loader"></div>
        <div class="middle-loader"></div>
        <div class="bottom-loader"></div>
    </section>
</template>
<script setup lang="ts">

</script>
<style scoped>
.screen-loader {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: #fff;
}

.top-loader {
    width: 15em;
    height: 15em;
    border-radius: 50%;
    border: 10px solid var(--main);
    border-color: var(--main) transparent var(--main) transparent;
    animation: spin 2s linear infinite;
    position: absolute;
}

.middle-loader {
    width: 10em;
    height: 10em;
    border-radius: 50%;
    border: 10px solid var(--secondary);
    border-color: var(--secondary) transparent var(--secondary) transparent;
    animation: spin 1s linear infinite;
    position: absolute;
}

.bottom-loader {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background-color: var(--main);
    animation: grow 1s ease-in-out infinite;
}

@keyframes grow {
    from {
        width: 1em;
        height: 1em;
    }

    to {
        width: 5em;
        height: 5em;
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>