export default {
	// 设置奖项
	setPrizes(prizes) {
		this._saveObject('prizes', prizes);
	},

	// 获取奖项
	getPrizes() {
		return this._getObject('prizes') || [];
	},

	// 设置中奖名单
	setWins(obj) {
		this._saveObject('winning', obj);
	},

	// 获取中奖名单
	getWins() {
		return this._getObject('winning') || {};
	},

	_saveObject(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	},

	_getObject(key) {
		return JSON.parse(localStorage.getItem(key) || null);
	}

}
