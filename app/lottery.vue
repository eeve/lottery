<script>
	import * as d3 from 'd3-random';
	const random = d3.randomUniform(50, 100);

	export default {
		props:{
			// * 所有员工
			departments: {
				type: Array,
				default: null,
				required: true
			}
		},

		mounted(){
			console.log(this.departments);
			console.log(this.GetRandomIndex());
		},

		methods: {
			GetRandomIndex() {
				return Math.round(random());
			}
		}
	}

</script>

<template>
	<div class="app">
		<h1>Neucloud 抽奖系统</h1>
	</div>
</template>

<style lang='stylus' scoped>
	.app
		color #fff;

</style>
