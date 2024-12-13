<template>
    <article class="news-article">
        <img class="news-article__img" :src="`https://picsum.photos/seed/${article.id}/400/200`">
        <h2 class="news-article__title">{{ article.headline }}</h2>
        <ul class="news-article__info">
            <li>
                <FontAwesomeIcon class="news-article__icon" :icon="faUser" /><i>{{ article.author }}</i>
            </li>
            <li>
                <FontAwesomeIcon class="news-article__icon" :icon="faCalendar" />
                <i>{{ article.created_at }}</i>
            </li>
        </ul>
        <p> {{ article.content.substring(0, 200) }}...</p>
        <Button class="news-article__btn" icon="pi pi-arrow-right" label="Read more" @click="goToArticle()" />
    </article>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import router from '../router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faCalendar } from '@fortawesome/free-solid-svg-icons';
const goToArticle = () => {
    router.push({ name: 'article', params: { id: props.article.id } })
}

const props = defineProps({
    article: {
        type: Object,
        required: true
    }
})

</script>
<style scoped>
.news-article {
    width: 400px;
    padding: 1em;
}

.news-article__title {
    width: 100%;
    text-transform: capitalize;
}

.news-article__info {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75em;
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 0.8em;
    color: #666;
}

.news-article__icon {
    margin-right: 0.5em;
    color: #666;
}

.news-article__btn {
    background-color: var(--main);
    border: 1px solid var(--main);
}

@media screen and (max-width: 414px) {
    .news-article__img {
        width: 300px;
    }
}
</style>