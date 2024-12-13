<template>
  <header>
    <DesktopHeader />
    <MobileHeader />
  </header>
  <main class="main">
    <router-view></router-view>
  </main>
  <footer class="footer">
    <section class="footer__section">
      <div class="logo">
        Demo Bikes
      </div>
      <p class="footer__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo repellendus adipisci assumenda, numquam sit,
        distinctio doloremque, ea neque perspiciatis laborum aliquid obcaecati sunt beatae amet fugiat quisquam
        veritatis architecto nesciunt. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero voluptatem sint
        veritatis ab eos, corporis et est non quasi numquam, odio repudiandae repellat magnam ipsam ipsa quisquam illo
        quibusdam excepturi!
      </p>
    </section>
    <section class="footer__section">
      <h2>Navigation</h2>
      <ul class="footer__list">
        <li class="footer__list-item"><router-link to="/"><i class="pi pi-home"></i>Home</router-link></li>
        <li class="footer__list-item"><router-link to="/products/0"><i
              class="pi pi-objects-column"></i>Products</router-link></li>
        <li class="footer__list-item"><router-link to="/news">
            <FontAwesomeIcon class="pi" :icon="faNewspaper" />News
          </router-link></li>
        <li class="footer__list-item"><router-link to="/"><i class="pi pi-send"></i>Contact</router-link></li>
      </ul>
    </section>
    <section class="footer__section">
      <h2>Contact</h2>
      <ul class="footer__list">
        <li><i class="pi pi-envelope"></i>Email</li>
        <li><i class="pi pi-phone"></i>Phone</li>
        <li><i class="pi pi-facebook"></i>Facebook</li>
        <li><i class="pi pi-instagram"></i>Instagram</li>
        <li><i class="pi pi-twitter"></i>Twitter</li>
      </ul>
    </section>
    <section class="footer__section">
      <h2>Newsletter</h2>
      <InputText placeholder="Email" />
      <Button icon="pi pi-send" label="Subscribe" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores sequi ad, magni possimus eligendi molestiae
        esse tenetur doloribus.
      </p>
    </section>
    <div class="footer__bottom">
      <p>&copy; Copyright 2024</p>
      <p>Powered by Vue 3</p>
    </div>
  </footer>
  <ScrollTop />
  <ScreenLoader v-if="store.screenLoaderIsVisible" />
</template>
<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import ScrollTop from 'primevue/scrolltop';

import DesktopHeader from '@/components/DesktopHeader.vue';
import MobileHeader from '@/components/MobileHeader.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

import { useAppStore } from '@/stores/app';
import { onMounted } from 'vue';
import ScreenLoader from './components/ScreenLoader.vue';

const store = useAppStore();

onMounted(() => {
  store.getAllBikes()
})


</script>
<style scoped>
.main {
  width: 100%;
}

.footer {
  width: 100%;
  min-height: 30vh;
  padding: 10em;
  background-color: var(--main);
  display: flex;
  justify-content: space-between;
  position: relative;
}

.footer .logo {
  color: #fff;
}

.footer__section {
  width: 33%;
  color: #fff;
}

.footer__description {
  width: 80%;
  text-align: justify;
  text-justify: distribute;
  font-size: 0.8em;
}

.footer__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__list-item a {
  text-decoration: none;
  color: white;
}

.footer__list .pi {
  margin-right: 0.5em;
}

.footer__list .router-link-active {
  color: #fff;
  text-decoration: none;
}

.footer__section .p-inputtext,
.footer__section .p-button {
  width: 100%;
  margin-bottom: 0.5em;
}

.footer__bottom {
  position: absolute;
  width: 80%;
  display: flex;
  justify-content: center;
  gap: 1em;
  bottom: 2em;
  left: 10%;
  border-bottom: 1px solid #fff;
  color: #fff;
  font-size: 0.9em;
}

@media screen and (max-width: 414px) and (orientation: portrait) {
  .footer {
    padding: 5em;
    flex-direction: column;
  }

  .footer__section {
    width: 100%;
  }

  .footer__description {
    width: 100%;
  }
}
</style>