<template>
  <section class="home">
    <section class="home__carousel">
      <Carousel :value="carouselValues" :numVisible="1" :numScroll="1" :showNavigators="false">
        <template #item="slotProps">
          <div class="home__carousel-container">
            <img v-if="carouselValues.length !== 0" class="home__carousel-img"
              :src="`${slotProps.data.image}${slotProps.data.id}`" :alt="slotProps.data.bikeName">

            <Skeleton width="1920px" height="1080px" v-else></Skeleton>

            <div class="home__carousel-info">
              <h2 class="home__carousel-title">{{ slotProps.data.bikeName.toUpperCase() }}</h2>
              <p class="home__carousel-desc">{{ slotProps.data.bikeSlogan }}</p>
            </div>
          </div>
        </template>
      </Carousel>
    </section>

    <h2 class="section-title">Offers</h2>

    <section class="home__products">
      <section class="brands">
        <div class="brand" :class="brand === brandFilter ? 'brand--active' : ''"
          v-for="(brand, index) in discountedBikesBrand" :key="index" @click="filterByBrand(brand)">
          {{ brand }}
          <div class="brand__background"></div>
        </div>
      </section>
      <section class="home__products-container">
        <BikeCard :bike="bike" v-for="bike in displayedDiscountedBikes" :key="bike.id" />
      </section>
    </section>

    <h2 class="section-title">Latest News</h2>

    <section class="home__news">
      <section class="home__news-container">
        <NewsArticleCard v-for="article in newsArticles" :key="article.id" :article="article" />
      </section>
    </section>

    <h2 class="section-title">Contact</h2>

    <section class="home__contact">
      <div class="contact-card contact-card--facebook">
        <i class="pi pi-facebook"></i>
        <Button label="Follow us on Facebook" variant="text" class="contact-card__btn" />
      </div>
      <div class="contact-card contact-card--instagram">
        <i class="pi pi-instagram"></i>
        <Button label="Follow us on Instagram" variant="text" class="contact-card__btn" />
      </div>
      <div class="contact-card contact-card--twitter">
        <i class="pi pi-twitter"></i>
        <Button label="Follow us on Twitter" variant="text" class="contact-card__btn" />
      </div>

      <div class="contact-card contact-card--info">

        <ul class="contact-card__list">
          <li class="contact-card__list-item"><i class="pi pi-envelope"></i>bikes@demo.com</li>
          <li class="contact-card__list-item"><i class="pi pi-phone"></i>+1 123 456 789</li>
          <li class="contact-card__list-item"><i class="pi pi-map-marker"></i>123 Main Street, City, Country</li>
          <li class="contact-card__list-item"><i class="pi pi-clock"></i>Mon-Fri 9am-5pm</li>
        </ul>
      </div>
    </section>
  </section>
</template>
<script setup lang="ts">
import Carousel from 'primevue/carousel';
import Skeleton from 'primevue/skeleton';
import type { Bike, NewsArticle } from '@/types/index';
import BikeCard from '@/components/BikeCard.vue';
import NewsArticleCard from '@/components/NewsArticleCard.vue';
import Button from 'primevue/button';

import { computed, onMounted, ref } from 'vue';
import { useEventListener } from '@vueuse/core';

import { useAppStore } from '@/stores/app';
import { flattenBikes } from '@/utlis';


const store = useAppStore();

useEventListener(window, 'scroll', () => {
  if (window.scrollY > 0) {
    document.querySelector('.desktop-header')?.classList.add('desktop-header--scrolled');
    console.log('scrolled');
  } else {
    document.querySelector('.desktop-header')?.classList.remove('desktop-header--scrolled');
  }
})

const brandFilter = ref('first')
const displayedDiscountedBikes = computed(() => {
  return discountedBikes.value.filter((bike) => bike.brand === brandFilter.value)
})

