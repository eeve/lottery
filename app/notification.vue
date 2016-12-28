<template>
	<div>
		<div class="notification fixed"
			v-if="iShow"
			:style="setStyle"
			transition="slide">
				<div class="delete"
				v-if="!iOptions.autoClose"
				@click="close()"></div>
				<div class="content" v-html="iOptions.content"></div>
		</div>
		<div class="countdown"
			v-if="iShow && iOptions.autoClose && iOptions.countdownBar"
			:style="setTime"
			:class="barControl"></div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			timers: [],
			barControl: '',
			iShow: this.show,
			iOptions: this.options
		}
	},
	props: {
		options: {
			type: Object,
			default: () => {}
		},
		show: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		setStyle () {
			return {
				color: this.iOptions.textColor || '#fff',
				background: this.iOptions.backgroundColor || '#21e7b6'
			}
		},
		setTime () {
			return {
				transition: `all ${(this.iOptions.showTime / 1000) || 3}s linear`,
				background: this.iOptions.barColor || '#03D6D2'
			}
		}
	},
	methods: {
		countdown () {
			if (this.iOptions.autoClose) {
				if (this.iOptions.countdownBar) {
					setTimeout(() => {
						this.barControl = 'count-leave'
					}, 10)
				}
				const t = setTimeout(() => {
					this.close()
				}, this.iOptions.showTime || 3000)
				this.timers.push(t)
			}
		},
		close () {
			this.iShow = false
			this.iOptions = {}
			this.$emit("closed");
		}
	},
	watch: {
		show(val) {
			console.log(1111);
			this.iShow = val;
		},
		options(val) {
			this.iOptions = val || {};

			this.barControl = ''
			this.timers.forEach((timer) => {
				window.clearTimeout(timer)
			})
			this.timers = []
			this.countdown()
		}
	}
}
</script>

<style scoped>
	.slide-transition {
		transition: all .3s ease;
		transform: translateZ(0);
	}
	.slide-enter,
	.slide-leave {
		transform: translate3d(0, -100%, 0);
	}
	.delete {
		-moz-appearance: none;
		-webkit-appearance: none;
		background: rgba(51, 51, 51, .2);
		cursor: pointer;
		display: inline-block;
		height: 24px;
		position: relative;
		vertical-align: top;
		width: 24px;
		float: right;
	}
	.delete:after,
	.delete:before {
		background: #fff;
		content: "";
		display: block;
		height: 2px;
		left: 50%;
		margin-left: -25%;
		margin-top: -1px;
		position: absolute;
		top: 50%;
		width: 50%;
	}
	.delete:before {
		transform: rotate(45deg);
	}
	.delete:after {
		transform: rotate(-45deg);
	}
	.delete:hover {
		background: rgba(51, 51, 51, .5);
	}
	.notification {
		width: 100%;
		line-height: 2;
		z-index: 3;
		position: fixed;
		top: 0;
		left: 0;
	}
	.notification .content {
		padding: .75rem 2rem;
	}
	.countdown {
		width: 100%;
		height: 4px;
		background: #000;
		z-index: 3;
		position: fixed;
		top: 0;
		left: 0;
		transform: translateZ(0);
	}
	.count-leave {
		transform: translate3d(-100%, 0, 0);
	}
</style>
