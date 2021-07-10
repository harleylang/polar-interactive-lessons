<script lang='ts'>
	interface Test {
		desc: string;
		query: [string, string, string];
		expected: boolean;
		result?: boolean;
	};
	export const objectives: Test[] = [
		{
			desc: 'Press the submit button to observe deny by default behaviour.',
			query: ['_','_','_'],
			expected: false,
		}
	];
</script>

## Lesson 1 -- Deny by default

Polar is deny by default, meaning that all queries are denied unless the knowledge base contains a matching policy that grants access. Testing!
