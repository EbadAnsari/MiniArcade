/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{js,ts,jsx,tsx,html,css}", "./index.html"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"arsenic-100": "#AFC5D2",
				"arsenic-200": "#80A6AF",
				"arsenic-400": "#3B556E",
				"arsenic-800": "#33444E",
				"arsenic-950": "#1F363E",
				o: "#F1A513",
				x: "#1FC9EA",
				"o-shadow": "#D9720E",
				"x-shadow": "#20A8BB",
				"x-dimed": "#467A85",
				"o-dimed": "#877249",
			},
			screens: {
				xs: "520px",
			},
			height: {
				"d-screen": "100dvh",
			},
			width: {
				"d-screen": "100dvw",
			},
		},
	},
	plugins: [],
};
