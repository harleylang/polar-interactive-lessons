import preprocess from 'svelte-preprocess';
import replace from '@rollup/plugin-replace';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svelte.md'],
	preprocess: [
		mdsvex({ extensions: ['.svelte.md', '.md', '.svx'] }),
		preprocess(),
	],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			plugins: [
				replace({
					// required for xstate
					preventAssignment: true,
					'process.env.NODE_ENV': process.env.NODE_ENV,
				}),
			]
		}
	},
};

export default config;
