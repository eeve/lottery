import Stage from './stage';
import Lottery from './lottery';

export default [
	{
		path: '/',
		redirect: '/stage'
	},
	{
		name: 'stage',
		path: '/stage',
		component: Stage,
		children: [
			{
				path: 'lottery',
				component: Lottery
			}
		]
	}
]
