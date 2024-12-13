<template>
    <section class="desktop-header">
        <div class="logo">
            DEMO BIKES
        </div>
        <nav class="desktop-header__nav">
            <div class="desktop-header__nav-wrapper">
                <div class="desktop-header__nav-background"></div>
            </div>
            <ul class="desktop-header__nav-list" @mouseleave="menuIsVisible = false">
                <li @mouseover="menuIsVisible = false"><router-link to="/">Home</router-link></li>
                <li @mouseover="menuIsVisible = true">
                    <router-link to="/products/0">Products</router-link>
                    <div class="nav-submenu" v-if="menuIsVisible" @mouseleave="menuIsVisible = false">
                        <ul class="nav-submenu__list">
                            <li v-for="(item, index) in submenuItems" :key="index" class="nav-submenu__list-item">
                                <router-link :to="`/products/${item.id}`">
                                    {{ item.title }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li @mouseover="menuIsVisible = false"><router-link to="/news">News</router-link></li>
                <li @mouseover="menuIsVisible = false"><router-link to="/contact">Contact</router-link></li>
            </ul>
        </nav>
        <div class="desktop-header__search">
            <div class="desktop-header__search-background"></div>
            <i class="pi pi-search"></i>
            <AutoComplete placeholder="Search" v-model="searchValue" :suggestions="searchSuggestions"
                optionLabel="bikeName" @complete="search" @option-select="selectBike" />
        </div>
    </section>
</template>
<script setup lang="ts">
import AutoComplete from 'primevue/autocomplete';
import { useAppStore } from '@/stores/app';
import router from '@/router';

import { ref } from 'vue';
import { flattenBikes } from '@/utlis';
import type { Bike } from '@/types';


function search(event: { query: string }) {
    const allBikes = flattenBikes(store.allBikes);
    searchSuggestions.value = allBikes.filter((bike) => {
        return bike.bikeName.toLowerCase().includes(event.query.toLowerCase())
    })
}

function selectBike(event: { value: Bike }) {
    router.push({ name: 'product', params: { id: event.value.id, brand: event.value.brand } })
}

const store = useAppStore();

const searchValue = ref('');

const menuIsVisible = ref(false);
const searchSuggestions = ref<object[]>([]);


const submenuItems = ref([
    {
        title: 'First brand',
        id: 'first'
    },
    {
        title: 'Second brand',
        id: 'second'
    },
    {
        title: 'Third brand',
        id: 'third'
    },
    {
        title: 'Fourth brand',
        id: 'fourth'
    },
    {
        title: 'Fifth brand',
        id: 'fifth'
    },
    {
        title: 'Sixth brand',
        id: 'sixth'
    },
]);

</script>
<style scoped>
.desktop-header {
    width: 80%;
    height: 4em;
    display: flex;
    align-items: center;
    margin: 1em 10%;
    position: fixed;
    z-index: 4;
}

.logo {
    width: fit-content;
    margin: 0 0.5em 0 0;
    color: #7996d4;
}

.desktop-header__nav {
    width: 60%;
    position: relative;
    border-bottom: 3px solid var(--secondary);
}

.desktop-header__search {
    width: 20%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1em;
    gap: 0.5em;
    filter: drop-shadow(-4px 0px 0px var(--secondary));
}

.desktop-header__search .pi {
    font-size: 1.5em;
    color: var(--secondary);
    font-weight: bold;
}

.desktop-header__search-background {
    width: 100%;
    height: 100%;
    right: 0;
    background-color: var(--main);
    position: absolute;
    clip-path: polygon(100% 0%, 100% 100%, 10% 100%, 0% 50%, 10% 0%);
    border-bottom: 3px solid var(--secondary);
    z-index: -1;
}

.desktop-header__nav-list {
    display: flex;
    list-style: none;
    gap: 1em;
}

.nav-submenu {
    position: absolute;
    top: 2.5em;
    left: 5%;
    width: 150px;
    height: fit-content;
    background-color: var(--main);
    z-index: 1;
}

.nav-submenu__list {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 0.5em;
    margin: 0;
    padding: 0;
    text-align: center
}


.desktop-header__nav-list a {
    text-decoration: none;
    color: #fff;
}


.nav-submenu__list-item {
    padding: 0.25em 0;
}

.nav-submenu__list-item:hover {
    background-color: var(--secondary);
}

.nav-submenu__list-item:hover a {
    color: var(--main);
}

.desktop-header__nav-wrapper {
    width: 99.5%;
    height: 100%;
    position: absolute;
    filter: drop-shadow(4px 0px 0px var(--secondary));
    z-index: -1;
}

.desktop-header__nav-background {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--main);
    z-index: -1;
    clip-path: polygon(100% 0%, 97% 50%, 100% 100%, 0 100%, 0% 50%, 0 0);
}

.desktop-header--scrolled {
    width: 100%;
    background-color: var(--main);
    margin: 0;
    justify-content: center;
    position: fixed;
    z-index: 4;
}

.desktop-header--scrolled .nav-submenu {
    left: 3%;
}

.desktop-header--scrolled .desktop-header__nav {
    width: 75%;
    border-bottom: none;
    filter: none;
    margin: 0;
}

.desktop-header--scrolled .logo {
    color: #fff;
    position: absolute;
    left: 2em;
}

.desktop-header--scrolled .desktop-header__search-background {
    border: none;
}

.desktop-header--scrolled .desktop-header__search {
    filter: none;
    position: absolute;
    right: 1em;
    border-left: 1px solid #fff;
}

@media screen and (max-width: 414px) {
    .desktop-header {
        display: none;
    }

}
</style>