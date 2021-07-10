import { createMachine, assign } from 'xstate';

interface MachineProps {
	values: {
	
	};
};

export const machine = createMachine<MachineProps>({
	id: 'exampleMachine',
	initial: 'idle',
	context: {
		values: {
		
		},
	},
	states: {
		idle: {
			// input logic here
		}
	}
},{

	actions: {

	},

	guards: {

	},

});

