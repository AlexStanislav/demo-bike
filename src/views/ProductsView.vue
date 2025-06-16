<template>
    <section class="products">
        <section class="filters">
            <h2 class="section-title">Filters</h2>
            <Accordion :multiple="true" :value="['1', '2', '3']">
                <AccordionPanel value="1">
                    <AccordionHeader>Brands</AccordionHeader>
                    <AccordionContent>
                        <ul class="filters__list">
                            <li class="filters__list-item" v-for="(item, index) in productBrands" :key="index">
                                <RadioButton v-model="filters.brand" :inputId="item" name="brand" :value="item" />
                                &nbsp;
                                <label class="filters__label" :for="item">{{ item }} brand</label>
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
            <Accordion>
                <AccordionPanel value="2">
                    <AccordionHeader>Categories</AccordionHeader>
                    <AccordionContent>
                        <i class="pi pi-filter-slash" v-if="filters.category" @click="filters.category = ''"></i>
                        <ul class="filters__list">
                            <li class="filters__list-item" v-for="(item, index) in productCategories" :key="index">
                                <RadioButton v-model="filters.category" :inputId="item" name="category" :value="item" />
                                &nbsp;
                                <label class="filters__label" :for="item">{{ item }}</label>
                            </li>
                        </ul>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
            <Accordion>
                <AccordionPanel value="3">
                    <AccordionHeader>Price</AccordionHeader>
                    <AccordionContent>
                        <div class="filters__price">
                            <InputNumber v-model="filters.price[0]" mode="currency" currency="EUR" />
                            <span class="filters__price-separator">to</span>
                            <InputNumber v-model="filters.price[1]" mode="currency" currency="EUR" />
                        </div>
                        <Slider v-model="filters.price" range :max="priceLimits[1]" :min="priceLimits[0]"></Slider>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </section>
        <section class="container">
            <header class="container__header">
                Showing {{ paginatorIndex + 1 }}-{{ paginatorTotalRecords > paginatorIndex + paginatorRows ?
                    paginatorIndex + paginatorRows : paginatorTotalRecords }} of {{
                    paginatorTotalRecords }}
            </header>
            <div class="container__main">
                <BikeCard :bike="bike" v-for="bike in displayBikes" :key="bike.id" />
            </div>
            <div class="container__paginator">
                <Paginator :rows="paginatorRows" :totalRecords="paginatorTotalRecords" @page="handlePageChange">
                </Paginator>
            </div>
        </section>
    </section>
</template>
<script setup lang="ts">
import { computed, onMounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '@/stores/app';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import RadioButton from 'primevue/radiobutton';
import Slider from 'primevue/slider';
import InputNumber from 'primevue/inputnumber';
import BikeCard from '@/components/BikeCard.vue';
import Paginator from 'primevue/paginator';


import type { Bike } from '@/types';

const route = useRoute();
const productID = computed(() => {
    return route.params.id
})


const productBrands = computed(() => {
    // const brands = Object.keys(store.allBikes)
    const brands = ["first", "second", "third", "fourth", "fifth", "sixth"]
    return brands;
})

const priceLimits = computed(() => {
    const prices: number[] = []
    productBrands.value.forEach((brand) => {
        (store.allBikes[brand] as Bike[]).forEach((bike) => {
            if (!prices.includes(bike.price)) {
                prices.push(bike.price)
            }
        })
    })

    prices.sort((a, b) => a - b)
    const minPrice = prices[0]
    const maxPrice = prices[prices.length - 1]

    return [minPrice, maxPrice]
})

const productCategories = computed(() => {
    const categories: string[] = []
    productBrands.value.forEach((brand) => {
        (store.allBikes[brand] as Bike[]).forEach((bike) => {
            if (!categories.includes(bike.category)) {
                categories.push(bike.category)
            }
        })
    })
    return categories
})

const store = useAppStore();

function filterBikes(): Bike[] {
    const filteredBikes = (store.allBikes[`${filters.value.brand}`] as Bike[]).filter((bike) => {
        const categoryMatch = filters.value.category ? bike.category === filters.value.category : true
        const priceMatch = bike.price >= filters.value.price[0] && bike.price <= filters.value.price[1]

        return categoryMatch && priceMatch
    })

    return filteredBikes
}

const filters = ref({
    brand: 'first',
    category: '',
    price: priceLimits.value
})

const paginatorIndex = ref(0)
const paginatorRows = ref(12)
const paginatorTotalRecords = computed(() => {
    return filterBikes().length
})

function handlePageChange(event: { page: number }) {
    paginatorIndex.value = event.page * paginatorRows.value
}

const displayBikes = computed(() => {
    const bikes = filterBikes()
    return bikes.slice(paginatorIndex.value, paginatorIndex.value + paginatorRows.value)
})


onMounted(() => {
    document.querySelector('.desktop-header')?.classList.add('desktop-header--scrolled');
    filters.value.brand = productID.value !== '0' ? productID.value.toString() : 'first'
})

watch(productID, () => {
    filters.value.brand = productID.value !== '0' ? productID.value.toString() : 'first'
})

</script>
<style scoped>
.products {
    width: 95%;
    margin: 0 auto;
    position: relative;
    top: 4em;
    padding-top: 2em;
    display: flex;
}

.filters {
    width: 15%;
    position: relative;
}

.filters .pi {
    position: absolute;
    right: 1em;
    cursor: pointer;
}

.filters__list {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
}

.filters__label {
    text-transform: capitalize;
}

.filters__price {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
}

.filters__price-separator {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    padding: 0 1em;
    text-align: center;
}

.container {
    width: 80%;
    display: flex;
    flex-direction: column;
}

.container__header {
    width: 100%;
    height: 5vh;
    background: var(--secondary);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1em;
    color: var(--main);
}

.container__main {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 1em 0;
    gap: 1em;
}

.container__paginator {
    width: 100%;
    height: 15vh;
    display: flex;
    justify-content: center;
}

@media screen and (max-width: 414px) and (orientation: portrait),
screen and (max-height: 414px) and (orientation: landscape) {
    .products {
        flex-direction: column;
        align-items: center;
    }

    .filters {
        width: 100%;
    }

    .container {
        width: 100%;
    }

    .container__paginator {
        height: fit-content;
        margin-bottom: 2em;
    }
}
</style>