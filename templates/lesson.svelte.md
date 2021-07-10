<script lang='ts'>
	interface Test {
		desc: string;
		query: [string, string, string];
		expected: boolean;
		result?: boolean;
	};
	export const objectives: Test[] = [
		{
			desc: 'An example objective',
			query: ['_','_','_'],
			expected: false,
		}
	];
</script>

## Lesson 000 -- Title Here 

Content body here.
