<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Logo from '../lib/Logo.svelte';

	const { Story } = defineMeta({
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
	});
</script>

{#snippet template(args)}
	<div class:anim--hover={args.animationOn === 'hover'}>
		<Logo {...args} />
	</div>
{/snippet}

<Story name="Full Color" args={{ monochrome: false }} children={template} />
<Story name="Monochrome" args={{ monochrome: true }} children={template} />
<Story name="Tinted" args={{ monochrome: true, color: 'red' }} children={template} />
<Story
	name="Dark"
	args={{ monochrome: false, color: 'white' }}
	parameters={{ backgrounds: { default: 'dark' } }}
	children={template}
/>
<Story
	name="Dark Monochrome"
	args={{ monochrome: true, color: 'white' }}
	parameters={{ backgrounds: { default: 'dark' } }}
	children={template}
/>
<Story name="Animate on hover" args={{ animationOn: 'hover' }} children={template} />
<Story name="No Animation" args={{ animationOn: 'none' }} children={template} />

<style>
	.anim--hover:hover {
		--logo-animation-progress: 1;
	}
</style>
