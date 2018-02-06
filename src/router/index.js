import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'

import CharacterData from '@/components/character-data/character-data'
import Page from '@/components/page/page'
import Atom from '@/components/animation/atom-animate/atom-animate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/character-data',
          name: 'character-data',
          component: CharacterData
        },
        {
          path: '/page',
          name: 'page',
          component: Page
        },
        {
          path: '/atom-animate',
          name: 'atom',
          component: Atom
        }
      ]
    }

  ]
})
