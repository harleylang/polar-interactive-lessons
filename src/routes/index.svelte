<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Counter from '$lib/Counter/index.svelte';
	import HelloWorld from '$lib/Markdown/HelloWorld.svelte.md';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<strong>Welcome!</strong>
	</h1>
	<Counter />
	<HelloWorld />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
		text-align: center;
	}

</style>
