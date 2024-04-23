<script>
	import Face from './Face.svelte';

	/**
	 * @typedef {object} AnimatedText
	 * @property {number} opacity
	 * @property {(index: number) => number} delay
	 * @property {boolean} [animated]
	 */

	/**
	 * @param {'mount' | 'hover' | 'none'} type
	 * @returns {AnimatedText[]}
	 */
	function getAnimatedText(type) {
		switch (type) {
			case 'mount':
				return [
					{ opacity: 0.5, delay: (i) => 300 + 300 * i },
					{ opacity: 1, delay: (i) => 500 + 300 * i }
				];
			case 'hover':
				return [
					{ opacity: 0.7, delay: () => 0, animated: false },
					{ opacity: 1, delay: () => 0 }
				];
			case 'none':
				return [{ opacity: 1, delay: () => 0, animated: false }];
		}
	}

	export let height = 32;
	$: width = height * 5;

	export let monochrome = false;
	export let color = '';
	$: defaultColor = monochrome ? 'currentColor' : '#032030';

	/**
	 * @type {'mount' | 'hover' | 'none'}
	 */
	export let animationOn = 'mount';
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class="logo"
	class:animated__hover={animationOn === 'hover'}
	{width}
	{height}
	viewBox="0 0 80 16"
	style="color:{color || defaultColor}"
>
	<title>Tiger Oakes</title>

	{#if animationOn === 'hover'}
		<g class="face animated">
			<Face monochrome={true} />
		</g>
		<g class="face animated">
			<Face monochrome={false} />
		</g>
	{:else}
		<Face {monochrome} animateEyes={animationOn === 'mount'} />
	{/if}

	<!--Clip path for the gap between the dot and line in the lowercase letter "i"-->
	<clipPath id="i">
		<path d="M29 8v6h-3V8h3zm0-1h-3V5h3v2z" />
	</clipPath>
	{#each getAnimatedText(animationOn) as { opacity, delay, animated = true }}
		<g
			class="text"
			class:animated
			class:animated__mount={animated && animationOn === 'mount'}
			fill="none"
			stroke="currentColor"
			{opacity}
			stroke-miterlimit="1.5"
		>
			<path style="animation-delay:{delay(0)}ms" d="M23.5 13V7l-.5-.5h-3l-.5-.5V5l.5-.5h7" />
			<path style="animation-delay:{delay(1)}ms" d="M28 13l-.5-.5V6" clip-path="url(#i)" />
			<path
				style="animation-delay:{delay(2)}ms"
				d="M32.5,12.5h-2.5l-.5,-.5v-4l.5,-.5h3l.5,.5v7l-.5,.5h-3l-.5,-.5"
			/>
			<path
				style="animation-delay:{delay(3)}ms"
				d="M36.5,10h2l.5,-.5v-1.5l-.5,-.5h-2.5l-.5,.5v4l.5,.5h2.5l.5,-.5"
			/>
			<path
				style="animation-delay:{delay(4)}ms"
				d="M40.5,7.5l.5,.5v4l.5,.5h.5l.5,-.5v-4l.5,-.5h1.5l.5,.5"
			/>
			<path style="animation-delay:{delay(0)}ms" d="M55.5,12.5h-4.5l-.5,-.5v-7l.5,-.5h4l.5,.5v6" />
			<path
				style="animation-delay:{delay(1)}ms"
				d="M57.5,8l.5,-.5h3l.5,.5v4l-.5,.5h-3l-.5,-.5v-2l.5,-.5h2"
			/>
			<path style="animation-delay:{delay(2)}ms" d="M63,13l.5,-.5v-8.5" />
			<path
				style="animation-delay:{delay(3)}ms"
				d="M66.5,6v2l-.5,.5h-.5l-.5,.5v1l.5,.5h2l.5,.5v2"
			/>
			<path
				style="animation-delay:{delay(4)}ms"
				d="M71,10h2l.5,-.5v-1.5l-.5,-.5h-2.5l-.5,.5v4l.5,.5h2.5l.5,-.5"
			/>
			<path
				style="animation-delay:{delay(5)}ms"
				d="M75.5,12l.5,.5h3l.5,-.5v-1.5l-.5,-.5h-3l-.5,-.5v-1.5l.5,-.5h3l.5,.5"
			/>
		</g>
	{/each}
</svg>

<style>
	.logo {
		contain: strict;
	}

	@keyframes wire {
		to {
			stroke-dashoffset: 0;
		}
	}

	.animated.face {
		transition: opacity 0.1s cubic-bezier(0.4, 0, 0.2, 1);
	}
	@media (prefers-reduced-motion: no-preference) {
		.animated.text path {
			stroke-dasharray: 25;
			stroke-dashoffset: calc(calc(1 - var(--logo-animation-progress, 0)) * 25px);
			transition: stroke-dashoffset 0.5s linear;
		}
		.animated__mount.text path {
			animation: wire 1s linear forwards;
		}

		.animated.face {
			transition-duration: 0.3s;
		}
		.animated.face:nth-of-type(1) {
			opacity: calc(1 - var(--logo-animation-progress, 0));
		}
		.animated.face:nth-of-type(2) {
			opacity: var(--logo-animation-progress, 0);
		}
	}

	.logo.animated__hover:hover {
		--logo-animation-progress: 1;
	}
</style>
