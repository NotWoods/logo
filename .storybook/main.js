/** @type {import('@storybook/sveltekit').StorybookConfig} */
const config = {
	stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx|svelte)'],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-svelte-csf'
	],
	framework: '@storybook/sveltekit',
	docs: {
		autodocs: true
	}
};
export default config;
