import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://doraemon.tokyo',
  outDir: './dist',
  integrations: [sitemap({
    // 下書き、練習用記事、および /other/ フォルダ内のページをサイトマップから除外
    filter: (page) => !page.includes('/activities/practice-') && !page.includes('/other/')
  })],
});
