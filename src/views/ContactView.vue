<template>
    <section class="contact">
        <section class="left">
            <h2 class="section-title">Contact</h2>
            <p class="contact__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod?</p>
            <section class="contact__form">
                <InputText placeholder="Name" />
                <InputText placeholder="Email" />
                <Textarea rows="5" cols="30" placeholder="Message" />
                <Button icon="pi pi-send" label="Send" class="contact__btn" />
            </section>
        </section>
        <section class="right">
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
                    <li class="contact-card__list-item"><i class="pi pi-map-marker"></i>123 Main Street, City, Country
                    </li>
                    <li class="contact-card__list-item"><i class="pi pi-clock"></i>Mon-Fri 9am-5pm</li>
                </ul>
            </div>
        </section>
    </section>
</template>
<script setup lang="ts">
import { Button, InputText, Textarea } from 'primevue';
import { onMounted } from 'vue';

onMounted(() => {
    document.querySelector('.desktop-header')?.classList.add('desktop-header--scrolled');
})

</script>
<style scoped>
.contact {
    width: 80%;
    margin: auto;
    display: flex;
    align-items: center;
    min-height: 100vh;
    position: relative;
}


.left {
    width: 50%;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1em;
}

.contact__form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin-top: 1em;
}

.contact__form .p-textarea {
    resize: none;
}

.right {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1em;
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

@media screen and (max-width: 414px),
screen and (max-height: 414px) {
    .contact {
        flex-direction: column;
        gap: 1em;
    }

    .left,
    .right {
        width: 100%;
    }

    .right {
        margin-bottom: 1em;
    }
}

@media screen and (max-height: 414px) {
    .left {
        height: fit-content;
    }
}
</style>