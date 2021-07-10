<script lang='ts'>
	export let lesson;
 	const changePage = async (e) => {
		let target = parseInt(e.target.value);
		let path;
		if (target === 0) {
			path = '/';
		} else {
			path = `/lesson/${target}`;
		};
		(window as any).location = path;
	};
</script>

<div class='select-wrapper'>
	<select name='lessons' on:change={(e) => changePage(e)}>
		{#if lesson === 0}
			<option selected disabled>Choose a lesson:</option>
		{:else}
			<option selected disabled>Change lesson:</option>
			<option value={0}>0 -- Welcome page</option>
		{/if}
		<option value={1}>1 -- Deny-by-default</option>
		<option value={2}>2 -- Allow statements</option>
	</select>
</div>

<style>
	div.select-wrapper {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding-top: 16px;
		margin-bottom: 16px;
	}
</style>