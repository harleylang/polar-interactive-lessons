<script lang='ts'>
	import L1 from '$lib/Lessons/lesson1.svelte.md';
	import Field from './field.svelte.md'
	interface Test {
		desc: string;
		query: [string, string, string];
		expected: boolean;
		result?: boolean;
	};
	let objectives: Test[] = [];
</script>

<Field objectives={objectives}>
	<L1 bind:objectives={objectives} />
</Field>
