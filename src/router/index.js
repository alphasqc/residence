import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@views/HomeView.vue'
import LoginView from '@views/login/LoginView.vue'
import RegistView from '@views/login/RegistView.vue'

import SearchView from '@views/search/SearchView.vue'
import SearchBlog from '@views/search/SearchBlog.vue'
import SearchTea from '@views/search/SearchTea.vue'
import SearchUser from '@views/search/SearchUser.vue'

import PersonshowView from '@views/user/PersonshowView.vue'
import PersonsettingView from '@views/user/PersonsettingView.vue'
import NoteComponent from '@components/userCenter/NoteComponent.vue'
import LikeComponent from '@components/userCenter/LikeComponent.vue'
import StarComponent from '@components/userCenter/StarComponent.vue'
import WriterComponent from '@components/userCenter/WriterComponent.vue'

import PrimaryView from '@views/primary/PrimaryView.vue'
import SynthesisView from '@views/primary/SynthesisView.vue'
import FocusView from '@views/primary/FocusView.vue'
import FrontView from '@views/primary/FrontView.vue'
import BackendView from '@views/primary/BackendView.vue'
import TestView from '@views/primary/TestView.vue'
import UiView from '@views/primary/UiView.vue'

import TearoomView from '@views/tearoom/TearoomView.vue'

import ResidenceView from '@views/residence/ResidenceView.vue'

import BlogwriteView from '@views/write/BlogwriteView.vue'

import BlogDetail from '@views/blog/BlogDetail.vue'

import LoadingComponent from '@components/LoadingComponent.vue'

import AdminView from '@admin/AdminView.vue'

import UserComponent from '@admin/main/UserComponent.vue'
import BlogComponent from '@admin/main/BlogComponent.vue'
import TeaComponent from '@admin/main/TeaComponent.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        meta: {
            title: "初始"
        },
        redirect: '/primary',
        component: HomeView,
        children: [
            {
                path: '/primary',
                name: 'primary',
                meta: {
                    title: '首页'
                },
                redirect: '/synthesis',
                component: PrimaryView,
                children: [
                    {
                        path: '/synthesis',
                        name: 'synthesis',
                        meta: {
                            title: '综合页'
                        },
                        component: SynthesisView
                    },
                    {
                        path: '/focus',
                        name: 'focus',
                        meta: {
                            title: '关注页'
                        },
                        component: FocusView
                    },
                    {
                        path: '/front',
                        name: 'front',
                        meta: {
                            title: '前端页'
                        },
                        component: FrontView
                    },
                    {
                        path: '/backend',
                        name: 'backend',
                        meta: {
                            title: '后端页'
                        },
                        component: BackendView
                    },
                    {
                        path: '/test',
                        name: 'test',
                        meta: {
                            title: '测试页'
                        },
                        component: TestView
                    },
                    {
                        path: '/ui',
                        name: 'ui',
                        meta: {
                            title: 'UI页'
                        },
                        component: UiView
                    },
                ]
            },
            {
                path: '/blogdetail',
                name: 'blogdetail',
                meta: {
                    title: '文章详情页'
                },
                component: BlogDetail
            },
            {
                path: '/tearoom',
                name: 'tearoom',
                meta: {
                    title: '茶室'
                },
                component: TearoomView
            },
            {
                path: '/residence',
                name: 'residence',
                meta: {
                    title: '居所'
                },
                component: ResidenceView
            },
            {
                path: '/personshow',
                name: 'personshow',
                redirect: '/writer',
                meta: {
                    title: '用户页'
                },
                component: PersonshowView,
                children: [
                    {
                        path: '/note',
                        name: 'note',
                        meta: {
                            title: '笔记模块'
                        },
                        component: NoteComponent
                    },
                    {
                        path: '/writer',
                        name: 'writer',
                        meta: {
                            title: '发表模块'
                        },
                        component: WriterComponent
                    },
                    {
                        path: '/star',
                        name: 'star',
                        meta: {
                            title: '收藏模块'
                        },
                        component: StarComponent
                    },
                    {
                        path: '/like',
                        name: 'like',
                        meta: {
                            title: '点赞模块'
                        },
                        component: LikeComponent
                    }
                ]
            },
            {
                path: '/loading',
                name: 'loading',
                meta: {
                    title: '中转页'
                },
                component: LoadingComponent
            },
            {
                path: '/personsetting',
                name: 'personsetting',
                meta: {
                    title: '设置页'
                },
                component: PersonsettingView
            },
            {
                path: '/search',
                name: 'search',
                meta: {
                    title: '搜索内容页'
                },
                redirect: '/searchblog',
                component: SearchView,
                children: [
                    {
                        path: '/searchblog',
                        name: 'searchblog',
                        meta: {
                            title: '搜索文章模块'
                        },
                        component: SearchBlog
                    },
                    {
                        path: '/searchtea',
                        name: 'searchtea',
                        meta: {
                            title: '搜索讨论模块'
                        },
                        component: SearchTea
                    },
                    {
                        path: '/searchuser',
                        name: 'searchuser',
                        meta: {
                            title: '搜索用户模块'
                        },
                        component: SearchUser
                    }
                ]
            }
        ]
    },
    {
        path: '/admin',
        name: 'admin',
        meta: {
            title: '管理台'
        },
        component: AdminView,
        redirect: 'user',
        children: [
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '用户管理'
                },
                component: UserComponent
            },
            {
                path: '/blog',
                name: 'blog',
                meta: {
                    title: '文章管理'
                },
                component: BlogComponent
            },
            {
                path: '/tea',
                name: 'tea',
                meta: {
                    title: '讨论管理'
                },
                component: TeaComponent
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录页'
        },
        component: LoginView
    },
    {
        path: '/regist',
        name: 'regist',
        meta: {
            title: '注册页'
        },
        component: RegistView
    },
    {
        path: '/blogwrite',
        name: 'blogwrite',
        meta: {
            title: '文章撰写页'
        },
        component: BlogwriteView
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
