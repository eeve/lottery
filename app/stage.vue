<script>
	import * as d3 from 'd3-random';
	import * as d4 from 'd3-request';
	import key from 'keymaster';
	import Notification from './notification'
	import DB from './db';
	import Level from './level';
	import Const from './const';
	import WinManager from './win';

	export default {
		data() {
			return {
				ready: false, // 是否准备完毕，在抽奖用户池初始化完毕时
				started: false, // 是否正在抽奖
				activeIndex: null, // 当前标记用户下标
				randomProvider: null, // 随机数提供者
				name: null, // 获奖者名字
				departments: null, // 所有参与抽奖的用户名单，Array
				prizes: DB.getPrizes(), //所有奖项
				prize: null, // 当前抽几等奖
				winner: WinManager.allName(), // 所有中奖用户，Array
				winOfCurrPrize: null, //
				hideNameWall: false, // 隐藏用户墙
				hideNameWallBtnText: '切换', //
				lastEndTime: null,
				options: null,
				showNotification: false,
				scaleVal: 0.0025,
				loadBarWidth: 0
			}
		},

		beforeMount() {
			if( this.prizes.length === 0 ) {
				// 没有初始化奖项
				this.prizes = Const.prizes;
				DB.setPrizes(this.prizes);
			}
			// 获取所有
			console.log('奖项初始化完成: ', this.prizes);
		},

		mounted(){

			this.LoadDepartMents().then((depart) => {
				// Returns a number greater than or equal to 0 and less than depart.length.
				this.randomProvider = d3.randomUniform(0, depart.length);
				this.departments = depart;
				// this.ready = true;
				this.enter();
			});
			// bind events
			key('space', () => {
				if(this.lastEndTime && new Date().getTime() - this.lastEndTime < 500){
					console.log('连续时间间隔不能小于500毫秒，阻止操作！');
					return;
				}
				this.start();
				// returning false stops the event and prevents default browser events
				return false;
			});
		},

		methods: {

			prizeChanged(prize) {
				this.prize = prize;
				this.winOfCurrPrize = WinManager.allNameOfPrize(prize);
			},

			// 加载参与用户
			LoadDepartMents() {
				return new Promise((resolve, reject) => {
					try{
						d4.csv("./department.csv", function(d) {
							return d[Object.keys(d)[0]];
						},function(arr) {
							resolve(arr);
						});
					}catch(e){
						reject(e);
					}
				});
			},

			GetRandomIndex() {
				// 只能取低，不能取高
				return Math.floor(this.randomProvider());
			},

			// 随机抽取一位用户，多次可能重复
			GetWinner() {
				let index = this.GetRandomIndex();
				return {
					index: index,
					name: this.departments[index]
				}
			},

			// 随机抽取一位用户，不重复
			GetOutWinner() {
				let winner = this.GetWinner();
				if(this.winner && this.winner.indexOf(winner.name) != -1){
					return this.GetOutWinner(); // 重新抽
				} else {
					return winner;
				}
			},

			addWinner(name) {
				this.$root.eventHub.$emit('winner', name);
				this.winner.push(name);
				WinManager.add(this.prize, name);
				this.winOfCurrPrize = WinManager.allNameOfPrize(this.prize);
			},

			enter() {
				this.loadBarWidth = '100%';
				setTimeout(() => {
				 this.scaleVal = 1;
				}, 600);
			  setTimeout(() => {
		     this.ready = true;
			  }, 1000);
			},

			// 启动／结束抽奖
			start() {
				if(!this.ready){
					return this.showNotice('正在初始化抽奖用户池，请稍等几秒钟...', 'w');
				}
				if(this.started){
					clearInterval(this.started);
					this.started = null;
					this.lastEndTime = new Date().getTime(); // 记录最后一次停止的时间
					// 将抽中的人放入winner属性中
					if(this.winner == null) {
						this.winner = [];
					}
					this.addWinner(this.name);
				} else {
					if(this.winner && this.winner.length === this.departments.length) {
						return this.showNotice('不能抽奖：没有候选人，所有人都已中奖！', 'e');
					}
					if(WinManager.allNameOfPrize(this.prize).length >= this.prize.num){
						return this.showNotice('抱歉，此奖项中奖人数已达到上限！', 'e');
					}
					this.started = setInterval(() => {
						let winner = this.GetOutWinner();
						this.activeIndex = winner.index;
						this.name = winner.name;
						this.name = this.departments[this.activeIndex];
					}, 1);
				}
			},

			toggleNameWall() {
				this.hideNameWall = !this.hideNameWall;
				this.hideNameWallBtnText = this.hideNameWall ? '点击展开用户墙' : '点击收起用户墙';
			},

			showNotice(text, type, time) {
				this.showNotification = true;
				this.options = {
					autoClose: true,
					showTime: time || 1000,
					content: text,
					backgroundColor: type==='w' ? '#fbff7c' : type==='e' ? '#fc5050' : type==='i' ? '#769FCD' : null,
					textColor: type==='w' ? '#92253f' : null,
				};
			},

			onCloseNotification() {
				this.showNotification = false;
				this.options = null;
			}
		},

		components: {
			Level,
			Notification
		}
	}
</script>

<template>
	<div class="stage animated zoomIn" v-if="ready">
		<div class="tip text-left">
			排名不分先后，不影响抽奖结果，共<span class="count">{{departments.length}}</span>人参与抽奖
		</div>
		<div class="screen">
			<div class="name-box">
				<ul class="name-wall clearfix" v-show="!hideNameWall" :class='{ "hide-wall": hideNameWall }'>
					<li class="center" v-for='name, i in departments' :class="{ active: i == activeIndex, out: winner && winner.indexOf(name) != -1 }">{{name}}</li>
				</ul>
				<p class="scroll-name text-center" v-show="hideNameWall">{{name}}</p>
			</div>
			<p class="hide-name-wall text-center" @click='toggleNameWall'>{{hideNameWallBtnText}}</p>
			<level @prize-changed="prizeChanged" :win-of-curr-prize="winOfCurrPrize"></level>
		</div>
		<p class="text-center">
			<span v-if="started">抽奖中（敲空格键锁定抽奖结果）...</span>
			<span v-if="!started">敲空格键开始抽奖</span>
		</p>
		<notification :options="options" :show="showNotification" @closed="onCloseNotification"></notification>
	</div>
</template>

<style lang='stylus' scoped>
	.stage
		position: relative
		z-index: 200
		.count
			font-weight: 700
			color: #FCE38A
			padding: 0 10px
		.name-box
			margin-top: 20px
			box-shadow: 5px 5px 0px rgba(0,0,0,0.08)
			ul,li
				list-style none
			li
				min-width: 98.4px
				max-width: 150px
				float: left
				padding: 10px 20px
				border: transparent solid 2px
				&.active
					border-color: #df0007
				&.out
					background: #111
					font-weight: 700
					opacity: 0.5
			.name-wall
				border: 1px solid rgba(221,221,221,0.3)
				transition: height 0.6s
				&.hide-wall
					height: 0
					opacity: 0.1
					overflow: hidden
		.hide-name-wall
			margin-top: 20px
			transition: all 1s
			width: 150px
			margin: 0 auto
			border-radius: 4px
			border-top-left-radius: 0
			border-top-right-radius: 0
			color: rgba(221,221,221,0.5)
			&:hover
				background: rgba(221,221,221,0.1)
				cursor: pointer;
		.scroll-name
			box-shadow: inset 0px 0px 50px 10px rgba(255,255,255,0.2)
			min-height: 300px
			padding: 30px
			font-size: 10rem
			background: rgba(221,221,221,0.1)

</style>
