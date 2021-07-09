<script>
	import { interpret } from 'xstate';
	import { machine } from './machine';
	let state;
	const lessonMachine = interpret(machine, { devTools: true })
		.onTransition((machineState) => {
			state = machineState
		}).start();
</script>

### Lesson 1 -- Deny by default

Polar is deny by default, meaning that all queries are denied unless the knowledge base contains a matching policy that grants access.

<input value={state.context.values.input} on:input={(e) => lessonMachine.send('INPUT', { input: e.target.value })} />

<button on:click={() => lessonMachine.send('SUBMIT')} style='margin-top: 16px'>
	Submit	
</button>

Debugging: 

STATE CONDITION: {JSON.stringify(state.value)}

STATE CONTEXT: {JSON.stringify(state.context.values)}

