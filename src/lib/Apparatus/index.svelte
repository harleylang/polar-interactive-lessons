<script lang='ts'>
	import Field from './field.svelte.md'
	interface Test {
		desc: string;
		query: [string, string, string];
		expected: boolean;
		result?: boolean;
	};
	let objectives: Test[] = [];
	let lesson = 0;
	let component;
	const setComponent = async (e) => {
		lesson = parseInt(e.target.value);
		if (lesson > 0) {
			let path = `../../../lessons/lesson${lesson}.svelte.md`;
			component = (await import(/* @vite-ignore */path)).default;
		};
	};
</script>

{#if lesson === 0}
	<h2>Welcome!</h2>
	<p>Get started learning Polar. Choose a lesson below to begin.</p>
{/if}

<div class='select-wrapper'>
	<select name='lessons' on:change={(e) => setComponent(e)}>
		{#if lesson === 0}
			<option selected disabled>Choose a lesson:</option>
		{:else}
			<option disabled>Change lesson:</option>
			<option value={0}>0 -- Welcome page</option>
		{/if}
		<option value={1}>1 -- Deny-by-default</option>
		<option value={2}>2 -- Allow statements</option>
	</select>
</div>

{#if lesson > 0}
	{#key lesson}
		<Field objectives={objectives}>
			<svelte:component this={component} bind:objectives={objectives}/>
		</Field>
	{/key}
{/if}

<style>
	p {
		width: 100%;
		text-align: center;
	}
	div.select-wrapper {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding-top: 16px;
		margin-bottom: 16px;
	}
</style>

