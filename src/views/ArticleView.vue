<template>
    <section class="news">
        <article class="news__article">
            <Skeleton v-if="!article" width="1920px" height="600px"></Skeleton>
            <img class="news__img" :src="`https://picsum.photos/seed/${article?.id}/1920/600`" alt="">
            <h1 class="news__title">
                <Skeleton v-if="!article" width="400px" height="50px"></Skeleton>
                {{ article?.headline }}
            </h1>
            <h5 class="news__info">
                <Skeleton v-if="!article" width="100px" height="20px"></Skeleton>
                <FontAwesomeIcon class="news__icon" :icon="faUser" />
                {{ article?.author }}
                <FontAwesomeIcon class="news__icon" :icon="faCalendar" />
                {{ article?.created_at }}
            </h5>
            <Skeleton v-if="!article" width="100%" height="50vh"></Skeleton>
            <p class="news__content" v-for="(content, index) in articleContent" :key="index" v-html="content">
            </p>
        </article>
    </section>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '@/stores/app';
import type { NewsArticle } from '@/types';
import { Skeleton } from 'primevue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faCalendar } from '@fortawesome/free-solid-svg-icons';

const route = useRoute();
const store = useAppStore();

const allNews = ref<NewsArticle[]>([])
const article = ref<NewsArticle>()
const articleContent = ref<string[][]>([])

onMounted(() => {
    document.querySelector('.desktop-header')?.classList.add('desktop-header--scrolled');
    store.getAllNews().then((data) => {
        const articles = data as NewsArticle[]
        allNews.value = articles
    })
})

function formatContent(content: string) {
    const newLines = content.split('\n\n')

    const contentGroups = []
    for (let i = 0; i < newLines.length; i += 3) {
        contentGroups.push(newLines.slice(i, i + 3))
    }

    return contentGroups
}

watch(allNews, () => {
    const id = route.params.id
    article.value = allNews.value.find((article) => article.id === id)
    if (article.value) {
        articleContent.value = formatContent(article.value.content)
    }
})

</script>
<style scoped>
.news {
    width: 70%;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 2em 0;
    position: relative;
    top: 50px;
}

.news__article {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 2em;
}

.news__img {
    width: 100%;
    height: 50vh;
    object-fit: cover;
}

.news__info {
    margin: 0;
    font-style: italic;
    color: #777;
    font-weight: 400;
    display: flex;
    align-items: center;
    line-height: 1;
}

.news__icon {
    margin: 0 0.25em 0 1em;
}

.news__content {
    font-family: 'Open Sans', sans-serif;
}
</style>