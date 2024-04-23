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
			<tr>
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
