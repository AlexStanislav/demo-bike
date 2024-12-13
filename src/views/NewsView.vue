<template>
    <section class="news">
        <header class="news__header">
            <label for="author">
                Sort by author:
                <Select v-model="authorFilter" :options="['Ascending', 'Descending']" />
            </label>
            <label for="date">
                Sort by date:
                <Select v-model="dateFilter" :options="['Ascending', 'Descending']" />
            </label>
            <label for="title">
                Sort by title:
                <Select v-model="titleFilter" :options="['Ascending', 'Descending']" />
            </label>
        </header>
        <section class="news__content">
            <NewsArticleCard v-for="article in allNews" :key="article.id" :article="article" />
        </section>
    </section>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Select from 'primevue/select';
import { useAppStore } from '@/stores/app';
import type { NewsArticle } from '@/types';
import NewsArticleCard from '@/components/NewsArticleCard.vue';

const store = useAppStore();
const allNews = ref<NewsArticle[]>([])
const authorFilter = ref<string>('Ascending');
const dateFilter = ref<string>('Ascending');
const titleFilter = ref<string>('Ascending');

onMounted(() => {
    document.querySelector('.desktop-header')?.classList.add('desktop-header--scrolled');
    store.getAllNews().then((data) => {
        const articles = data as NewsArticle[]
        allNews.value = articles
    })
})


watch([authorFilter], () => {
    const sortedArticles = allNews.value.sort((a, b) => {
        if (authorFilter.value === 'Ascending') {
            return a.author.localeCompare(b.author)
        } else if (authorFilter.value === 'Descending') {
            return b.author.localeCompare(a.author)
        }
        return 0
    })
    allNews.value = sortedArticles
})

watch([dateFilter], () => {
    const sortedArticles = allNews.value.sort((a, b) => {
        if (dateFilter.value === 'Ascending') {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        } else if (dateFilter.value === 'Descending') {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        }
        return 0
    })
    allNews.value = sortedArticles
})

watch([titleFilter], () => {
    const sortedArticles = allNews.value.sort((a, b) => {
        if (titleFilter.value === 'Ascending') {
            return a.headline.localeCompare(b.headline)
        } else if (titleFilter.value === 'Descending') {
            return b.headline.localeCompare(a.headline)
        }
        return 0
    })
    allNews.value = sortedArticles
})

</script>
<style scoped>
.news {
    width: 80%;
    min-height: 100vh;
    position: relative;
    top: 50px;
    margin: auto;
    padding: 2em 0;
}

.news__header {
    width: 100%;
    height: 50px;
    background-color: var(--main);
    display: flex;
    align-items: center;
    padding: 0 1em;
    color: #fff;
}

.news__header .p-select {
    border-radius: 5px;
    border: none;
    outline: none;
    padding: 0 1em;
    color: #fff;
    background-color: transparent;
}

.news__content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1em;
    padding: 2em 0;
}

@media screen and (max-width: 414px) {
    .news {
        width: 90%;
    }

    .news__header {
        flex-direction: column;
        gap: 1em;
        height: fit-content;
        align-items: center;
    }
}
</style>