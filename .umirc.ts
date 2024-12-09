import { defineConfig } from "umi";
import routes from "./src/routes";


export default defineConfig({
  routes: [
    ...routes,
    // { path: "/*", component: "404" },
  ],
  alias: {
    "@": "/src",
  },
  npmClient: 'yarn',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputPath: 'docs',
});
