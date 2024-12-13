<template>
    <section class="mobile-header">
        <i class="pi pi-bars" @click="menuIsVisible = true"></i>
        <div class="logo">
            Demo Bikes
        </div>

        <Drawer header="Menu" v-model:visible="menuIsVisible">
            <div class="mobile-header__search">
                <InputGroup>
                    <InputText placeholder="Search" />
                    <InputGroupAddon> <i class="pi pi-search"></i> </InputGroupAddon>
                </InputGroup>
            </div>

            <ul class="mobile-header__list" @click="menuIsVisible = false">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/products/0">Products</router-link></li>
                <li><router-link to="/news">News</router-link></li>
                <li><router-link to="/contact">Contact</router-link></li>
            </ul>
        </Drawer>
    </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Drawer from 'primevue/drawer';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';


const menuIsVisible = ref(false);

</script>
<style scoped>
.mobile-header {
    width: 100%;
    height: 50px;
    background-color: var(--main);
    position: relative;
    z-index: 2;
    display: none;
    padding: 0 1em;
    justify-content: space-between;
    align-items: center;
}

.mobile-header .pi {
    font-size: 1.5em;
    color: #fff
}

.logo {
    width: fit-content;
    color: #fff;
    font-weight: 400;
}

.mobile-header__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 1em;
}

.mobile-header__list a {
    text-decoration: none;
    color: var(--main);
    font-size: 1.2em;
}

@media screen and (max-width: 414px) and (orientation: portrait) {
    .mobile-header {
        display: flex;
    }
}
</style>