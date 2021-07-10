<script lang='ts'>
	export let lesson;
	
	import { onMount } from 'svelte';
	import Field from './field.svelte.md'
	import Selection from '$lib/Selection/index.svelte';

	interface Test {
		desc: string;
		query: [string, string, string];
		expected: boolean;
		result?: boolean;
	};

	let objectives: Test[] = [];
 	let component;

 	onMount(async () => {
		if (typeof lesson !== 'undefined') {
			let path = `../../../lessons/lesson${lesson}.svelte.md`;
			component = (await import(/* @vite-ignore */path)).default;
		}
	}); 

</script>

<Selection lesson={lesson} />

{#if lesson > 0}
	<Field objectives={objectives}>
		<svelte:component this={component} bind:objectives={objectives}/>
	</Field>
{/if}
