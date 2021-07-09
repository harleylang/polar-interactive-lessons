<script lang="ts">
	import Header from '$lib/Header/index.svelte';
	import Footer from '$lib/Footer/index.svelte';
	import '../app.css';

	import { dev } from '$app/env';
	import { inspect } from '@xstate/inspect';
	import { onMount } from 'svelte';
 	onMount(() => {
		if (dev) {
			// add: `, {devTools: true}` to machine.interpret(..., here) to link the state to the visualizer
			inspect({iframe: false, url: 'https://statecharts.io/inspect'});
		};
	})
</script>

<Header />

<main>
	<slot />
</main>

<Footer />

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
