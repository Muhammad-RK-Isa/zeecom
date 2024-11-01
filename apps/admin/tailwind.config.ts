import type { Config } from 'tailwindcss'
import svgToDataUri from "mini-svg-data-uri"
import "tailwindcss/colors";

import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"

import base from '@zeecom/tailwind-config/web'

export default {
	darkMode: ["class"],
	content: [...base.content],
	presets: [base],
	theme: {
		extend: {
			typography: () => ({
				DEFAULT: {
					css: {
						maxWidth: "100ch",
					},
				},
			}),
			fontFamily: {
				poppins: ["Poppins", "sans-serif"]
			},
		}
	},
	plugins: [
		...base.plugins,
		generateBackgrounds,
		addVariablesForColors,
	]
} satisfies Config

function generateBackgrounds({ matchUtilities, theme }: any) {
	matchUtilities(
		{
			"bg-grid": (value: any) => ({
				backgroundImage: `url("${svgToDataUri(
					`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
				)}")`,
			}),
			"bg-grid-small": (value: any) => ({
				backgroundImage: `url("${svgToDataUri(
					`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
				)}")`,
			}),
			"bg-dot": (value: any) => ({
				backgroundImage: `url("${svgToDataUri(
					`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
				)}")`,
			}),
		},
		{ values: flattenColorPalette(theme("backgroundColor")), type: "color" }
	);
}

function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
		Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
		":root": newVars,
	});
}