const carouselValues = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bikeName: 'JUSTO PELLENTESQUE',
    bikeSlogan: 'eleifend luctus ultricies eu nibh quisque id justo sit amet sapien dignissim vestibulum vestibulum'
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bikeName: 'TELLUS IN SAGITTIS',
    bikeSlogan: 'placerat ante nulla justo aliquam quis turpis eget elit sodales'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1558979159-2b18a4070a87?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bikeName: 'NON',
    bikeSlogan: 'morbi ut odio cras mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem'
  }
]

const allBikes = computed(() => {
  return flattenBikes(store.allBikes)
})

const discountedBikes = computed(() => {
  return getDiscountedBikes()
})

const newsArticles = ref<NewsArticle[]>([])

const discountedBikesBrand = computed(() => {
  const discountedBikes = getDiscountedBikes()
  return [... new Set(discountedBikes.map((bike) => bike.brand))]
})

onMounted(() => {
  store.getAllNews()
    .then((data) => {
      const articles = data as NewsArticle[]
      const currentDate = new Date()

      articles.slice(0, 4).filter((article) => {
        if (new Date(article.created_at) < currentDate) {
          newsArticles.value.push(article)
        }
      })
    })

  newsArticles.value.sort((articleA, articleB) => {
    const dateA = new Date(articleA.created_at)
    const dateB = new Date(articleB.created_at)

    return (
      dateB.getFullYear() * 10000 +
      dateB.getMonth() * 100 +
      dateB.getDate()
    ) - (
        dateA.getFullYear() * 10000 +
        dateA.getMonth() * 100 +
        dateA.getDate()
      )
  })

  document.querySelector('.desktop-header')?.classList.remove('desktop-header--scrolled');
})

function filterByBrand(brand: string) {
  brandFilter.value = brand
}

function getDiscountedBikes(): Bike[] {
  const discountedBikes = [] as Bike[]
  allBikes.value.forEach((bike) => {
    if (bike.oldPrice) {
      const discount = Math.abs(Math.round(((bike.oldPrice - bike.price) / bike.oldPrice) * 100)).toFixed(0)
      if (discount >= '80') {
        discountedBikes.push(bike)
      }
    }
  })

  return discountedBikes
}

</script>
<style scoped>
.home__carousel {
  width: 100%;
  height: 100vh;
  position: relative;
}

.home__carousel-img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  opacity: 0.75;
  position: absolute;
}

.home__carousel-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  background-color: #000;
}


.home__carousel-info {
  width: 40%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;
  color: #fff;
  z-index: 1;
}

.home__carousel-title {
  font-size: 4em;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-bottom: 4px solid var(--secondary);
  margin: 0.25em 0;
}

.home__carousel-desc {
  font-size: 1em;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.home__products {
  width: 80%;
  margin: 0 auto;
}

.home__products-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
  margin: 2em 0;
}

.home__products .brands {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1em;
  margin: 2em 0;
}

.home__products .brand {
  padding: 0.5em 1em;
  text-transform: uppercase;
  position: relative;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  top: 2px;
}

.brand__background {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: var(--main);
  z-index: -1;
  clip-path: polygon(90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%, 0% 0%);
}

.brand--active {
  color: var(--secondary);
  filter: drop-shadow(2px 2px 0px var(--secondary));
  top: 0 !important;
}

.home__news {
  width: 100%;
  margin: 2em 0;
}

.home__news-container {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
}

.home__contact {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1em;
  margin-bottom: 2em;
}

.contact-card {
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;
  color: #fff;
  padding: 1em;
  cursor: pointer;
}

.contact-card--facebook {
  background-color: #1877f2;
}

.contact-card--instagram {
  background-color: #fd1d1d;
}

.contact-card--twitter {
  background-color: #1da1f2;
}

.contact-card--info {
  background-color: var(--main);
}

.contact-card .pi {
  font-size: 5em;
}

.contact-card--info .pi {
  font-size: 1.5em;
}

.contact-card__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.contact-card__list-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
}

.contact-card__btn {
  width: fit-content;
  color: #fff;
  border-radius: 0;
  border: 1px solid #fff;
  margin-top: 1em;
}

@media screen and (max-width: 414px) {
  .home__carousel-title {
    font-size: 2em;
  }

  .home__carousel-desc {
    font-size: 0.75em;
  }
}
</style>