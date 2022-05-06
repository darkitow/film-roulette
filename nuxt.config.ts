// @ts-nocheck
import { defineNuxtConfig } from "nuxt";
import dsv from "@rollup/plugin-dsv";

export default defineNuxtConfig({
  target: 'static',
  modules: ["@nuxtjs/tailwindcss"],
  css: ["@/assets/css/main.css"],
  vite: {
    plugins: [dsv()],
  },
  ssr: false,
});
