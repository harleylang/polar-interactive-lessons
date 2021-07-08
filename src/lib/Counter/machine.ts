import { createMachine, assign } from 'xstate';

interface MachineProps {
	values: {
		count: number;
	};
};

export const machine = createMachine<MachineProps>({
	id: 'exampleCounter',
	initial: 'idle',
	context: {
		values: {
			count: 0,
		},
	},
	states: {
		idle: {
			on: {
				INCREASE: { actions: 'increase' },
				DECREASE: { actions: 'decrease' },
			}
		}
	}
},{

	actions: {

		increase: assign({ values: ({values}: MachineProps) => ({ 
				...values,
				count: values.count + 1, 
			}) 
		}),

		decrease: assign({ values: ({values}: MachineProps) => ({ 
				...values,
				count: values.count - 1, 
			}) 
		}),

	},

	guards: {

	},

});
