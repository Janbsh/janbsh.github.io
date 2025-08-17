import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
// Set base to repo name for GitHub Pages
export default defineConfig({
  base: '/frontend-test/',
  plugins: [svelte()],
});
