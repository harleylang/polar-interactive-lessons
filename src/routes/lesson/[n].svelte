<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Apparatus from '$lib/Apparatus/index.svelte';
	import { page } from "$app/stores";
	const n = $page.path.split('/').slice(-1)[0];
</script>

<svelte:head>
	<title>Lesson</title>
</svelte:head>

<section>
	{#key n}
		<Apparatus lesson={n} />
	{/key}
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

