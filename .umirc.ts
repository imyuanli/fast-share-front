import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/dashboard',
      exact: true,
      title: '首页',
    },
    { path: '/login',
      component: '@/pages/login',
      exact: true,
      title: '登录',
    },
    { path: '/user',
      component: '@/pages/user',
      exact: true,
      title: '个人中心',
    },
    {
      path: '/:id',
      component: '@/pages/dashboard/[id]',
      exact: true,
      title: '首页',
    },
  ],
  fastRefresh: {},
});
