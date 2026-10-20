import { appendFile } from "node:fs/promises";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv, type Plugin } from "vite";

/**
 * SEO entries that require an absolute URL (canonical, og:url, sitemap) are only
 * emitted when SITE_URL is defined, so no placeholder domain is ever published.
 */
function siteUrlMetadata(siteUrl: string): Plugin {
  let outDir = "dist";
  return {
    name: "site-url-metadata",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    transformIndexHtml() {
      return [
        { tag: "link", attrs: { rel: "canonical", href: `${siteUrl}/` }, injectTo: "head" },
        { tag: "meta", attrs: { property: "og:url", content: `${siteUrl}/` }, injectTo: "head" },
      ];
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </url>
</urlset>
`,
      });
    },
    async writeBundle() {
      await appendFile(path.join(outDir, "robots.txt"), `\nSitemap: ${siteUrl}/sitemap.xml\n`);
    },
  };
}

export default defineConfig(({ mode }) => {
  const siteUrl = loadEnv(mode, process.cwd(), "").SITE_URL?.trim().replace(/\/+$/, "");

  return {
    plugins: [react(), tailwindcss(), ...(siteUrl ? [siteUrlMetadata(siteUrl)] : [])],
    resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
    server: { watch: { ignored: ["**/referencia/**", "**/design/**"] } },
    optimizeDeps: { entries: ["index.html"] },
  };
});
