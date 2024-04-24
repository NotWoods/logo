<script context="module">
	import Logo from '../lib/Logo.svelte';

	/** @type {import('@storybook/svelte').Meta<Logo>} */
	export const meta = {
		component: Logo,
		args: {
			monochrome: false,
			height: 32,
			animationOn: 'mount'
		},
		argTypes: {
			color: {
				control: 'color'
			},
			animationOn: {
				control: 'radio',
				options: ['mount', 'hover', 'none']
			}
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<div class:anim--hover={args.animationOn === 'hover'}>
		<Logo {...args} />
	</div>
</Template>

<Story name="Full Color" args={{ monochrome: false }} />
<Story name="Monochrome" args={{ monochrome: true }} />
<Story name="Tinted" args={{ monochrome: true, color: 'red' }} />
<Story
	name="Dark"
	args={{ monochrome: false, color: 'white' }}
	parameters={{ backgrounds: { default: 'dark' } }}
/>
<Story
	name="Dark Monochrome"
	args={{ monochrome: true, color: 'white' }}
	parameters={{ backgrounds: { default: 'dark' } }}
/>
<Story name="Animate on hover" args={{ animationOn: 'hover' }} />
<Story name="No Animation" args={{ animationOn: 'none' }} />

<style>
	.anim--hover:hover {
		--logo-animation-progress: 1;
	}
</style>
