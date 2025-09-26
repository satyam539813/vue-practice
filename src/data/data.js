import { ref } from 'vue';
const profile = ref({
    titleLine1: 'Full Stack',
    titleLine2: 'Developer',
    passion: 'Passionate about',
    description: 'Developing scalable Production-ready apps with a frontend in Vue and backend in Gin and Golang.',
    imageSrc: '/1.jpg',
});

const socialLinks = ref([
    {
        name: 'Instagram',
        url: 'https://instagram.com/your_username',
        iconClass: 'pi pi-instagram',
    },
    {
        name: 'Facebook',
        url: 'https://facebook.com/your_username',
        iconClass: 'pi pi-facebook',
    },
    {
        name: 'GitHub',
        url: 'https://github.com/your_username',
        iconClass: 'pi pi-github',
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com/your_username',
        iconClass: 'pi pi-twitter',
    },
]);

export { profile, socialLinks };