import { error } from '@sveltejs/kit';
import { optimize } from 'svgo';
import Logo from '../../lib/Logo.svelte';
import { LOGO_PRESETS } from './presets.js';

export const prerender = true;

/** @type {import('./$types.js').EntryGenerator} */
export function entries() {
	return Object.keys(LOGO_PRESETS).map((file) => ({ file }));
}

/** @type {import('./$types.js').RequestHandler} */
export function GET({ params }) {
	const args = LOGO_PRESETS[params.file];
	if (!args) {
		error(404, 'Not found');
	}

	// @ts-ignore
	const { html, css } = Logo.render(args);

	const svg = html.replace('</svg>', `<style>${css.code}</style></svg>`);
	const optimized = optimize(svg, {
		path: `${params.file}.svg`
	});

	return new Response(optimized.data, {
		headers: {
			'Content-Type': 'image/svg+xml'
		}
	});
}
