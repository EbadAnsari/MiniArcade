import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@ui": resolve(__dirname, "./src/components/ui"),
			"@icon": resolve(__dirname, "./src/components/icon"),
			"@interfaces": resolve(__dirname, "./src/interfaces"),
			"@components": resolve(__dirname, "./src/components"),
			"@routes": resolve(__dirname, "./src/routes"),
			"@util": resolve(__dirname, "./src/util"),
			"@class": resolve(__dirname, "./src/class"),
			"@context": resolve(__dirname, "./src/context"),
			"@hook": resolve(__dirname, "./src/hook"),
		},
	},
	preview: { open: true },
	server: {
		open: "/online?asdfasdf=der",
	},
});
