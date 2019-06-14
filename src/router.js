import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: '登入',
      path: '/',
      component: () => import('./views/Login.vue'),
    },
    {
      name: '註冊',
      path: '/register',
      component: () => import('./views/Register.vue'),
    },
    {
      name: '註冊成功',
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
          /* 角色維護 */
          name: 'RoleManagement',
          path: 'role/maintain',
          component: () => import('./components/system/role/Maintain.vue'),
        },
        {
          /* 新增角色 */
          name: 'RoleCreate',
          path: 'role/create',
          component: () => import('./components/system/role/Create.vue'),
        },
        {
          /* 編輯角色 */
          name: 'RoleEdit',
          path: 'role/edit',
          component: () => import('./components/system/role/Edit.vue'),
        },
        {
          /* 系統設定 */
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
