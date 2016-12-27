import DB from './db';
let wins = DB.getWins();

export default {

	add(prize, name) {
		let arr = wins[prize.name] || [];
		arr.push(name);
		wins[prize.name] = arr;
		this._save();
	},

	delete(name) {
		for(let key in wins){
			let g = wins[key];
			for (var i = 0; i < g.length; i++) {
				if(g[i] === name) {
					g.splice(i, 1);
					wins[key] = g;
					this._save();
					return false;
				}
			}
		}
	},

	all() {
		return wins;
	},

	allName() {
		let arr = [];
		for(let key in wins){
			arr = [].concat(arr, wins[key]);
		}
		return arr;
	},

	allNameOfPrize(prize) {
		return wins[prize.name] || [];
	},

	_save() {
		DB.setWins(wins);
	}

}
