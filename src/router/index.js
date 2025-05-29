import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import IssuesView from '@/views/IssuesView.vue'
import IssueView from '@/views/IssueView.vue'
import ArticleView from '@/views/ArticleView.vue'
import AuthorsView from '@/views/AuthorsView.vue'
import AuthorView from '@/views/AuthorView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/issues',
            name: 'issues',
            component: IssuesView
        },
        {
            path: '/issues/:issueId',
            name: 'issue',
            component: IssueView,
            props: true
        },
        {
            path: '/issues/:issueId/article/:articleId',
            name: 'article',
            component: ArticleView,
            props: true
        },
        {
            path: '/authors',
            name: 'authors',
            component: AuthorsView
        },
        {
            path: '/authors/:authorId',
            name: 'author',
            component: AuthorView,
            props: true
        }
    ]
});

export default router