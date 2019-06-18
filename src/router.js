import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
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
          /* 維護角色 */
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
          /* 維護 ICD 10 */
          name: 'ICD10',
          path: 'icd/maintain',
          component: () => import('./components/system/icd/Maintain.vue'),
        },
        {
          /* 新增 & 刪除 ICD 10 */
          name: 'ICD10Create',
          path: 'icd/create',
          component: () => import('./components/system/icd/Create.vue'),
        },
        {
          /* 編輯 ICD 10 */
          name: 'ICD10Edit',
          path: 'icd/edit',
          component: () => import('./components/system/icd/Edit.vue'),
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
