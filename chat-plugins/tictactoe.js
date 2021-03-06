//Tic Tac Toe by SilverTactic (Siiilver)
/*if (!global.ttt) global.ttt = [{}, {}];
var tttgames = global.ttt[0];
var tttplayers = global.ttt[1];

const EXPIRATION_TIME = 90 * 1000;
const INACTIVE_KICK_TIME = 30 * 1000;

var TicTacToe = (function () {
	function TicTacToe(user1, user2, gameNo) {
		this.gameNo = gameNo;
		this.p1 = user1;
		this.p2 = user2;
		this.players = [this.p1, this.p2];
		this.checkPlayer = function (user) {
			if (this.p1.userid === user.userid) return this.p2.name;
			if (this.p2.userid === user.userid) return this.p1.name;
			return false;
		}.bind(this);
		this.markers = {};
		this.markers[this.p1.userid] = 'X';
		this.boxes = {'1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9};
		this.markedCount = 0;
		this.phase = 'waiting';
		this.timer = setTimeout(this.end.bind(this, 'The game request has expired.'), EXPIRATION_TIME);
	}

	TicTacToe.prototype.accept = function () {
		this.markers[this.p2.userid] = 'O';
		this.currentPlayer = this.players[Math.floor(Math.random() * 2)];
		this.phase = 'started';
		this.resetTimer();
		this.update('If you accidentally close out, use <em><b>/ttt open</b></em> to reopen the game.');
	};

	TicTacToe.prototype.switchPlayer = function () {
		if (this.currentPlayer === this.p1) this.currentPlayer = this.p2;
		else this.currentPlayer = this.p1;
	};

	TicTacToe.prototype.getGrid = function (gameOver) {
		var marked = [];
		for (var i in this.boxes) {
			if (typeof this.boxes[i] === 'string') marked.push(this.boxes[i]);
			else marked.push('<button style = "height: 80px%; width: 80px; font-size: 20pt" name = "send" value = "/ttt markbox ' + i + '"><b>' + i + '</b></button>');
		}
		var style = 'width: 100px; height: 100px; font-size: 20pt;';
		var grid = '<table cellspacing = "0">' +
			//row 1
			'<tr><th style = "' + style + ' background-image: url(http://i.imgur.com/xufVRE8.png&quot); background-size: contain; border-right: 3px solid; border-bottom: 3px solid;"><center>' + marked[0] + '</center></td>' +
			'<th style = "' + style + ' background-image: url(http://i.imgur.com/2TUk6qY.png); background-size: contain; border-bottom: 3px solid;"><center>' + marked[1] + '</center></th>' +
			'<th style = "' + style + ' background-image: url(http://i.imgur.com/tCk005Y.png); background-size: contain; border-left: 3px solid; border-bottom: 3px solid;"><center>' + marked[2] + '</center></th></tr>' +
			//row 2
			'<tr><th style = "' + style + ' background-image: url(http://i.imgur.com/fzQAvCe.png); background-size: contain;border-right: 3px solid;"><center>' + marked[3] + '</center></th>' +
			'<th style = "' + style + 'background-image: url(http://i.imgur.com/DZZ76rh.png); background-size: contain"><center>' + marked[4] + '</center></th>' +
			'<th style = "' + style + ' background-image: url(http://i.imgur.com/wbA17yf.png); background-size: contain; border-left: 3px solid;"><center>' + marked[5] + '</center></th></tr>' +
			//row 3
			'<tr><th style = "' + style + ' background-image: url(http://i.imgur.com/n8uJJ6M.png); background-size: contain; border-right: 3px solid; border-top: 3px solid;"><center>' + marked[6] + '</center></th>' +
			'<th style = "' + style + ' background-image: url(http://i.imgur.com/1T2RxUT.png); background-size: contain; border-top: 3px solid;"><center>' + marked[7] + '</center></th>' +
			'<th style = "' + style + ' background-image: url(http://i.imgur.com/N95RsA5.png); background-size: contain; border-left: 3px solid; border-top: 3px solid;"><center>' + marked[8] + '</center></th></tr></table><br>';
		if (!gameOver) grid += '<button name = "send" value = "/ttt end"><small>End Game</small></button>';
		return grid;
	};

	TicTacToe.prototype.markBox = function (user, num) {
		if (this.currentPlayer.userid !== user.userid) return this.updateUser(user, 'It isn\'t your turn right now.');
		if (!num || num.length > 1 || num.match(/[^1-9]/g)) return this.updateUser(user, 'That is not a valid box number.');
		if (typeof this.boxes[num] === 'string') return this.updateUser(user, 'That box has already been marked.');
		this.boxes[num] = this.markers[this.currentPlayer.userid];
		this.markedCount++;
		if (!this.checkWinner()) {
			this.resetTimer();
			this.switchPlayer();
			this.update();
		}
	};

	TicTacToe.prototype.update = function (text) {
		var message = '|html|<center><b style = "color:' + Core.color(this.currentPlayer.userid) + '">' + this.currentPlayer.name + '\'s turn!</b><br/>' + this.getGrid();
		if (text) message += '<br>' + text;
		this.players.forEach(function (user) {
			user.popup(message);
		});
	};

	TicTacToe.prototype.updateUser = function (user, issue) {
		var message = '|html|<center><b style = "color:' + Core.color(this.currentPlayer.userid) + '">' + this.currentPlayer.name + '\'s turn!</b><br>' +
			this.getGrid() + (issue ? '<br>' + issue : '');
		user.popup(message);
	};

	TicTacToe.prototype.checkWinner = function () {
		if ((this.boxes['1'] === this.boxes['2'] && this.boxes['2'] === this.boxes['3']) || (this.boxes['4'] === this.boxes['5'] && this.boxes['5'] === this.boxes['6']) || (this.boxes['7'] === this.boxes['8'] && this.boxes['8'] === this.boxes['9']) || (this.boxes['1'] === this.boxes['4'] && this.boxes['4'] === this.boxes['7']) || (this.boxes['2'] === this.boxes['5'] && this.boxes['5'] === this.boxes['8']) || (this.boxes['3'] === this.boxes['6'] && this.boxes['6'] === this.boxes['9']) || (this.boxes['1'] === this.boxes['5'] && this.boxes['5'] === this.boxes['9']) || (this.boxes['3'] === this.boxes['5'] && this.boxes['5'] === this.boxes['7'])) {
			this.declareWinner();
			return true;
		}
		if (this.markedCount === 9) {
			this.declareDraw();
			return true;
		}
	};

	TicTacToe.prototype.declareDraw = function () {
		var message = '|html|<center><b>Draw between ' + this.p1.name + ' and ' + this.p2.name + '!</b><br>' + this.getGrid(true);
		this.players.forEach(function (user) {
			user.popup(message);
		});
		this.end();
	};

	TicTacToe.prototype.declareWinner = function () {
		var message = '|html|<center><b>' + this.currentPlayer.name + ' has won the game!</b><br/>' + this.getGrid(true);
		this.players.forEach(function (user) {
			user.popup(message);
		});
		this.end();
	};

	TicTacToe.prototype.end = function (message) {
		if (message) {
			if (this.phase === 'waiting') {
				message = '|pm|' + this.p2.getIdentity() + '|' + this.p1.getIdentity() + '|/error ' + message;
			} else message = '|popup|' + message;
			this.players.forEach(function (user) {
				user.send(message);
			});
		}
		clearTimeout(this.timer);
		delete tttplayers[this.p1.userid];
		delete tttplayers[this.p2.userid];
		delete tttgames[this.gameNo];
	};

	TicTacToe.prototype.resetTimer = function () {
		clearTimeout(this.timer);
		this.timer = setTimeout(this.end.bind(this, 'The game has been ended due to player inactivity.'), INACTIVE_KICK_TIME);
	};

	return TicTacToe;
})();

var cmds = {
	'': 'help',
	help: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<b>Tic-Tac-Toe commands</b><br>' +
			'<li>/ttt c <em>User</em> - Sends a user a request to play Tic-Tac-Toe. This can also be used in PMs. (Requests automatically expire if they\'re not accepted or declined within 1.5 minutes.)<br>' +
			'<li>/ttt accept <em>User</em>  - Accepts a Tic-Tac-Toe request from a user.<br>' +
			'<li>/ttt decline <em>User</em> - Declines a Tic-Tac-Toe request from a user.<br>' +
			'<li>/ttt see or /ttt show - Opens up the Tic-Tac-Toe board, in case you accidentally closed it out.<br>' +
			'<li>/ttt end - Exits the current game of Tic-Tac-Toe. Cancels a play request if the game hasn\'t been started yet. (Note: The game automatically ends after a user stays inactive for more than 30 seconds.)<br>'
		);
	},

	chall: 'c',
	challenge: 'c',
	play: 'c',
	c: function (target, room, user, connection, cmd) {
		if (!target || !target.trim()) return this.sendReply('|html|/ttt ' + cmd + ' <em>User</em> - Challenges a user to a game of Tic-Tac-Toe.');
		var targetUser = (Users.get(target) ? Users.get(target).name : target);
		target = Users.get(target);
		if (!target || !target.connected) return this.sendReply('User ' + targetUser + ' is offline.');
		if (user.userid === target.userid) return this.sendReply('You can\'t play Tic-Tac-Toe with yourself!');
		if (user.userid in tttplayers) {
			var game = tttgames[tttplayers[user.userid]];
			if (game.phase === 'waiting') return this.sendReply('You have already challenged ' + game.checkPlayer(user) + ' to a game of Tic-Tac-Toe. Wait for their response.');
			if (game.checkPlayer(target)) return this.sendReply('You\'re playing Tic-Tac-Toe with ' + target.name + ' right now!');
			return this.sendReply('You are currently playing Tic-Tac-Toe with another user. You cannot send ' + target.name + ' a request.');
		}
		if (target.userid in tttplayers) {
			var game = tttgames[tttplayers[target.userid]];
			if (game.checkPlayer(user)) return this.sendReply(game.checkPlayer(user) + ' has already sent you a game request...');
			return this.sendReply(target.name + ' has already challenged someone else to a game of Tic-Tac-Toe. Either wait for them to finish, or play with someone else.');
		}
		for (var i in tttgames) {
			if (tttgames[i].checkPlayer(user)) return this.sendReply(tttgames[i].checkPlayer(user) + ' sent you a request. Respond to that before challenging anyone else.');
			if (tttgames[i].checkPlayer(target)) return this.sendReply(target.name + ' has already challenged someone else to a game of Tic-Tac-Toe. Either wait for them to finish, or play with someone else.');
		}
		target.send('|pm|' + user.getIdentity() + '|' + target.getIdentity() + '|/html ' + user.getIdentity() + ' wants to play Tic-Tac-Toe!<br>' +
			'<button name = "send" value = "/ttt accept ' + user.userid + '">Accept</button> <button name = "send" value = "/ttt decline ' + user.userid + '">Decline</button>'
		);
		user.send('|pm|' + target.getIdentity() + '|' + user.getIdentity() + '|/html You have challenged ' + target.getIdentity() + ' to a game of Tic-Tac-Toe. Waiting for their response...');
		var gameId = tttplayers[user.userid] = Object.keys(tttgames).length;
		tttgames[gameId] = new TicTacToe(user, target, gameId);
	},

	acc: 'accept',
	accept: function (target, room, user, connection, cmd) {
		if (!target || !target.trim()) return this.sendReply('|html|/ttt ' + cmd + ' <em>User</em> - Accepts a Tic-Tac-Toe challenge from a user.');
		var game = tttgames[tttplayers[user.userid]];
		var targetUser = (Users.get(target) ? Users.get(target).name : target);
		target = Users.get(target);
		if (!target || !target.connected) return this.sendReply('User ' + targetUser + ' is offline. Wait for them to come back online.');
		if (user.userid in tttplayers) {
			if (game.phase === 'waiting') return this.sendReply('You have already challenged someone else to a game of Tic-Tac-Toe. You cannot accept this user\'s challenge.');
			if (game.checkPlayer(target)) return this.sendReply('You\'re playing Tic-Tac-Toe with ' + game.checkPlayer(user) + ' right now!');
			return this.sendReply('You are currently playing Tic-Tac-Toe with another user. You cannot accept ' + target.name + '\'s request.');
		}
		if (user.userid === target.userid) return this.sendReply('You can\'t accept a challenge from yourself!');
		if (!(target.userid in tttplayers)) return this.sendReply(target.name + ' has not challenged you to a game of Tic-Tac-Toe.');

		game = tttgames[tttplayers[target.userid]];
		if (game.p2.userid !== user.userid) return this.sendReply(target.name + ' has not challenged you to a game of Tic-Tac-Toe.');
		tttplayers[user.userid] = tttplayers[target.userid];
		game.accept();
	},

	dec: 'decline',
	decline: function (target, room, user, connection, cmd) {
		if (!target || !target.trim()) return this.sendReply('|html|/ttt ' + cmd + ' <em>User</em> - Declines a Tic-Tac-Toe challenge from a user.');
		var targetUser = (Users.get(target) ? Users.get(target).name : target);
		target = Users.get(target);
		if (!target || !target.connected) return this.sendReply('User ' + targetUser + ' is offline.');
		if (user.userid === target.userid) return this.sendReply('You can\'t use this command on yourself.');
		var game = tttgames[tttplayers[toId(targetUser)]];
		if (!(target.userid in tttplayers) || !game.checkPlayer(target)) return this.sendReply(target + ' has not challenged you to a game of Tic-Tac-Toe.');
		if (game.checkPlayer(target) && game.phase == 'started') return this.sendReply('You are playing with ' + game.checkPlayer(user) + ' right now. If you want to end the game, use /ttt end.');

		game.end('The Tic-Tac-Toe challenge was declined.');
	},

	mark: 'markbox',
	markbox: function (target, room, user, connection, cmd) {
		if (!(user.userid in tttplayers)) return this.sendReply('You aren\'t playing a game of Tic-Tac-Toe right now.');
		var game = tttgames[tttplayers[user.userid]];
		if (game.phase === 'waiting') return this.sendReply('Your request has not been accepted yet. You can only use this command in an active game.');
		game.markBox(user, target);
	},

	update: 'see',
	view: 'see',
	show: 'see',
	open: 'see',
	see: function (target, room, user) {
		if (!(user.userid in tttplayers)) return this.sendReply('You aren\'t playing a game of Tic-Tac-Toe right now...');
		var game = tttgames[tttplayers[user.userid]];
		if (game.phase === 'waiting') return this.sendReply('Your request has not been accepted yet. You can only use this command in an active game.');
		game.update();
	},

	exit: 'end',
	leave: 'end',
	end: function (target, room, user) {
		if (!(user.userid in tttplayers)) return this.sendReply('You aren\'t playing a game of Tic-Tac-Toe right now...');
		var game = tttgames[tttplayers[user.userid]];
		if (game.phase === 'waiting') game.end('The Tic-Tac-Toe challenge was withdrawn.');
		else game.end(user.name + ' has decided to leave the game midway.');
	}
};

exports.commands = {
	ttt: 'tictactoe',
	tictactoe: cmds,
	tttend: 'endttt',
	endttt: cmds.end
}*/

