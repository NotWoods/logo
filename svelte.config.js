import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		css: 'injected'
	},
	kit: {
		adapter: adapter({
			pages: 'svg'
		})
	}
};

export default config;
