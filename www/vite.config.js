import { defineConfig } from 'vite'

const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return html.replace(
        /WEBSITE_BASE_PATH/g,
        process.env.WEBSITE_BASE_PATH || "http://localhost:3000",
      )
    },
  }
}

export default defineConfig({
  build: {
    minify: false // temporary, wasm-bindgen js bindings must not be mangled
  },
    preview: {
        https: true
    },
  plugins: [htmlPlugin()]
})
