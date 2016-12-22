<style lang="stylus" scoped>
	.app
		color: #fff
		width: 90%
		background: transparent
		margin: 0 5%
		.title
			padding: 0 20px
			margin: 20px 0
			font-size: 3rem
		.wrapper
			position: relative
			padding: 40px 20px
			.bg
				position: absolute
				left: 0
				right: 0
				top: 0
				bottom: 0
				background: #fff
				opacity: 0.2
				z-index: 1
</style>

<template>
	<div class="app">
		<h1 class="title font-xs">Neucloud Lottery System</h1>
		<div class="wrapper">
			<router-view></router-view>
			<div class="bg"></div>
		</div>
	</div>
</template>

<script>
	export default {
	}
</script>
