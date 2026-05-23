import { createRouter, createWebHistory } from 'vue-router'

import OverlayView from './views/OverlayView.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:channel',
      component: OverlayView,
    },
  ],
})
