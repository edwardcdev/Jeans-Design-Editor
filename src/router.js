import Vue from 'vue'
import Router from 'vue-router'
import LanderPage from '@/views/LanderPage.vue'
import CreationPage from '@/views/CreationPage.vue'
import JeansSelector from '@/components/JeansSelector'
import CanvasContainer from '@/components/CanvasContainer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'lander',
      component: LanderPage
    },
    {
      path: '/create',
      name: 'create',
      component: CreationPage,
      children: [{
          path: '0',
          meta: {
            step: 1,
            desc: "Choose Your Type Of Jeans"
          },
          component: JeansSelector
        },
        {
          path: '1',
          meta: {
            step: 2,
            desc: "Create Design"
          },
          component: CanvasContainer
        }
      ]
    }
  ]
})