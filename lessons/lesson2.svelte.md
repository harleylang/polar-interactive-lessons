<script lang='ts'>
	interface Test {
		desc: string;
		query: [string, string, string];
		expected: boolean;
		result?: boolean;
	};
	export const objectives: Test[] = [
		{
			desc: 'Write an allow statement that allows `sam` to `read` anything.',
			query: ['sam','read','_'],
			expected: true,
		},
		{
			desc: 'Write an allow statement that allows `harley` to `read` the resource `book`.',
			query: ['harley','read','book'],
			expected: true,
		},
		{
			desc: 'Ensure that `harley` cannot access everything.',
			query: ['harley','read','_'],
			expected: false,
		}
	];
</script>

## Lesson 2 -- Allow statements 

Polar policy files provide applications with knowledge about _who_ can access _what_.

Oso is a policy engine that reads polar policy files to form a knowledge base of permissions. Queries can be passed to the engine, and the provided result informs whether a matching permission exists. This result can be used to grant or deny access accordingly.

**Allow statements** define which *actors* can *act* on which *resource*.

> allow(user, action, resource);

For example, the following statement allows `Harley` to `read` any resource:

> allow("harley","read", _);

In contrast the following statement only allows `Harley` to read `book` resources:

> allow("harley","read","book");
