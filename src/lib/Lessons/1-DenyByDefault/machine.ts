import { createMachine, assign } from 'xstate';

interface MachineProps {
	values: {
		input: string;
		result: boolean;
		mod: any;
	};
};


const query = async (qstr: string) => {

	const oso = (window as any).oso;

	let newOso = new oso.Oso();

	await newOso.loadStr('allow("steve", "get", "car");');

	console.log(await newOso.isAllowed("steve","get","car"));

	// TODO load / register classes in future lessons where required

	// TODO: load user's inputted policy into the oso engine
	// -> likely requires a try/catch in case there are errors returned by oso engine

	let result = await newOso.isAllowed('_','_','_');

	return result;

};

const queryStates = {
	id: 'queryStates',
	initial: 'idle',
	states: {
		idle: {

		},
		validate: {
			invoke: {
				src: ({values}: MachineProps) => async () => { return await query('') },
				onDone: { actions: 'cacheResult', target: 'resolve' },
				onError: { target: '#lessonMachine.error.oso'},
			}, 
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

		error: {
			states: {
				oso: {
					type: 'final',
				},
			},
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

