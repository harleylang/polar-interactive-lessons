<script lang='ts'>
	import ConfettiGenerator from 'confetti-js';
	import { interpret } from 'xstate';
	import { machine } from './machine';
	export let objectives;
	let state;
	let lesson;
	let lessonMachine;
	$: lesson = machine.withContext({
		values: {
			...machine.context.values,
			tests: objectives, 
		}
	});
	$: lessonMachine = interpret(lesson, { devTools: true })
		.onTransition((machineState) => {
			state = machineState
		}).start();
	var canvas;
	let set = false; 
	const confetti = (newState) => {
		if (typeof canvas === 'undefined' && typeof document !== 'undefined') {
			let element = document.getElementById("wahho_celebrategoodtimescmon_itsacelebration_");
			canvas = new ConfettiGenerator({ target: element, animate: true });
		};
		if (newState.matches('idle.query.valid') 
		&& typeof canvas !== 'undefined' 
		&& !set) {			
			let element = document.getElementById("wahho_celebrategoodtimescmon_itsacelebration_");
			canvas = new ConfettiGenerator({ target: element, animate: true });
			canvas.render();
			set = true;
		} else if (['idle.query.invalid', 'idle.query.error'].some(newState.matches) 
		&& typeof canvas !== 'undefined') {
			canvas.clear();
			set = false;
		};
	};
	$: {
		confetti(state); 
	};
</script>

<canvas id="wahho_celebrategoodtimescmon_itsacelebration_"></canvas>

<slot></slot>

## Try it

### Objectives:

{#each objectives as { desc }, i}
* {desc}
    * Result:
		{#if state.context.values.results.length > 0 } 
			{#if state.context.values.results[i].expected === state.context.values.results[i].result}
				<span class='valid'>Passing!</span>
			{:else}
				<span class='invalid'>Failing.</span>
			{/if}
		{:else if state.matches('idle.query.error.oso')}
			<span class='error'>Please resolve the error message below.</span>	
		{:else} 
			Idle -- write your policies and press submit to continue.	
		{/if} 

{/each}

### Your Policy:

<input 
	value={state.context.values.input} 
	on:input={
		(e) =>  {
			lessonMachine.send('INPUT', { input: e.target.value.replace(/'/g, '"') })
		}
	}
	on:keyup|preventDefault={
		(e) => {
			if (e.code === 'Enter') {
				lessonMachine.send('SUBMIT')
			}
		}
	} />

<button on:click={() => lessonMachine.send('SUBMIT')}>
	Submit	
</button>

{#if state.matches('idle.query.error.oso')}

### ERROR!!

<code class='error'>
	{state.context.values.error}
</code>

{/if}

<!-- ### Debugging: 

STATE CONDITION: {JSON.stringify(state.value)}

STATE CONTEXT: {JSON.stringify(state.context.values)} -->

<style>
	button, input {
		margin-top: 16px;
		margin-bottom: 16px;
	}
	input {
		width: calc(100% - 19px);
	}
	span.valid {
		color: green;
		font-weight: 800;
	}
	span.invalid {
		color: red;
		font-style: italic;
		text-transform: uppercase;
	}
	span.error {
		color: #0080ff;
		font-weight: 800;
	}
	code.error {
		width: calc(100% - 64px);
		padding: 32px;
		margin: 0;
		background-color: #99ccff;
		border-radius: 10px;
	}
	canvas#wahho_celebrategoodtimescmon_itsacelebration_ {
		position:absolute;
		width: 100%;
		height: 100%;
		left:0;
		top:0;
		z-index:-1;
	}
</style>