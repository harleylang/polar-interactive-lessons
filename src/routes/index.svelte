<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Lesson1 from '$lib/Lessons/1-DenyByDefault/index.svelte.md';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<Lesson1 />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

</style>
