import {createRouter, createWebHistory} from "vue-router";
import Home from "../views/Home.vue";
import Shop from "../views/Shop.vue";
import About from "../views/About.vue";
    import ProductSection from "../subview/ProductSection.vue";

const routes=[
    {path:'/',component:Home,name:'home'},
    {path:'/about',component:About,name: 'about'},
    {path:'/shop',component:Shop,name:'shop',
     children:[

         {path:'detail',component:ProductSection}
     ]
    },
]

const router=createRouter(
    {
        routes,
        history:createWebHistory()
    }
)

export {routes,router}