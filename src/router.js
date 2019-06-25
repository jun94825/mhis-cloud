import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      /* 登入 */
      name: 'Login',
      path: '/',
      component: () => import('./views/Login.vue'),
    },
    {
      /* 註冊 */
      name: 'Register',
      path: '/register',
      component: () => import('./views/Register.vue'),
    },
    {
      /* 註冊成功 */
      name: 'Success',
      path: '/success',
      component: () => import('./views/Success.vue'),
      beforeEnter: (to, from, next) => {
        if (from.path === '/register' && to.query.key) {
          next();
        } else {
          next({ name: '登入' });
        }
      },
    },
    {
      /* 系統 */
      name: 'System',
      path: '/system',
      component: () => import('./views/System.vue'),
      children: [
        {
          /* Role */
          name: 'RoleManagement',
          path: 'role/maintain',
          component: () => import('./components/system/role/Maintain.vue'),
        },
        {
          name: 'RoleCreate',
          path: 'role/create',
          component: () => import('./components/system/role/Create.vue'),
        },
        {
          name: 'RoleEdit',
          path: 'role/edit',
          component: () => import('./components/system/role/Edit.vue'),
        },
        {
          /* Room */
          name: 'Room',
          path: 'room/maintain',
          component: () => import('./components/system/room/Maintain.vue'),
        },
        {
          name: 'RoomCreate',
          path: 'room/create',
          component: () => import('./components/system/room/Create.vue'),
        },
        {
          name: 'RoomEdit',
          path: 'room/edit',
          component: () => import('./components/system/room/Edit.vue'),
        },
        {
          /* Category */
          name: 'Category',
          path: 'category/maintain',
          component: () => import('./components/system/category/Maintain.vue'),
        },
        {
          name: 'CategoryCreate',
          path: 'category/create',
          component: () => import('./components/system/category/Create.vue'),
        },
        {
          name: 'CategoryEdit',
          path: 'category/edit',
          component: () => import('./components/system/category/Edit.vue'),
        },
        {
          /* ICD10 */
          name: 'ICD10',
          path: 'icd/maintain',
          component: () => import('./components/system/icd/Maintain.vue'),
        },
        {
          name: 'ICD10Create',
          path: 'icd/create',
          component: () => import('./components/system/icd/Create.vue'),
        },
        {
          name: 'ICD10Edit',
          path: 'icd/edit',
          component: () => import('./components/system/icd/Edit.vue'),
        },
        {
          /* Setting */
          name: 'Setting',
          path: 'setting',
          component: () => import('./components/system/Setting.vue'),
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
