<template>
    <section class="product">
        <section class="product__wrapper">
            <section class="left">
                <img class="product__img" :src="productImage" :alt="productData.bikeName">
                <div class="product__gallery">
                    <img class="product__gallery-img" :src="productData.image + productData.id"
                        @click="imageIndex = -1">
                    <img class="product__gallery-img" v-for="(image, index) in productData.gallery" :key="index"
                        :src="`${image}${index}`" @click="imageIndex = index">
                </div>
            </section>
            <section class="right">
                <h2 class="product__title">{{ productData.bikeName.toUpperCase() }}</h2>
                <p class="product__brand"><span class="brand__label">Brand: </span>{{ productData.brand }} brand</p>
                <p class="product__category"><span class="brand__label">Category: </span>{{ productData.category }}</p>
                <p class="product__year"><span class="brand__label">Year: </span>{{ productData.mainYear }}</p>
                <p class="product__slogan">
                    {{ productData.bikeSlogan }}
                </p>
                <p class="product__description">{{ productData.bikeDesc }}</p>
                <ul class="product__info">
                    <li class="info__item" v-for="(info, index) in productData.info" :key="index">
                        <FontAwesomeIcon class="info__icon" :icon="infoIcons[`${info.label}`]" />
                        <span class="info__label">{{ info.label }}:</span>&nbsp;
                        <span class="info__value">{{ info.value }}</span>
                    </li>
                </ul>
                <div class="product__price">
                    <span class="price__value">&euro;{{ productData.price }}</span>
                    <span class="price__old-value" v-if="productData.oldPrice">&euro;{{ productData.oldPrice }}</span>
                    <div class="product__discount" v-if="productData.oldPrice">
                        -{{ discount }}%
                    </div>
                </div>
            </section>
        </section>
        <h2 class="section-title">Similar bikes</h2>
        <section class="product__similar">
            <BikeCard v-for="bike in similarBikes" :key="bike.id" :bike="bike" />
        </section>
    </section>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '@/stores/app';
import type { Bike } from '@/types';
import BikeCard from '@/components/BikeCard.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faWeightHanging, faTachometerAlt, faRuler, faGasPump, faBolt, type IconDefinition } from '@fortawesome/free-solid-svg-icons';

const discount = computed(() => {
    return Math.abs(Math.round(((productData.value.oldPrice - productData.value.price) / productData.value.oldPrice) * 100)).toFixed(0)
})


const infoIcons: { [key: string]: IconDefinition } = {
    "Weight": faWeightHanging,
    "Power": faBolt,
    "Dimensions": faRuler,
    "Top speed": faTachometerAlt,
    "Tank capacity": faGasPump
}

const store = useAppStore();
const route = useRoute();

const imageIndex = ref(-1)

const similarBikes = computed(() => {
    return (store.allBikes[`${route.params.brand}`] as Bike[]).filter((bike) => bike.category === productData.value.category).slice(0, 6)
})

onMounted(() => {
    document.querySelector('.desktop-header')?.classList.add('desktop-header--scrolled');
})

const productData = computed(() => {
    return (store.allBikes[`${route.params.brand}`] as Bike[]).filter((bike) => bike.id === route.params.id)[0]
})

const productImage = computed(() => {
    return imageIndex.value > -1 ? productData.value.image + imageIndex.value : productData.value.image + productData.value.id
})

</script>
<style scoped>
.product {
    width: 95%;
    margin: 0 auto;
    position: relative;
    top: 4em;
    padding-top: 2em;
    margin-bottom: 2em;
    display: flex;
    flex-direction: column;
}

.product__wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2em;
}

.left {
    width: 50%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
}

.right {
    width: 50%;
    height: 65vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
}

.product__title,
.product__brand,
.product__category,
.product__year {
    margin: 0;
    color: var(--main);
}

.product__brand,
.product__category,
.product__year {
    text-transform: capitalize;
    color: #707070;
}

.brand__label {
    font-weight: 400;
    color: var(--main);
}

.product__slogan {
    margin: 0;
    margin-top: 1em;
    font-size: 1.2em;
    font-weight: 600;
    color: var(--main);
    text-transform: capitalize;
}

.product__description {
    margin: 0;
    margin-top: 1em;
    color: #707070;
    font-size: 0.9em;
}

.product__info {
    list-style: none;
    padding: 0;
}

.info__icon {
    width: 30px;
    color: var(--main);
}

.info__label {
    color: var(--main);
    font-weight: 600;
}

.info__value {
    font-weight: 300;
}

.product__price {
    display: flex;
    gap: 1em;
    align-items: flex-end;
    width: 100%;
    bottom: 0;
    position: absolute;
}

.price__value {
    font-weight: 600;
    color: var(--main);
    font-size: 3em;
    line-height: 1;
}

.price__old-value {
    text-decoration: line-through;
    color: #707070;
    line-height: 1;
    font-size: 1.5em;
}

.product__discount {
    background-color: var(--main);
    color: #fff;
    padding: 0.5em 2em;
    clip-path: polygon(100% 0%, 100% 100%, 10% 100%, 0% 50%, 10% 0%);
}

.product__img {
    width: 100%;
    height: 80%;
    object-fit: cover;
}

.product__gallery {
    width: 100%;
    height: 10%;
    display: flex;
    gap: 1em;
    overflow: scroll;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    padding-bottom: 0.75em;
}

.product__gallery-img {
    height: 100%;
    object-fit: contain;
    scroll-snap-align: start;
    cursor: pointer;
}

.product__similar {
    width: 100%;
    display: flex;
    gap: 1em;
    padding-bottom: 3em;
}

@media screen and (max-width: 414px) {
    .product__wrapper {
        flex-direction: column;
        top: 0;
        gap: 0;
    }

    .left {
        width: 100%;
    }

    .right {
        width: 100%;
        height: fit-content;
    }

    .product__price {
        position: relative;
    }

    .product__similar {
        flex-direction: column;
        align-items: center;
    }
}
</style>