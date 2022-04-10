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
  ],
  fastRefresh: {},
});
