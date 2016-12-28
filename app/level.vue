<script>
	import key from 'keymaster';
	import DB from './db';
	import WinManager from './win';
	export default {
		props: ['winOfCurrPrize'],

		data() {
			return {
				wins: {}, // 所有获奖者
				prizes: [], //所有奖项
				prize: null // 当前抽奖奖项
			}
		},

		mounted() {
			// 初始化奖项
			this.prizes = DB.getPrizes();
			// 初始化获奖者
			this.wins = WinManager.all();
			// 初始化当前抽奖奖项
			this.prize = this.prizes[0];

			this.prizes.forEach((p, i) => {
				console.log(p, i);
				// bind events
				key(i+1+'', () => {
					this.prize = this.prizes[i];
					// returning false stops the event and prevents default browser events
					return false;
				});
			})


		},

		methods: {

			// 删除获奖者
			deleteWinner(name) {
				if(!confirm('此操作不能恢复，确定删除吗？')){ return; }
				WinManager.delete(name);
				this.winOfCurrPrize = WinManager.allNameOfPrize(this.prize);
			},

			selectPrize(index) {
				this.prize = this.prizes[index];
			}

		},

		watch: {
			prize(prize, old) {
				this.$emit('prize-changed', prize);
			}
		}
	}
</script>

<template>
	<div class="award-level" v-if="prize">
		<h2 class="clearfix">
			<span class="prize"
				v-for="item,index in prizes"
				:class="{ active: item.name === prize.name }"
				@click="selectPrize(index)">{{item.name}}</span>
			<code class="fr">{{winOfCurrPrize.length}}/{{prize.num}}</code>
		</h2>
		<div class="award-winner">
			<span class="animated fadeInDown" v-for="name,index in winOfCurrPrize">
				{{name}}
				<a href="javascript:;" class="delete" @click="deleteWinner(name)">x</a>
			</span>
		</div>
	</div>
</template>

<style lang='stylus' scoped>
	.award-level
		color #fff;
		code
			display: inline-block
			background: url('./img/list.png') 3px 0 no-repeat
			height: 25px
			line-height: 21px
			color: #fff
			border: 2px solid #cecece
			border-radius: 3px
			padding: 1px 5px 1px 25px
			margin-top: 5px
	.prize
		margin-right: 20px
		color: #888
		cursor: pointer
		&.active
			color: #fff

	.award-winner
			min-height: 78px
			> span
				font-size: 3rem;
				padding: 12px 15px 0px 15px
				margin: 10px 15px 10px 0
				color: #fff
				font-weight: 700
				display: inline-block
				background: url(./img/crown.png) 2px -10px no-repeat #df0007
				position: relative
			.delete
				position: absolute
				right: 5px
				top: 0
				text-decoration: none
				font-size: 0.8rem
				color: #fff
</style>
