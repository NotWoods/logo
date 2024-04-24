<script>
	import { LOGO_PRESETS } from './[file].svg/presets.js';
	import Logo from '../lib/Logo.svelte';
</script>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Inline</th>
			<th>Image</th>
		</tr>
	</thead>
	<tbody>
		{#each Object.entries(LOGO_PRESETS) as [file, args]}
			<tr class:onhover={file.includes('on-hover')}>
				<th>
					{file}
				</th>
				<td style="background:{file.includes('on-dark') ? '#222' : 'none'}">
					<Logo {...args} />
				</td>
				<td style="background:{file.includes('on-dark') ? '#222' : 'none'}">
					<img src={`./${file}.svg`} alt={file} />
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.onhover td:hover {
		--logo-animation-progress: 1;
	}
</style>
