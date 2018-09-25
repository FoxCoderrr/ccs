import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/entry'
import ShenGou from '@/pages/shengou'
import Mine from '@/pages/mine'
import TuiGuang from '@/pages/tuiguang'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'entry',
      components: {
        main:Login
      }
    },
    {
      path: '/shengou',
      name: 'shengou',
      components: {
        main:ShenGou
      }
    },
    {
      path: '/mine',
      name: 'mine',
      components: {
        main:Mine
      }
    },
    {
      path: '/tuiguang',
      name: 'tuiguang',
      components: {
        main:TuiGuang
      }
    }
  ]
})
