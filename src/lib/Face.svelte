<svelte:options namespace="svg" />

<script>
	/** @type {boolean} */
	export let monochrome;
	/** @type {boolean} */
	export let animateEyes = false;

	$: color = monochrome ? 'currentColor' : '#032030';
</script>

{#if !monochrome}
	<rect class="background" width="12" height="12" x="2" y="2" fill="#e67237" />
{/if}
<g fill="none" stroke={color}>
	{#if monochrome}
		<rect class="outline" width="13" height="13" x="1.5" y="1.5" />
	{/if}
	<circle class="eye" class:animated={animateEyes} cx="5" cy="6" r="1.5" />
	<circle class="eye" class:animated={animateEyes} cx="11" cy="6" r="1.5" />
	{#if animateEyes}
		<path class="eye-closed" d="M3 6h4" />
		<path class="eye-closed" d="M9 6h4" />
	{/if}
	<path d="M4.5,7.5v3.5l2.5,1.5m4.5,-4.9v3.4l-2.5,1.5" />
</g>
<path fill={color} d="M8,10.6l1.5,-1.6h-3l1.5,1.6Z" />

<style>
	.eye-closed {
		visibility: hidden;
	}

	@keyframes open {
		from {
			visibility: visible;
		}
		50% {
			visibility: hidden;
		}
		to {
			visibility: visible;
		}
	}
	@keyframes closed {
		from {
			visibility: hidden;
		}
		50% {
			visibility: visible;
		}
		to {
			visibility: hidden;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.animated.eye,
		.eye-closed {
			animation: open 0.5s steps(3, jump-none) 2.5s both;
		}
		.eye-closed {
			animation-name: closed;
		}
	}
</style>