if (!global.ttt) global.ttt = new Map();
var ttt = global.ttt;

const EXPIRATION_TIME = 90 * 1000;
const INACTIVE_KICK_TIME = 30 * 1000;

var TicTacToe = (function () {
	function TicTacToe(user1, user2) {
		this.p1 = user1;
		this.p2 = user2;
		this.plName = user1.name;
		this.p2Name = user2.name;
		this.checkPlayer = function (user) {
			if (this.p1.userid === user.userid) return this.p2.name;
			if (this.p2.userid === user.userid) return this.p1.name;
			return false;
		}.bind(this);
		this.markers = new Map([[this.p1, 'X']]);
		this.boxes = {'1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9};
		this.markedCount = 0;
		this.phase = 'waiting';
		this.timer = setTimeout(this.end.bind(this, 'The Tic-Tac-Toe request has expired.'), EXPIRATION_TIME);
	}

	TicTacToe.prototype.accept = function () {
		this.markers.set(this.p2, 'O');
		this.currentPlayer = [this.p1, this.p2][Math.floor(Math.random() * 2)];
		this.phase = 'started';
		this.resetTimer();
		this.update('If you accidentally close out, use <em><b>/ttt open</b></em> to reopen the game.');
	};

	TicTacToe.prototype.switchPlayer = function () {
		if (this.currentPlayer === this.p1) this.currentPlayer = this.p2;
		else this.currentPlayer = this.p1;
	};

	TicTacToe.prototype.getGrid = function (gameOver) {
		var marked = [];
		for (var i in this.boxes) {
			if (typeof this.boxes[i] === 'string') marked.push(this.boxes[i]);
			else marked.push('<button style = "height: 80px%; width: 80px; font-size: 20pt" name = "send" value = "/ttt markbox ' + i + '"><b>' + i + '</b></button>');
		}
		var style = 'width: 100px; height: 100px; font-size: 20pt;';
		var grid = '<table cellspacing = "0">' +
			//row 1
			'<tr><th style = "' + style + ' background-image: url(http://i.imgur.com/xufVRE8.png&quot); background-size: contain; border-right: 3px solid; border-bottom: 3px solid;"><center>' + marked[0] + '</center></td>' +
			'<th style = "' + style + ' background-image: url(http://i.imgur.com/2TUk6qY.png); background-size: contain; border-bottom: 3px solid;"><center>' + marked[1] + '</center></th>' +
			'<th style = "' + style + ' background-image: url(http://i.imgur.com/tCk005Y.png); background-size: contain; border-left: 3px solid; border-bottom: 3px solid;"><center>' + marked[2] + '</center></th></tr>' +
			//row 2
			'<tr><th style = "' + style + ' background-image: url(http://i.imgur.com/fzQAvCe.png); background-size: contain;border-right: 3px solid;"><center>' + marked[3] + '</center></th>' +
			'<th style = "' + style + 'background-image: url(http://i.imgur.com/DZZ76rh.png); background-size: contain"><center>' + marked[4] + '</center></th>' +
			'<th style = "' + style + ' background-image: url(http://i.imgur.com/wbA17yf.png); background-size: contain; border-left: 3px solid;"><center>' + marked[5] + '</center></th></tr>' +
			//row 3
			'<tr><th style = "' + style + ' background-image: url(http://i.imgur.com/n8uJJ6M.png); background-size: contain; border-right: 3px solid; border-top: 3px solid;"><center>' + marked[6] + '</center></th>' +
			'<th style = "' + style + ' background-image: url(http://i.imgur.com/1T2RxUT.png); background-size: contain; border-top: 3px solid;"><center>' + marked[7] + '</center></th>' +
			'<th style = "' + style + ' background-image: url(http://i.imgur.com/N95RsA5.png); background-size: contain; border-left: 3px solid; border-top: 3px solid;"><center>' + marked[8] + '</center></th></tr></table><br>';
		if (!gameOver) grid += '<button name = "send" value = "/ttt end"><small>End Game</small></button>';
		return grid;
	};

	TicTacToe.prototype.markBox = function (user, num) {
		if (this.currentPlayer.userid !== user.userid) return this.updateUser(user, 'It isn\'t your turn right now.');
		if (!num || num.length > 1 || num.match(/[^1-9]/g)) return this.updateUser(user, 'That is not a valid box number.');
		if (typeof this.boxes[num] === 'string') return this.updateUser(user, 'That box has already been marked.');
		this.boxes[num] = this.markers.get(this.currentPlayer.userid);
		this.markedCount++;
		if (!this.checkWinner()) {
			this.resetTimer();
			this.switchPlayer();
			this.update();
		}
	};

	TicTacToe.prototype.update = function (text) {
		var message = '|html|<center><b style = "color:' + Core.color(this.currentPlayer.userid) + '">' + this.currentPlayer.name + '\'s turn!</b><br/>' + this.getGrid();
		if (text) message += '<br>' + text;
		this.players.forEach(function (user) {
			user.popup(message);
		});
	};

	TicTacToe.prototype.updateUser = function (user, issue) {
		var message = '|html|<center><b style = "color:' + Core.color(this.currentPlayer.userid) + '">' + this.currentPlayer.name + '\'s turn!</b><br>' +
			this.getGrid() + (issue ? '<br>' + issue : '');
		user.popup(message);
	};

	TicTacToe.prototype.checkWinner = function () {
		if ((this.boxes['1'] === this.boxes['2'] && this.boxes['2'] === this.boxes['3']) || (this.boxes['4'] === this.boxes['5'] && this.boxes['5'] === this.boxes['6']) || (this.boxes['7'] === this.boxes['8'] && this.boxes['8'] === this.boxes['9']) || (this.boxes['1'] === this.boxes['4'] && this.boxes['4'] === this.boxes['7']) || (this.boxes['2'] === this.boxes['5'] && this.boxes['5'] === this.boxes['8']) || (this.boxes['3'] === this.boxes['6'] && this.boxes['6'] === this.boxes['9']) || (this.boxes['1'] === this.boxes['5'] && this.boxes['5'] === this.boxes['9']) || (this.boxes['3'] === this.boxes['5'] && this.boxes['5'] === this.boxes['7'])) {
			this.declareWinner();
			return true;
		}
		if (this.markedCount === 9) {
			this.declareDraw();
			return true;
		}
	};

	TicTacToe.prototype.declareDraw = function () {
		var message = '|html|<center><b>Draw between ' + this.p1.name + ' and ' + this.p2.name + '!</b><br>' + this.getGrid(true);
		this.players.forEach(function (user) {
			user.popup(message);
		});
		this.end();
	};

	TicTacToe.prototype.declareWinner = function () {
		var message = '|html|<center><b>' + this.currentPlayer.name + ' has won the game!</b><br/>' + this.getGrid(true);
		this.players.forEach(function (user) {
			user.popup(message);
		});
		this.end();
	};

	TicTacToe.prototype.end = function (message) {
		if (message) {
			if (this.phase === 'waiting') {
				message = '|pm|' + this.p2.getIdentity() + '|' + this.p1.getIdentity() + '|/error ' + message;
			} else message = '|popup|' + message;
			this.players.forEach(function (user) {
				user.send(message);
			});
		}
		clearTimeout(this.timer);
		delete tttplayers[this.p1.userid];
		delete tttplayers[this.p2.userid];
		delete tttgames[this.gameNo];
	};

	TicTacToe.prototype.resetTimer = function () {
		clearTimeout(this.timer);
		this.timer = setTimeout(this.end.bind(this, 'The game has been ended due to player inactivity.'), INACTIVE_KICK_TIME);
	};

	return TicTacToe;
})();

var cmds = {
	'': 'help',
	help: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<b>Tic-Tac-Toe commands</b><br>' +
			'<li>/ttt c <em>User</em> - Sends a user a request to play Tic-Tac-Toe. This can also be used in PMs. (Requests automatically expire if they\'re not accepted or declined within 1.5 minutes.)<br>' +
			'<li>/ttt accept <em>User</em>  - Accepts a Tic-Tac-Toe request from a user.<br>' +
			'<li>/ttt decline <em>User</em> - Declines a Tic-Tac-Toe request from a user.<br>' +
			'<li>/ttt see or /ttt show - Opens up the Tic-Tac-Toe board, in case you accidentally closed it out.<br>' +
			'<li>/ttt end - Exits the current game of Tic-Tac-Toe. Cancels a play request if the game hasn\'t been started yet. (Note: The game automatically ends after a user stays inactive for more than 30 seconds.)<br>'
		);
	},

	chall: 'c',
	challenge: 'c',
	play: 'c',
	c: function (target, room, user, connection, cmd) {
		if (!target || !target.trim()) return this.sendReply('|html|/ttt ' + cmd + ' <em>User</em> - Challenges a user to a game of Tic-Tac-Toe.');
		var targetUser = (Users.get(target) ? Users.get(target).name : target);
		target = Users.get(target);
		if (!target || !target.connected) return this.sendReply('User ' + targetUser + ' is offline.');
		if (user.userid === target.userid) return this.sendReply('You can\'t play Tic-Tac-Toe with yourself!');
		if (ttt.has(user)) {
			var game = ttt.get(user);
			if (game.phase === 'waiting') return this.sendReply('You have already challenged ' + game.checkPlayer(user) + ' to a game of Tic-Tac-Toe. Wait for their response.');
			if (game.checkPlayer(target)) return this.sendReply('You\'re playing Tic-Tac-Toe with ' + target.name + ' right now!');
			return this.sendReply('You are currently playing Tic-Tac-Toe with ' + game.checkPlayer(user) + '. You cannot send ' + target.name + ' a request.');
		}
		if (ttt.has(target)) {
			var game = ttt.get(target);
			if (game.checkPlayer(user)) return this.sendReply(game.checkPlayer(user) + ' has already sent you a Tic-Tac-Toe request...');
			return this.sendReply(target.name + ' has already challenged someone else to a game of Tic-Tac-Toe. Either wait for them to finish, or play with someone else.');
		}
		ttt.forEach(function (game) {
			if (game.checkPlayer(user)) return this.sendReply(game.checkPlayer(user) + ' sent you a request. Respond to that before challenging anyone else.');
			if (game.checkPlayer(target)) return this.sendReply(target.name + ' has already challenged someone else to a game of Tic-Tac-Toe. Either wait for them to finish, or play with someone else.');
		});
		target.send('|pm|' + user.getIdentity() + '|' + target.getIdentity() + '|/html ' + user.getIdentity() + ' wants to play Tic-Tac-Toe!<br>' +
			'<button name = "send" value = "/ttt accept ' + user.userid + '">Accept</button> <button name = "send" value = "/ttt decline ' + user.userid + '">Decline</button>'
		);
		user.send('|pm|' + target.getIdentity() + '|' + user.getIdentity() + '|/html You have challenged ' + target.getIdentity() + ' to a game of Tic-Tac-Toe. Waiting for their response...');
		ttt.set(user, new TicTacToe(user, target));
	},

	acc: 'accept',
	accept: function (target, room, user, connection, cmd) {
		if (!target || !target.trim()) return this.sendReply('|html|/ttt ' + cmd + ' <em>User</em> - Accepts a Tic-Tac-Toe challenge from a user.');
		var game = ttt.get(user);
		var targetUser = (Users.get(target) ? Users.get(target).name : target);
		target = Users.get(target);
		if (!target) return this.sendReply('User ' + targetUser + ' was not found. Did you misspell their name?');
		if (!target.connected) return this.sendReply('User ' + targetUser + ' is offline. Wait for them to come back online.');
		if (ttt.has(user)) {
			if (game.phase === 'waiting') return this.sendReply('You have already challenged ' + game.checkPlayer(user) + ' to a game of Tic-Tac-Toe. You cannot accept ' + target.name + '\'s challenge.');
			if (game.checkPlayer(target)) return this.sendReply('You\'re playing Tic-Tac-Toe with ' + game.checkPlayer(user) + ' right now!');
			return this.sendReply('You are currently playing Tic-Tac-Toe with ' + game.checkPlayer(user) + '. You cannot accept ' + target.name + '\'s challenge.');
		}
		if (user.userid === target.userid) return this.sendReply('You can\'t accept a challenge from yourself!');
		if (!ttt.has(target)) return this.sendReply(target.name + ' has not challenged you to a game of Tic-Tac-Toe.');

		game = ttt.get(target);
		if (game.p2 !== user) return this.sendReply(target.name + ' has not challenged you to a game of Tic-Tac-Toe.');
		ttt.set(user, ttt.get(target));
		game.accept();
	},

	dec: 'decline',
	decline: function (target, room, user, connection, cmd) {
		if (!target || !target.trim()) return this.sendReply('|html|/ttt ' + cmd + ' <em>User</em> - Declines a Tic-Tac-Toe challenge from a user.');
		var targetUser = (Users.get(target) ? Users.get(target).name : target);
		target = Users.get(target);
		if (!target || !target.connected) return this.sendReply('User ' + targetUser + ' is offline.');
		if (user.userid === target.userid) return this.sendReply('You can\'t use this command on yourself.');
		var game = ttt.get(target);
		if (!game || !game.checkPlayer(user))  return this.sendReply(target + ' has not challenged you to a game of Tic-Tac-Toe.');
		if (game.checkPlayer(user) && game.phase == 'started') return this.sendReply('You are playing with ' + game.checkPlayer(user) + ' right now. If you want to end the game, use /ttt end.');

		game.end('The Tic-Tac-Toe challenge was declined.');
	},

	mark: 'markbox',
	markbox: function (target, room, user, connection, cmd) {
		if (!ttt.has(user)) return this.sendReply('You aren\'t playing a game of Tic-Tac-Toe right now.');
		var game = ttt.get(user);
		if (game.phase === 'waiting') return this.sendReply('Your request has not been accepted yet. You can only use this command in an active game.');
		game.markBox(user, target);
	},

	update: 'see',
	view: 'see',
	show: 'see',
	open: 'see',
	see: function (target, room, user) {
		if (!ttt.has(user)) return this.sendReply('You aren\'t playing a game of Tic-Tac-Toe right now...');
		var game = tttgames[tttplayers[user.userid]];
		if (game.phase === 'waiting') return this.sendReply('Your request has not been accepted yet. You can only use this command in an active game.');
		game.update();
	},

	exit: 'end',
	leave: 'end',
	end: function (target, room, user) {
		if (!ttt.has(user)) return this.sendReply('You aren\'t playing a game of Tic-Tac-Toe right now...');
		var game = ttt.get(user);
		if (game.phase === 'waiting') game.end('The Tic-Tac-Toe challenge was withdrawn.');
		else game.end(user.name + ' has decided to leave the game midway.');
	}
};

exports.commands = {
	ttt: 'tictactoe',
	tictactoe: cmds,
	tttend: 'endttt',
	endttt: cmds.end
}
