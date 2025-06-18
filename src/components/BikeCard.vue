<template>
    <div class="bike-card" @click="goToProductPage()">
        <div class="bike-card__discount" v-if="bike.oldPrice">
            {{ discount }}%
        </div>
        <div class="bike-card__img-container">
            <ProgressSpinner style="width: 100%; height: 100%; position: absolute; z-index: -1" />
            <img class="bike-card__img" :src="`/images/${bike.image}`" alt="">
        </div>
        <p class="bike-card__call-to-action">See more</p>
        <div class="bike-card__info">
            <h3 class="bike-card__title">{{ bike.bikeName.toUpperCase() }}</h3>
            <s v-if="bike.oldPrice" class="bike-card__old-price">{{ bike.oldPrice }} &euro;</s>
            <p class="bike-card__price">{{ bike.price }} &euro;</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
import { computed } from 'vue';
import router from '@/router';
const props = defineProps({
    bike: {
        type: Object,
        required: true
    }
})

const discount = computed(() => {
    return Math.abs(Math.round(((props.bike.oldPrice - props.bike.price) / props.bike.oldPrice) * 100)).toFixed(0)
})

function goToProductPage() {
    router.push({ name: 'product', params: { id: props.bike.id, brand: props.bike.brand } })
}

</script>
<style scoped>
.bike-card {
    width: 300px;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    cursor: pointer;
    overflow: hidden;
}

.bike-card__discount {
    width: 200px;
    padding: 0.25em 0;
    background-color: var(--secondary);
    color: var(--main);
    position: absolute;
    top: 5px;
    right: -75px;
    font-weight: 600;
    z-index: 2;
    transform: rotate(45deg);
    text-align: center;
}

.bike-card__img-container {
    width: 100%;
    height: 200px;
    position: relative;
}

.bike-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.bike-card__call-to-action {
    width: fit-content;
    padding: 0.5em 1em;
    background-color: var(--main);
    color: var(--secondary);
    position: absolute;
    bottom: 3em;
    font-weight: 600;
    transition: all 0.2s ease-in-out;
}

.bike-card:hover .bike-card__call-to-action {
    bottom: 7em;
}

.bike-card__info {
    width: 100%;
    height: 120px;
    padding: 1em;
    background-color: var(--main);
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.bike-card__title {
    font-weight: 600;
    margin: 0;
    text-align: center;
    color: #fff;
}

.bike-card__price {
    margin: 0;
    font-size: 1.5em;
    font-weight: 600;
    color: var(--secondary);
    text-align: center;
}

.bike-card__old-price {
    display: block;
    width: 100%;
    margin: 0;
    font-size: 1em;
    font-weight: 600;
    color: var(--p-surface-400);
    text-align: center;
}
</style>