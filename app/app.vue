<template>
	<star-bg>
		<div class="app">
			<!-- <canvas id="star" v-if="ready">Internet Explorer 8 Not Supported</canvas> -->
			<!-- <h1 class="title font-xs">Neucloud Lottery System</h1> -->
			<div class="wrapper">
				<div class="loader" :style="{ opacity: ready ? 0 : 1 }" v-show="!ready">
					<div class="inner" :style="{ transform: 'scale(1, '+ scaleVal +')', width: loadBarWidth }"></div>
					<p class="loader-text">加载中...</p>
				</div>
				<router-view></router-view>
				<div class="bg"></div>
			</div>
		</div>
	</star-bg>
</template>

<script>
	// import Star from './star';
	import StarBg from './bg/index.vue';

	//除chrome外，其他支持需要在服务器上运行才支持
	if(!window.localStorage){
		alert('请更换为Chrome浏览器！');
	}
	export default {
		data() {
			return {
				loadBarWidth: null,
				scaleVal: 0.0025,
				ready: false
			}
		},

		mounted() {
			setTimeout(() => this.loadBarWidth = '100%', 1);
			setTimeout(() => {
			 	this.scaleVal = 1;
			}, 600);
		  setTimeout(() => {
	     	this.ready = true;
				// setTimeout(() => Star.load(), 0.1);
		  }, 1000);
		},

		components: {
			StarBg
		}
	}
</script>

<style lang="stylus" scoped>
	.app
		position: absolute;
		top: 30px;
		bottom: 0;
		color: #fff
		width: 90%
		background: transparent
		margin: 0 5%
		// height: 100%
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
		.loader
			position: fixed
			top: 0
			left: 0
			width: 100%
			height: 100%
			background: #fff
			z-index: 99999
			-webkit-box-sizing: border-box
			-moz-box-sizing: border-box
			box-sizing: border-box
			.loader-text
				position: absolute
				color: red
				width: 500px
				height: 50px
				line-height: 50px
				text-align: center
				left: 50%
				top: 50%
				margin-left: -250px
				margin-top: -60px
				font-size: 3rem
			.inner
				background: #000518 url(./img/noise.png)
				position: relative
				top: 0
				left: 0
				width: 0
				height: 100%
				-webkit-transform: scale(1, 0.0025)
				-moz-transform: scale(1, 0.0025)
				-ms-transform: scale(1, 0.0025)
				-o-transform: scale(1, 0.0025)
				transform: scale(1, 0.0025)
				-webkit-transition: width 600ms ease, -webkit-transform 400ms ease
				-moz-transition: width 600ms ease, -moz-transform 400ms ease
				-o-transition: width 600ms ease, -o-transform 400ms ease
				transition: width 600ms ease, transform 400ms ease
				-webkit-animation: init-loader 20s
				-moz-animation: init-loader 20s
				-o-animation: init-loader 20s
				animation: init-loader 20s
</style>
