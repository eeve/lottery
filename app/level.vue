<script>
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
		},

		methods: {

			// 删除获奖者
			deleteWinner(name) {
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
		<h2>
			<span class="prize"
				v-for="item,index in prizes"
				:class="{ active: item.name === prize.name }"
				@click="selectPrize(index)">{{item.name}}</span>
		</h2>
		<div class="award-winner">
			<span v-for="name in winOfCurrPrize">
				{{name}}
				<a href="javascript:;" class="delete" @click="deleteWinner(name)">x</a>
			</span>
			<p>{{winOfCurrPrize.length}}/{{prize.num}}</p>
		</div>
	</div>
</template>

<style lang='stylus' scoped>
	.award-level
		color #fff;
	.prize
		margin-right: 20px
		color: #888
		cursor: pointer
		&.active
			color: #fff

	.award-winner
			min-height: 78px
			> span
				padding: 10px 15px
				margin: 10px 15px 10px 0
				background: #df0007
				color: #fff
				font-weight: 700
				display: inline-block
				position: relative
			.delete
				position: absolute
				right: 5px
				top: 0
				text-decoration: none
				font-size: 0.8rem
				color: #fff

</style>
