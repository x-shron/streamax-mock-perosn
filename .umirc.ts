import { defineConfig } from "umi";
import routes from "./src/routes";


export default defineConfig({
  routes: [
    ...routes,
    { path: "/*", exact: true, component: '@/pages/404'},
  ],
  alias: {
    "@": "/src",
  },
  hash: true,
  npmClient: 'yarn',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputPath: 'docs',
});
