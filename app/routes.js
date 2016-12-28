import Stage from './stage';

export default [
	{
		path: '/',
		redirect: '/stage'
	},
	{
		name: 'stage',
		path: '/stage',
		component: Stage
	}
]
