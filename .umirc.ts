import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/',
      component: '@/pages/dashboard',
      exact: true,
      title: '首页',
    },
  ],
  fastRefresh: {},
});
