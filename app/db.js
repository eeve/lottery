export default {
	// 设置奖项
	setPrizeItem(prizes) {
		this._saveObject('prizes', prizes);
	},

	// 获取奖项
	getPrizeItem() {
		return this._getObject('prizes');
	},

	_saveObject(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	},

	_getObject(key) {
		return JSON.parse(localStorage.getItem(key) || null);
	}

}
