import { error } from '@sveltejs/kit';
import { render } from 'svelte/server';
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

	const { html, head } = render(Logo, args);

	const svg = html.replace('</svg>', `${head}</svg>`);
	const optimized = optimize(svg, {
		path: `${params.file}.svg`
	});

	return new Response(optimized.data, {
		headers: {
			'Content-Type': 'image/svg+xml'
		}
	});
}
