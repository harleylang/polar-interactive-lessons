import { createMachine, assign } from 'xstate';
//import * as queryz from '$lib/QueryOso/dist/index.js';

//let query = require('$lib/QueryOso/dist/index.js')

//const query = import('$lib/QueryOso/dist/index.js');

//console.log(query)

interface MachineProps {
	values: {
		input: string;
		result: boolean;
		mod: any;
	};
};


const query = async (qstr: string) => {

	const oso = (window as any).oso;
	
	console.log(oso);

	// TODO load / register classes in future lessons where required

	// TODO: load user's inputted policy into the oso engine
	// -> likely requires a try/catch in case there are errors returned by oso engine

	let result = true//await oso.isAllowed();

	return result;

};

const queryStates = {
	id: 'queryStates',
	initial: 'idle',
	states: {
		idle: {

		},
		validate: {
			/* invoke: {
				src: ({values}: MachineProps) => async () => { return await query('') },
				onDone: { actions: 'cacheResult', target: 'resolve' },
				onError: {
					// TODO: catch oso engine errors 
				},
			},  */
		},
		resolve: {
			always: [
				{ cond: 'isAllowed', target: 'accessGranted' },
				{ target: 'accessDenied' }
			]
		},
		error: {

		},
		accessGranted: {

		},
		accessDenied: {

		},
	},
};

export const machine = createMachine<MachineProps>({
	id: 'lessonMachine',
	initial: 'loading',
	context: {
		values: {
			input: '',
			result: false,
			mod: '',
		},
	},
	states: {
		loading: {
			on:{

				SUBMIT: { target: 'idle' },
			}
		 	/* src: ({values}: MachineProps) => async () => { 
				 console.log('HERe')
				 return await import('../../QueryOso/dist/index.js') },
			onDone: { target: 'idle' },
			onError: {
				// TODO: catch oso engine errors 
			}, */
		},
		idle: {
			type: 'parallel',
			on: {
				INPUT: { actions: 'cacheInput' },
				SUBMIT: { target: 'idle.query.validate' },
			},
			states: {
				query: { ...queryStates }, 
			}
		},

	}
},{

	actions: {

		cacheInput: assign({ values: ({values}: MachineProps, event: any) => ({ 
				...values,
				input: event.input,
			}) 
		}),

		cacheResult: assign({ values: ({values}: MachineProps, event: any) => ({ 
				...values,
				result: event.data,
			}) 
		})

	},

	guards: {

		isAllowed: ({values}: MachineProps) => values.result,

	},

});

