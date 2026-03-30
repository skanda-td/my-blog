import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://skanda-td.github.io',
  base: '/my-blog',                      

  integrations: [react()],

  devToolbar: {
    enabled: false
  }
});