<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Apparatus from '$lib/Apparatus/index.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<Apparatus />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		flex: 1;
	}
</style>
