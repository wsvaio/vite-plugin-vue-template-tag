import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import templateTag from "../src"

export default defineConfig({
  plugins: [
    vue(),
    templateTag()
  ],
});
