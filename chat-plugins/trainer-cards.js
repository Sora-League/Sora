'use strict';

function seen(user) {
	user = toId(user);
	let time = Seen.get(user);
	if ((Users.getExact(user) && Users.getExact(user).connected) || time === 'never') return '';
	return '<b>Last Seen:</b> ' + time[0] + ' ago';
}

function getBadges(user) {
	let badgeList = JSON.parse(require('fs').readFileSync('storage-files/badges.json'));
	user = toId(user);
	if (!badgeList[user] || Object.keys(badgeList[user]).length < 3) return '';
	let total = '<details><summary><b>Badges:</b> (Click here to open)</summary>';
	for (let i in badgeList[user]) {
		total += badgeList[user][i];
	};
	return total + '</details>';
}

exports.commands = {
	staff: 'leaguemembers',
	attendance: 'leaguemembers',
	/*ateamlist: 'leaguemembers',
	gls: 'leaguemembers',
	gymleaders: 'leaguemembers',
	e4s: 'leaguemembers',
	elite4s: 'leaguemembers',
	elitefours: 'leaguemembers',
	gls: 'leaguemembers',
	gymleaders: 'leaguemembers',*/
	leaguemembers: function (target, room, user, connection, cmd) {
		if (!this.runBroadcast()) return;
		let total = '';
		let members = {
			'Admin Team': ['∆Sora Revan∆',  '∆Sora Ninjarisu∆', '∆Sora Onyxeagle∆', '∆Sora Blade∆', '∆Sora Megatronus∆', 'Neith Cass'],
			'Elite Four': ['∆Sora Darkus∆', '∆Sora Megatronus∆', '∆Sora Lymm∆', '∆Sora Vulpinus∆'],
			'Frontiers': ['∆Sora Heat∆', '∆Sora Gasp∆', '∆Sora Youmaton'],
			'Gym Leaders': ['∆Sora Terrors∆', '∆Sora Float∆', '∆Sora Whitefang∆', '∆Sora Luscinia∆', '∆Sora Onyxeagle∆', '∆Sora Meows∆', '∆Sora Neith∆', '∆Sora Akkie∆', '∆Sora Mitsuka∆', '∆Sora Blade∆'],
		}
		for (let i in members) {
			total += '<b>' + i + '</b><table><tr><th>User</th><th>Last Seen</th></tr>';
			let list = members[i];
			for (let j in list) {
				let Seen = Users.getExact(list[j]) && Users.getExact(list[j]).connected ? '<span style = "color:green">Online</span>' : seen(list[j]).split('</b> ')[1];
				if (Seen === 'never') Seen = '<span style = "color:red">Never</span>';
				total += '<tr><td>' + list[j] + '</td><td><center>' + Seen + '</center></td>';
			}
			total += '</table><br>';
		}
		this.sendReplyBox('<div class = "infobox-limited"><center>' + total + '</center></div>');
	},

	/*********************************************************
	 * Admin Team
	 *********************************************************/

	bart: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<a><font size= 4><center><b><font color = 07e1ed>∆Sora Bart∆</font></b></center></a><br />' +
			'<center><i>"Sometimes I look at the bright blue sky and say to myself \'I FUCKED UP, I FUCKED UP\'"</i></center> <br />' +
			'<b>Ace:</b> Weavile<br />' +
			'<center><img src="http://sprites.pokecheck.org/i/461.gif"> <img src="http://i1280.photobucket.com/albums/a482/Skarmory11/Misc%20sprites/Bart_zps03ad3a7d.png"><img src="http://play.pokemonshowdown.com/sprites/xyani/torterra.gif"></center>' +
			'<center><img src="http://oi62.tinypic.com/14cfyh0.jpg"></center> <br />');
	},

	revan: 'noah',
	noah: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<a><font size= 4><center><b><font color = 430747>∆Champion Revan∆</font></b></center></a><br />' +
			'<center><i>"The world could always use more heroes!"</i></center> <br />' +
			'<center><img src="http://sprites.pokecheck.org/i/134.gif"><img src="http://i.imgur.com/iu4Njdf.png"></center><br />' +
			'<b>Ace:</b> All <br />' +
			'<b>Battle Rules:</b> <br/>' +
			'-OU <br/>' +
			'<center><img src="http://oi62.tinypic.com/14cfyh0.jpg"></center> <br />');
	},

	onyx: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<div style = "padding: 8px; color: #7f5200; background: #000 url(http://farm4.static.flickr.com/3358/3503936537_d9b46321cd.jpg); background-size: cover;">' +
			'<a><font face = algerian><font color =  b27300><font size= 5><center>∆OnyxEagle∆</center></font></a><br />' +
			'<center><i>"I WILL ROCK YOUR WORLD!"</i></center> <br />' +
			'<b>Skilled in:</b> Monotype Rock<br />' +
			'<b>Achievements:</b> 1st Co-Champion of New Sora. Resurrected Sora from the rubbles with Arani. One of the best Rock-type users. <br/>' +
			'<b>History:</b> First host of Sora\'s server. Champion, Random Battles Frontier of Sora. <br/>' +
			'<b>Current Position:</b> Rock-type Gym Leader <br/>' +
			'<b>Notes:</b> Conducts tests, registrations and coding. <br/>' +
			'<img src="http://play.pokemonshowdown.com/sprites/xyani/kabutops.gif"> <img src="http://play.pokemonshowdown.com/sprites/xyani/tyranitar.gif"> <img src="http://play.pokemonshowdown.com/sprites/xyani/tyrantrum.gif"> <img src="http://play.pokemonshowdown.com/sprites/xyani/terrakion.gif"> <img src="http://play.pokemonshowdown.com/sprites/xyani/omastar.gif">' +
			'<center><img src="http://oi62.tinypic.com/14cfyh0.jpg"></center> <br />'+
			getBadges('soraonyxeagle'));
	},

	risu: 'ninjarisu',
	ninjarisu: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<a><font size= 4><center><b>∆Frontierhead Ninjarisu∆</b></center></a><br />' +
			'<i>"Respect your Elders"</i> <br />' +
			'<b>Ace:</b> Zapdos<br />' +
			'<b>Symbol:</b> Completionist Symbol<br />' +
			'<b>Rules:</b> Gen 1 OU<br />' +
			'<details><summary><b>Badges: (Click here to open)</b></summary><br />' +
			'<a href="http://soraleague.weebly.com/badges.html#ldr"><img src="http://i.imgur.com/ELFPzW8.png" title="Achieved Gym Leader Status"></a><a href="http://soraleague.weebly.com/badges.html#frontier"><img src="http://i.imgur.com/7jbhEJC.png" title="Achieved Frontier Status"></a><a href="http://soraleague.weebly.com/badges.html#e4"><img src="http://i.imgur.com/QtECCD9.png" title="Achieved Elite 4 Status"></a><a href="http://soraleague.weebly.com/badges.html#starly"><img src="http://i.imgur.com/zaLhq1k.png" title="Starly Badge: One  Year on Sora"></a><a href="http://soraleague.weebly.com/badges.html#staravia"><img src="http://i.imgur.com/2UmjiLt.png" title="Staravia Badge: Two Years on Sora"></a><a href="http://soraleague.weebly.com/badges.html#smeargle"><img src="http://i.imgur.com/A8h3FJN.png" title="Smeargle the Creator: Helped develop Champion\'s Challenge and Inclement Weather Metagames"></a></details><br />' +
			'<img src="http://play.pokemonshowdown.com/sprites/xyani/pachirisu.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/unown-romeo.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/unown-india.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/unown-sierra.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/unown-uniform.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/pachirisu.gif">' +
			'<center><img src="http://oi62.tinypic.com/14cfyh0.jpg"></center><br />');
	},

	/*********************************************************
	 * Elite Four
	 *********************************************************/


	ice: 'megatronus',
	megatronus: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆E4 <b>Megatronus</b>∆<br />' +
			'<i>"Let\'s play rock paper scissors; Paper. You win."</i> <br />' +
			'<b>Type: <font color = 00e0ac>Ice</font></b><br />' +
			'<b>Ace:</b> Mamoswine<br />' +
			seen('soramegatronus') +
			getBadges('soramegatronus'));
	},	  


        ground: 'lymm',
	lymm: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆E4 <b>Lymm</b>∆<br />' +
			'<i>"???"</i> <br />' +
			'<b>Type: <font color = A64000>Ground</font></b> <br />' +
			'<b>Ace:</b> Landorus-T<br />' +
		        seen('soralymm') +
			getBadges('soralymm'));
	},
			


	 psychic: 'darkus',
	 darkus: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆E4 <b>Darkus</b>∆<br />' +
			'<i>"It\'s all shits and giggles until someone giggles and shits"</i> <br />' +
			'<b>Type: <font color = ff00b6>Psychic</font></b><br />' +
			'<b>Ace:</b> Victini<br />' + seen('soradarkus') + getBadges('soradarkus'));
		 
	 },
			

	
	dragon: 'vulpinus',
	vulpinus: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆E4 <b>Vulpinus</b>∆<br />' +
			'<i>"Strength through tactics."</i> <br />' +
			'<b>Type: <font color = 230077>Dragon</font></b><br />' +
			'<b>Ace:</b> Tyrantrum<br />' + seen('soravulpinus') + getBadges('soravulpinus'));

	},
	
	
	sube4: function(target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center>Sub E4 Position: <b><font color = 1AFF00>Online</font></b></center><br />'+
		'Sub E4 <b>???</b> <br />'+
		'<b>Type:</b> <b><font color = 006b0a>???</font></b><br />'+
		'<b>Battle Rules:</b> <br />'+
		'-None <br />');
        },

	/*********************************************************
	 * Frontiers
	 *********************************************************/

	coachabadon: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><font size = 3><b>∆Coach Abadon∆<b></font><br>' +
			'<i>"SWIGGITY SWOOTY I\'M COMING FOR THAT BOOTY"</i><br><br>' +
			'<b>Achievements:</b>' +
			'<li>Sora\'s best Ghost and Ground E4' +
			'<li>Sora\'s coach' +
			'<li>All round top bloke<br>' +
			'<img style = "margin: 5px" src = "http://128.199.160.98:8000/avatars/' + Config.customavatars.coachabadon + '">' +
			'<div style = "display: inline-block; width: 100px; height: 100px; background: url(http://www.pkparaiso.com/imagenes/xy/sprites/animados/gengar-3.gif) no-repeat -50px -70px"></div><br>' +
			'<audio controls src = "https://dl.pushbulletusercontent.com/W9wf3ZGqXSIHvgVbdUtbl9PrWnPTl9SQ/deep.mp3" style = "color: black; width: 100%; border-radius: 0px;"></audio>' +
			getBadges('coachabadon') + '<br><img src="http://oi62.tinypic.com/14cfyh0.jpg"></center>');
	},



     

       gasp: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Frontier <b>Gasp</b>∆<br />' +
			'<i>"Light is arbitrary, Darkness is absolute."</i> <br />' +			'<b>Symbol: </b>??? <br />' +
			'<b>Ace:</b> ???<br />' +
			'<b>Battle rules:</b> <br />' +
			'-CAPs<br />' + seen('soragasp') + getBadges('gasp')
		);
	},
	
	
	youmaton: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Frontier <b>Youmaton</b>∆<br />' +			'<i>"Let\'s enjoy a nicely seasoned battle with a touch of salt and the side of rolls."</i> <br />' +
			'<b>Symbol: </b>Meta <br />' +
			'<b>Ace:</b> Infernape<br />' +
			'<b>Battle rules:</b> <br />' +
			'-UU<br />' + seen('sorayoumaton') + getBadges('sorayoumaton')
		);
	},
       

	heat: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Frontier <b>Heat</b>∆<br />' +
			'<i>"What does anyone have, for a well played Beartic?"</i> <br />' +
			'<b>Symbol:</b> Well Played<br />' +
			'<b>Ace:</b> Lapras <br />' +
			'<b>Battle Rules:</b> <br/>' +
			'-PU <br/>' +
			seen('soraheat') + '<br/>' +
			'<center><img src="http://play.pokemonshowdown.com/sprites/xyani/zubat.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/golbat.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/zubat.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/gengar.gif"></center> <br />');
	},
	
	
	zachary: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Frontier <b>Zachary</b>∆<br />' +
			'<i>"Come forth, and suffer."</i> <br />' +
			'<b>Symbol:</b> Duplicate<br />' +
			'<b>Ace:</b> None <br />' +
			'<b>Battle Rules:</b> <br/>' +
			'-Doubles OU<br />' + seen('sorazachary') + getBadges('sorazachary')
		);
	},




	/*subfrontier: function(target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center>Sub Frontier Position: <b><font color = FF0000>Offline</font></b></center><br />'+
		'Sub Frontier <b>???</b> <br />'+
		'<b>Symbol:</b> ???<br />'+
		'<b>Battle Rules:</b> <br />');
        
        },*/

	/*********************************************************
	 * Gym Leaders
	 *********************************************************/

	
	bug: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>???</b>∆<br />' +
			'<i>"???"</i> <br />' +
			'<b>Type: <font color = 65b510>Bug</font></b><br />' +
			'<b>Ace:</b> ????<br />'+ seen('') + getBadges(''));
			
	},

	
	terrors: 'dark', 
	dark: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>Terrors</b>∆<br />' +
			'<i>"ur bad"</i> <br />' +
			'<b>Type: <font color = 15012b>Dark</font></b><br />' +
			'<b>Ace:</b> Muk-Alola <br />' + seen('soraterrors') + getBadges('soraterrors'));
	},

	
	dragonldr: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>???</b>∆<br />' +
			'<i>"???"</i><br />' +
			'<b>Type: <font color = 230077>Dragon</font> </b><br />' +
			'<b>Ace:</b> ???<br />' + seen('') + getBadges(''));
	},

        
	 
	electricldr: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>???</b>∆<br />' +
			'<i>"???"</i><br />' +
			'<b>Type: <font color = d6cc0c>Electric</font></b><br />' +
			'<b>Ace:???<br />' + seen('sorafloat') + getBadges('sorafloat'));
	},
		        
        
		
	fairyldr: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>???</b>∆<br />' +
			'<i>"???"</i> <br />' +
			'<b>Type: <font color = ff42a0>Fairy</font></b><br />' +
			'<b>Ace: </b>???<br />' + 
			seen('') + getBadges(''));
	},

	whitefang: 'fighting',
	fighting: function (target, room, user) {
		if (!this.runBroadcast()) return;

		this.sendReplyBox('∆Gym Ldr <b>Whitefang</b>∆<br />' +			'<i>"Get janked by misfire on command"</i> <br />' +
			'<b>Type: <font color = d83c08>Fighting</font></b><br />' +
			'<b>Ace:</b> Cobalion<br />'+ seen('sorawhitefang') + getBadges('sorawhitefang')
		);
	},

	
	blade: 'fire',
	fire: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>Blade</b>∆<br />' +
			'<i>“Two things are infinite: the universe and the sign up queue at VGC; and I\'m not sure about the universe.”</i> <br />' +
			'<b>Type: <font color = FF0000>Fire</font></b><br />' +
			'<b>Ace:</b> Torkoal<br />' +	  
			'<center><img src="http://sprites.pokecheck.org/i/494.gif">☯<img src="http://sprites.pokecheck.org/i/080.gif">' +
			'<details><summary><font color = 009900><b>Torkoal Shrine</b></font></summary><center><img src="http://play.pokemonshowdown.com/sprites/xyani-shiny/torkoal.gif"></center>' +
			'<b>R.I.P. War Turtle</b> <br />' +
			'1st Apostle of the All Mighty Lord Parasect</details>' +
			'<details><summary><font color = 009900><b>Aegislash Shrine</b></font></summary><center><img src="http://play.pokemonshowdown.com/sprites/xyani-shiny/aegislash.gif"></center>' +
			'<b>R.I.P. Shadow Snek</b> <br />' +
			'2nd Apostle of the All Mighty Lord Parasect</details><br />' +

				  '<img src="http://oi62.tinypic.com/14cfyh0.jpg"></center> <br />' +
			seen('SoraBlade') + '<br>' +
			getBadges('SoraBlade'));
	},

			

        
	
	flying: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>???</b>∆<br />' +
			'<i>"???"</i><br />' +
		        '<b>Type: <font color = 7ab6ff>Flying</font></b><br />' +
			'<b>Ace:</b> ???<br />' + seen('') + getBadges(''));
			
	},

	
	ghost: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>???</b>∆<br />' +
			'<i>"???"</i> <br />' +
			'<b>Type: <font color = 7814e2>Ghost</font></b><br />' +
			'<b>Ace:</b> ???<br />' +
			seen('') + getBadges(''));
	},

	
	grass: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>???</b>∆<br />' +
			'<i>"???"</i> <br />' +
			'<b>Type: <font color = 006b0a>Grass</font></b><br>' +
			'<b>Ace:</b>???<br />' + seen('') + getBadges('')); 
			
	},
	
	
	groundldr: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>???</b>∆<br>' +
			'<i>"???"</i> <br>' +
			'<b>Type: <font color = A64000>Ground</font></b><br>' +
			'<b>Ace: </b>???<br>' + seen('') + getBadges(''));
	},
	
	
	iceldr: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>???</b>∆<br />' +
			'<i>"???"</i> <br />' +
			'<b>Type: <font color = 00e0ac>Ice</font></b><br />' +
			'<b>Ace:</b> ???<br />' +
			seen('') + '<br>' +
			getBadges('')
		);
	},

        akkie: 'normal',
	normal: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>Akkie</b>∆<br />' +
			'<i>"Hello?"</i><br />' +
			'<b>Type: <font color = ffa5d5>Normal</font></b><br />' +
			'<b>Ace:</b> Dodrio<br />' + seen('soraakkie') + getBadges('soraakkie'));
	},

        meows: 'poison',
	poison: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>Meows</b>∆<br />' +
			'<i>"brb dying"</i> <br />' +
			'<b>Type: <font color = aa00ff>Poison</font></b><br />' +
			'<b>Ace:</b> Muk-Alola<br />' + seen('sorameows') + getBadges('sorameows'));
	},

	 
	psychicldr: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>???</b>∆<br />' +
			'<i>"???"</i><br />' +
			'<b>Type: <font color = ff00b6>Psychic</font></b><br />' +
			'<b>Ace:</b> ??? <br />' +
			seen('') + '<br>' +
			getBadges('')
		);
	},

	
	onyxeagle: 'rock',
	rock: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>Onyxeagle</b>∆<br />' +
			'<i>"I WILL ROCK YOUR WORLD!"</i><br />' +
			'<b>Type: <font color = 472e10>Rock</font></b><br />' +
			'<b>Ace:</b> Tyranitar<br />' +
			'<center><img src = "http://play.pokemonshowdown.com/sprites/xyani/solrock.gif"><img src = "http://play.pokemonshowdown.com/sprites/xyani/tyrantrum.gif"><img src = "http://play.pokemonshowdown.com/sprites/xyani/lunatone.gif"></center><br />' +
			'<center><img src = "http://oi62.tinypic.com/14cfyh0.jpg"></center><br />' + seen('soraonyxeagle') + getBadges('soraonyxeagle'));
	},


	neith: 'steel',
	steel: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>Neith</b>∆<br />' +
			'<i>"???"</i> <br />' +
			'<b>Type: <font color = 5e6664>Steel</font></b> <br />' +
			'<b>Ace:</b> Excadrill<br />' +
			seen('soraneith') + getBadges('soraneith')
		);
	},

        float: 'water',
	water: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('∆Gym Ldr <b>Float</b>∆<br />' +
			'<i>"Bitch I\'m still in the cut, Togedemaru."</i> <br />' +
			'<b>Type: <font color = 0745ff>Water</font></b><br />' +
			'<b>Ace:</b> Whiscash <br/>' +
			'<img src="http://play.pokemonshowdown.com/sprites/xyani/mimejr.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/unown-f.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/unown-l.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/unown-o.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/unown.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/unown-t.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/mimejr.gif"><br />' +
			'<audio controls src = "https://dl2.pushbulletusercontent.com/FA0FFRp4fgXjGR3yxnW7eBjJ5uHAKXSi/BITCHES%20AIN%27T%20SHIT%20%28UKULELE%20COVER%29.mp3" style = "border-radius: 0px; background: black;"></audio></br></br><br>' + seen('sorafloat') + getBadges('sorafloat'));	  
		
	},


	/*********************************************************
	 * Custom Cards
	 *********************************************************/

	aboottothehead: 'abtth',
	abtth: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><b><font size="4" color="03b206">ABootToTheHead</font></b></center><br>' +
			'<center><i>"Art is a harlot, and I\'m her sassy urban friend."</i></center><br /><br />' +
			'<b>Ace: </b>Scizor and Whimsicott<br />' +
			'<b>Favorite Pokemon: </b>Typhlosion and Scizor<br />' +
			'<b>Preferred tiers: </b>VGC, Ubers, OU <br />' +
			'<b>Known for: </b>VoltTurn and Whimsistall shenanigans<br />' +
			'<b>Achievements: </b>Ex-Elite Frontier, ex-Elite Four<br>' +
			'<b>Affiliation:</b> Gracidea Shaymins<br>' +
			'<b>Honours:</b> Sora\'s third challenger to reach the Hall of Fame<br><br>' +
			'<center><img src="http://www.pokestadium.com/sprites/black-white/animated/typhlosion.gif"><img src="http://www.pokestadium.com/sprites/black-white/animated/excadrill.gif"><img src="http://www.pokestadium.com/sprites/black-white/animated/whimsicott.gif"><img src="http://www.pokestadium.com/sprites/black-white/animated/scizor.gif"><img src="http://www.pokestadium.com/sprites/black-white/animated/manectric.gif"><img src="http://www.pokestadium.com/sprites/black-white/animated/forretress.gif"></center><br />' +
			getBadges('aboottothehead') + '<br>' +
			'<center><img src = "http://i.imgur.com/UBIZE34.png" width = "188" height = "125"></center>'
		);
	},

	sorarani: 'arani',
	arani: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><b><font color = "#331D81" size = 3>∆Arani∆</font></b><br>' +
			'<i>"Rain teams are old school? Well... screw you."</i><br><br>' +
			'<b>Skilled in:</b> Gen 5 OU - was consistently in the Top 10 on the global OU ladder.<br>' +
			'<b>History:</b> First new Champ of Sora - ressurrected it along with Onyx.<br>' +
			'<b>Present:</b> Serving in the defense force - Occasionally comes online.<br>' +
			seen('sorarani') + '<br>' +
			'<img src = "http://play.pokemonshowdown.com/sprites/xyani/keldeo-resolute.gif"><img src = "http://play.pokemonshowdown.com/sprites/xyani/thundurus-therian.gif">');
	},

	arjunb: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><input type="image" src="http://i.imgur.com/bnCFCm5.png"><div align="center"><br />' +
			'<div align="center">"<i>Fall seven times, stand up eight. That\'s what I do</i>"</div><br />' +
			'<b>Favorite Types:</b> Fighting, Dark and Poison(with crobat)<br />' +
			'<b> Achievements:</b> Former Elite, got the elite position in his first promo tournaments.<br />' +
			'<b>Favorite Pokemon:</b><br />' +
			'<img src="http://play.pokemonshowdown.com/sprites/xyani/terrakion.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/weavile.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/medicham-mega.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/crobat.gif"><div align="center"><br />' +
			+getBadges('arjunb'));
	},

	ascher: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><b><font size="4" color="86e755">Ascher</font></b></center><br />' +
			'<center><img src="http://play.pokemonshowdown.com/sprites/xyani/shroomish.gif"></center> <br />' + getBadges('frontierasch'));
	},

	azh: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<div style = "padding: 8px; color: #1B2A59; background: #000 url(https://67.media.tumblr.com/1c8df8b90843d1f29c2daec235f20c3a/tumblr_o8chi3z52U1v5aa3xo1_1280.png) no-repeat scroll bottom; background-size: 100%;">' +
			'<center><b><font size= 5>∆ArthurZH∆</font></b></center><br />' +
			'<center><i>"The power of the seas, storms and rivers are mine to hold....and here you dare to stand before me?"</i></center> <br />' +
			'<center><b>Favoured Type:</b> Water<br />' +
			'<b>Favoured Metagame:</b> Smogon Doubles <br />' +
			'<b>Favourite Pokemon:</b> Gyarados<br />' +
			'<b>Achievements:</b> Ex Water Leader of Sora, Ex Roulette/Champion\'s Challenge/Monotype Frontier of Sora<br />' +
			'<b>Current Position:</b> Doubles OU Frontier</center><br />' + getBadges('sorazachary') + '<br><br><br>' +
			'<center><details><summary>Sprites!</summary><center><img src="http://fc00.deviantart.net/fs71/f/2014/082/f/8/manaphy_gif_by_gloomymyth-d7bakkc.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/keldeo-resolute.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/tentacruel.gif"><img src="http://www.pokemonreborn.com/custom/44203.png?530"> <img src="http://play.pokemonshowdown.com/sprites/xyani/volcanion.gif"><img src="http://www.pkparaiso.com/imagenes/xy/sprites/animados/swampert.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/gyarados.gif"></center></details></center>' +
			'<center><font size=2><b>Battle Theme</b> - <i>Hoenn Oceanic Museum Remix [Credits: GlitchXCity]</i></font><br \><audio src="https://dl.pushbulletusercontent.com/rd0Qhn6drs85cyLNk7XIxGmwLQHQl4q1/Atmosphere-%20Bright.mp3" controls="" border: 2px solid #76BCBE ; background-color: #76BCBE" target="_blank"></audio></center><br \>' +
			'<font size=1>P.S. All credits for artwork goes to Tempest (ABootToTheHead), sprite imaging to Showdown!, and avatar imaging to Reborn Sprite Gallery and corresponding artists!</font><br>');
	},

	bamdee: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><span style = "font-size: 15pt; color: #ff00b6;"><b>Bamdee</b></span></center><br>' +
			'<center><img src="http://play.pokemonshowdown.com/sprites/xyani/ditto.gif"></center><br>' +
			'<audio controls src = "https://dl.pushbulletusercontent.com/xFgUAMGfNsNhld0TC7Bf9nehzEiVRkGo/sonic.mp3" style = "border: 2px solid pink; background: black; width: 100%;"></audio><br>' +
			getBadges('bamdee')
		);
	},

	soradarkus: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply('|html|<head><link href="https://fonts.googleapis.com/css?family=Rock+Salt" rel="stylesheet"><style> {font-family: Rock Salt, serif;} </style></head>' +
			'<body><div style = "color: white; width: 100%; padding: 0px 10px 10px 10px; background: linear-gradient(156deg, #e60000, #990000, #330000, #990000, #e60000, #990000, #330000, #e60000);">' +
			'<center><span style = "font-size: 22pt; font-weight: bold; color: ' + hashColor('soradarkus') + '">∆SoraDarkus∆</span><br>' +
			'<i>"It\'s all shits and giggles until someone giggles and shits."</i><br><br><br>' +
			'<b>Skilled in:</b> Monotype<br>' +
			'<b>Preferred types:</b> Dark, Psychic and Steel<br>' +
			'<b>Achievements:</b> Sora E4, Gym Leader<br><br>' +
			'<img src = "http://play.pokemonshowdown.com/sprites/xyani/bisharp.gif"> <img src = "http://play.pokemonshowdown.com/sprites/xyani/weavile.gif" style = "transform: rotateY(180deg)"><br><br>' +
			'<b>Known For:</b> Being one of the original members of Sora and inconsistent activity<br></body>' +
			seen('soradarkus') + '<br>' + getBadges('soradarkus'));
	},

	edgy: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<a><font size= 4><center><b><font color = 00CCFF>Edgy</font></b></center></a><br />' +
			'<center><img src="http://play.pokemonshowdown.com/sprites/xyani/gardevoir-mega.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/lopunny-mega.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/charizard-mega-x.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/lopunny-mega.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/gardevoir-mega.gif"></center> <br />' +
			'<center><i>"How can you face your problem, if the problem is your face?"</i></center><br />' +
			'<details><summary><font size= 1><b>Badges: (Click here to open)</b></font></summary><br />' +
			'<a href="http://soraleague.weebly.com/badges.html#ldr"><img src="http://i.imgur.com/ELFPzW8.png" title="Achieved Gym Leader Status"></a><a href="http://soraleague.weebly.com/badges.html#e4"><img src="http://i.imgur.com/QtECCD9.png" title="Achieved Elite 4 Status"></a><a href="http://soraleague.weebly.com/badges.html#aegislash"><img src="http://i.imgur.com/aJY3eKg.png" title="Winner of Sora\'s first major Monotype Round Robin Tour"></a></details> <br />');
	},
	
	floatmeme: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply('|html|<div style = "padding: 7px; text-align: center; border: 2px solid black; background: radial-gradient(circle, #0d0d0d, #1a1a1a, #0d0d0d, #1a1a1a, #0d0d0d, #1a1a1a, #0d0d0d, #1a1a1a);">' +
			'<font size = 4 color = "white"><b><a title="dat me">Float</a></b></font><br><br>' +
			
                        '<table align = "center" border = "0px" style = "color: "black">' +
			'<tr><td style = "background: rgba(250, 250, 250, 0.3); width: 200px; height: 120px">' +
			'<li style = "padding: 3px">One of Sora\'s oldest staff' +
			'<li style = "padding: 3px">Resident leader of over 6 types' +
                        '<li style = "padding: 3px">Past Frontier and first challenger to reach Elite Four in Champion\'s Challenge</td>' +

			'<td style = "padding: 0px 8px 0px 8px;"><img width=50 src = "https://66.media.tumblr.com/9697ebbc4887dc57620c50a12f24c61d/tumblr_nc1rokF7r31s1rd1xo1_500.gif"></td>' +

			'<td style = "background: rgba(250, 250, 250, 0.3); width: 200px;">' +
			'<li style = "padding: 3px">Resident shitposter and edgelord' +
			'<li style = "padding: 3px">Competitively uses sirskuit</td></tr></table><br>' +
			'<center><img src="http://play.pokemonshowdown.com/sprites/xyani/rotom.gif">&nbsp;&nbsp;&nbsp;&nbsp;<img src="http://play.pokemonshowdown.com/sprites/xyani/jirachi.gif"></center><br>' +
			getBadges('sorafloat') + '</div>');
	},

	heatah: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let img = (num) => {
			let str = '';
			for (let i = 0; i < num; i++) str += '<img src = "http://play.pokemonshowdown.com/sprites/xyani/magneton.gif">';
			return str;
		}
		this.sendReply('|html|<center><div style = "background: radial-gradient(circle, #ffe500, #000f30, #00091e, #000f30, #ffe500, #000f30, #00091e);">' +
			img(5) + '<br>' + img(1) +
			'<i><b><span style = "font-size: 20px;"><a href = "http://replay.pokemonshowdown.com/monotype-268612935">Zap Cannon Sweep</a></span></b></i>' + img(1) + '<br>' +
			img(5) + '</div>'
		);
	},
	leafy: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply('|html|<div style = "padding: 5px; text-align: center; background-image: url(http://i1171.photobucket.com/albums/r545/Brahak/maple_zpsg5sgjduk.jpg) no-repeat scroll bottom; background-size: cover;">' +
			'<font size = 4 color = "white"><b>∆Leaf∆</b></font><br><br>' +
			'<table align = "center" border = "0px" style = "color: #707c71">' +
			'<tr><td style = "background: rgba(0, 0, 0, 0.9); width: 200px; height: 120px"><b><u><span style = "font-size: 10pt">Achievements</span></u></b><br>' +
			'<li style = "padding: 3px">Successfully ran two leagues.' +
			'<li style = "padding: 3px">Been a Gym Leader, Elite Four, and Frontier in Sora.</td>' +
			'<td style = "padding: 0px 8px 0px 8px;"><img src = "http://play.pokemonshowdown.com/sprites/xyani/grovyle.gif"></td>' +
			'<td style = "background: rgba(0, 0, 0, 0.9); width: 200px;"><b><u><span style = "font-size: 10pt">Known for</span></u></b><br>' +
			'<li style = "padding: 3px">Scarf Kyurem set.' +
			'<li style = "padding: 3px">Mega Blastoise and Cinccino favourites.' +
			'<li style = "padding: 3px">Resident drunk of Sora.</td></tr></table><br>' +
			'<table align = "center"><tr><td><div style = "display: inline-block; width: 120px; height: 101px; background: url(http://www.pkparaiso.com/imagenes/xy/sprites/animados/leafeon-2.gif) no-repeat 0px -70px"></div></td>' +
			'<td><div style = "transform: rotateY(180deg); display: inline-block; width: 120px; height: 101px; background: url(http://www.pkparaiso.com/imagenes/xy/sprites/animados/leafeon-2.gif) no-repeat 0px -70px"></div></td></tr></table>' +
			'<center><audio controls src = "https://dl.pushbulletusercontent.com/91078HKzh36ORZdMm7EaE2suEdL7iwr1/Devil%20Survivor%202%20-%20Septentrion%20%5Bwww.songmirror.org%5D.mp3" style = "width: 100%; border-radius: 0px; background: linear-gradient(45deg, #011100, #00ad17, #011100, #00ad17, #011100, #00ad17, #011100, #00ad17);"></audio><br>' +
			getBadges('soraleaf') + '</div>'
		);
	},

	jerattata: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply('|html|<table style = "box-shadow: 2px 2px 10px black; text-shadow: 0px 0px 10px; padding: 7px; width: 100%; background: radial-gradient(circle, black, #000d70, black, #000d70, black, #000d70); color: #8CC6FB;">' +
			'<tr><td colspan = 2 style = "padding-bottom: 7px"><center><b style = "font-size: 15pt">∆Jerattata∆</b><br>' +
			'<i>"I am not a man who writes, but a man who is written about."<br> - A man of Action</i><br>' +
			'<img src = "http://play.pokemonshowdown.com/sprites/xyani-shiny/rattata.gif"><img src = "http://sprites.pokecheck.org/i/235.gif"><img src = "http://sprites.pokecheck.org/t/033.gif"><img src = "http://play.pokemonshowdown.com/sprites/xyani-shiny/mamoswine.gif"></center>' +
			'<audio controls src = "https://dl.pushbulletusercontent.com/zvNULWYufM42wsTK3xNPoscIp4UT4m14/sugar.mp3" style = "width: 100%; background: black; border: 1px solid blue; border-radius: 0px;"></td></tr>' +

			'<tr><td><center><img src = "http://oi62.tinypic.com/14cfyh0.jpg"></center></td>' +
			'<td style = "box-shadow: 2px 2px 10px black; padding: 5px; margin-right: 3px; width: 220px; background: rgba(33, 37, 38, 0.7)"><center>' +
			'<small><b><u>Highly skilled in</u></b><br><li style = "padding: 2px;">VGC and Monotype<br><br>' +
			'<b><u>Skilled in</u></b>' +
			'<li style = "padding: 2px;">Making quotes' +
			'<li style = "padding: 2px;">Making backgrounds for Sora' +
			'<li style = "padding: 2px;">Creating custom EV sets' +
			'<li style = "padding: 2px;">Strategizing<br><br>' +
			'<b><u>History</u></b>' +
			'<li style = "padding: 2px;">Greatest Ice E4 and <s>undefeated</s> Dragon E4' +
			'<li style = "padding: 2px;">Top 8 VGC 2014 Regionals</small></td></tr>' +
			'<tr><td colspan = 2><center><img src = "http://play.pokemonshowdown.com/sprites/xyani/torkoal.gif" style = "transform: rotateY(180deg)"><img src = "http://play.pokemonshowdown.com/sprites/xyani-shiny/torterra.gif" style = "transform: rotateY(180deg)"><img src = "http://play.pokemonshowdown.com/sprites/xyani-shiny/blastoise.gif" style = "transform: rotateY(180deg)"><img src = "http://play.pokemonshowdown.com/sprites/xyani/aggron-mega.gif"><br>' +
			'<audio controls src = "https://dl.pushbulletusercontent.com/a8L7ZScvc1RPgHylxZemiTqeO1PagA22/shellshocked.mp3" style = "width: 100%; background: black; border: 1px solid blue; border-radius: 0px;"></center></td></tr>' +
			'<tr><td colspan = 2><center>' + getBadges('frontierjerattata') + '</center></td></tr></table>'
		);
	},

	meowsofsora: function (target, room, user) {
        	if (!this.runBroadcast()) return;
		this.sendReply('|html|<div style = "padding: 2px;border-radius:7px; border: 3px solid #0075ce; background:url(http://img09.deviantart.net/bac5/i/2014/141/f/2/_wallpaper__arctic_christmas_by_arkeis_pokemon-d35nvwt.jpg);' +
        	    'background-size: cover; background-repeat: no-repeat;">' +
        	    '<center><b style = "color: #00e5ff; text-shadow: 0px 0px 6px #00bbff, 0px 0px 8px, 0px 0px 10px; font-size: 16pt">MeowsOfSora</b><br>' +
        	    '<i style = "color: #00e5ff; text-shadow: 1px 1px 2px #444, 0px 0px 6px #00bbff, 0px 0px 8px, 0px 0px 10px; ">"I might be a bitch, but I\'m definitely not a pussy"</i><br><br>' +
        	    '<img src = "http://play.pokemonshowdown.com/sprites/xyani/froslass.gif"><img src = "http://play.pokemonshowdown.com/sprites/xyani/latios.gif">' +
        	    '<img src = "http://play.pokemonshowdown.com/sprites/xyani/walrein.gif"><img src = "http://play.pokemonshowdown.com/sprites/xyani/jirachi.gif">' +
        	    '<img src = "http://play.pokemonshowdown.com/sprites/xyani/weavile.gif"><br><br>' +
        	    '<div style = "margin: 4px; display: inline-block; padding: 4px;background: rgba(168,223,243,0.7); width: 40%; border-radius: 5px; color: #116CA0; text-shadow: 0px 0px 4px #008BEE, 0px 0px 8px #008BEE; box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.8)"><u><b>Achievements</u></b><br>' +
        	    '<li>Top 20 OU/OU No Mega' +
        	    '<li>Top 300 Monotype' +
        	    '<li>Most symbol defends on Sora' +
        	    '</div>' +
        	    '<div style = "margin: 4px; display: inline-block; padding: 4px;background: rgba(168,223,243,0.7); width: 40%; border-radius: 5px; color: #116CA0; text-shadow: 0px 0px 4px #008BEE, 0px 0px 8px #008BEE; box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.8)"><u><b>About Me</u></b><br>' +
        	    '<li>Kpop thrash' +
        	    '<li>abs worshipper' +
        	    '<li>ice ice baby' +
        	    '</div><br><br><br>' +
        	    '<center><font size=2 color=#0000FF><i><b>현아</b> - Because I\'m the Best (Feat. 정일훈)</i></font><br><audio controls src="https://dl.pushbulletusercontent.com/jff9FOcg7fLsplNbywP27oPEry1D7xZg/HYUNA%20-%20%EC%9E%98%EB%82%98%EA%B0%80%EC%84%9C%20%EA%B7%B8%EB%9E%98.mp3" style="width: 100%"></center><br>' + getBadges('ignatiuspyx'));
    },

	night: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><i><font color="blue"><h1>Nightanglet</h1></font></center><br>' +
			'<font color = "blue"><b>Ace: Infernape(CR Ace:Rhydon)<br />' +
			'Custom Rules:<br />' +
			'- No poke above the base speed of 40<br />' +
			'- No Hazards<br />' +
			'-Speed should not be increased or decreased<br />' +
			'</b></i><img src="http://play.pokemonshowdown.com/sprites/xyani-shiny/infernape.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/rhydon.gif">');
	},

	silver: 'silveee',
	siiilver: 'silveee',
	silvertactic: 'silveee',
	silveeee: 'silveee',
	silveee: function (target, room, user) {
		if (!this.runBroadcast()) return;

		function colorify(text) {
			let colors = ['red', 'orange', 'yellow', 'lime', '#007fff', 'cyan', '#9800ff', 'violet'],
				set = [];
			for (let i = 0, j = 0; i < text.length; i++) {
				set.push(text[i].trim() ? '<span style = "color: ' + colors[j] + '; text-shadow: 0px 0px 10px;">' + text[i] + '</span>' : text[i]);
				if (!text[i].trim()) continue;
				if (j === colors.length - 1) j = 0;
				else j++;
			}
			return set.join('');
		}
		let msg;
		if (Users('silveee') && Users('silveee').connected) {
			msg = '<button name = "send" value = "/me flips cash at Silvy-chan :D" style = "margin: 3px; transform: skewX(-30deg); text-shadow: 0px 0px 5px; border: 1px solid gold; background: black;"><div style = "transform: skewX(30deg)"><b>' + colorify('$$$ Click 2 flip cash at me! $$$') + '</b></span></button><br>' +
				'<button name = "send" value = "/me pets Silvy-chan :3" style = "margin: 3px; color: silver; transform: skewX(-30deg); text-shadow: 0px 0px 5px; border: 1px solid gold; background: black;"><div style = "transform: skewX(30deg)"><b>' + colorify('Pet me') + ' :3</b></span></button>' +
				' <button name = "send" value = "/kick ' + Users('silveee').name + ', 2sexy4us" style = "margin: 3px; color: silver; transform: skewX(-30deg); text-shadow: 0px 0px 5px; border: 1px solid gold; background: black;"><div style = "transform: skewX(30deg)"><b>' + colorify('Kick me') + ' :D</b></span></button>';
		} else msg = '<span style = "color: gold; text-shadow: 0px 0px 5px">Last seen in da hood <b>' + colorify(Seen.get('silveee').join(', ') + ' ago') + '</b></span><br>';
		this.sendReply('|html|<center><div style = "border-radius: 7px; padding: 5px; box-shadow: 2px 2px 5px black; background: radial-gradient(circle, #1c1c1c, #333232, #1c1c1c, #333232, #1c1c1c, #333232);">' +
			'<b style = "font-size: 17pt;">' + colorify('☆☆☆☆☆☆☆☆ S I L V E E E E ☆☆☆☆☆☆☆☆') + '</b><br>' +
			'<i><span style = "color: silver; text-shadow: 0px 0px 5px;">"i liek fucking goats"</span></i><br>' +
			'<br><div style = "display: inline-block; width: 49%"><img style = "max-height: 100%; max-width: 100%;" src = "http://data.whicdn.com/images/56986059/large.gif"></div> ' +
			'<div style = "display: inline-block; width: 49%"><img style = "max-height: 100%; max-width: 100%;" src = "http://i.skyrock.net/1358/86461358/pics/3227855009_1_10_BQlwaOHj.gif"></div><br>' +
			msg + '<br><span style = "text-shadow: 0px 0px 5px"><b>' + colorify('Known 4:') + '</b>' +
			'<span style = "color: silver; text-shadow: 0px 0px 5px"><li>Being a verr verr gud chat presence' +
			'<li>Breaking the server. Cuz Server-Kun\'s dense af<br>' +
			'<li><a style = "color:#00d4ff;" href = "https://www.youtube.com/watch?v=0CirgVj8Baw">THE POWER OF WEEB</a></span><br>' +
			(user.userid in {
				silvertactic: 1,
				siiilver: 1,
				silveee: 1
			} ? '' : '<br><span style = "text-shadow: 0px 0px 5px"><b><span style = "color: lime;">P</span><span style = "color: blue;">.</span><span style = "color: cyan;">S</span><span style = "color: violet;">.</span></b>- <span style = "color: silver">' + user.name + '\'s a n00b</span></span><br>') +
			'<br><span style = "color: gold">' + getBadges('silveee').replace('<b>Badges:</b> (Click here to open)', '<b> ' + colorify('Badges:') + '</b> ' + colorify('(Click here to open)'))
		);
	},

	swearwip: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply('|html|<table style = "color: white; width: 100%; padding: 0px 10px 10px 10px; background: linear-gradient(45deg, #67108c, #3c0654, #67108c, #3c0654, #67108c, #3c0654, #67108c, #3c0654, #67108c, #3c0654);">' +
			'<tr><td colspan = "2"><center><br><font size = 3 style = "margin-top: 10px; font-weight: bold; text-shadow: 3px 3px 10px black;">∆Srewop∆</font><br>' +
			'<i style = "text-shadow: 3px 3px 10px black;">"I think you\'re in Gotham, \'cause the bat is coming for you..."</i><br><br></td></tr>' +
			'<tr><td><center style = "text-shadow: 3px 3px 10px #000;"><b>Symbol:</b> SumTingWong<br><b>Battle Format:</b> RU Monotype<br>' +
			'<b>Restrictions:</b><br><li>No Hazards<li>No Knock Off<br>' +
			'<b>Ace:</b> Golbat<br>' +
			'<img style = "margin: -5px" src = "http://www.pkparaiso.com/imagenes/xy/sprites/animados/golbat-2.gif"></center></td>' +
			'<td style = "text-shadow: 0px 0px 8px #d87fff; box-shadow: 0px 0px 40px #000; background: rgba(0, 0, 0, 0.7); width: 200px; color: #e6b2ff; text-align: center;">' +
			'<u><b><font size = 2>Achievements</font></b></u>' +
			'<li style = "padding: 5px;">Elite Frontier of Sora' +
			'<li style = "padding: 5px;">Ranked Top 20 on the PU ladder' +
			'<li style = "padding: 5px;">Ranked Top 400 on the RU ladder<br><br>' +
			'<u><b><font size = 2>Known for</font></b></u>' +
			'<li style = "padding: 5px;">Sub/DD Lapras' +
			'<li style = "padding: 5px;">Doctor of Sora' +
			'<li style = "padding: 5px;">GOLBAT MOTHER FUCKER</tr></center>' +
			'<tr><td colspan = 2><center><font size = 2 style = "text-shadow: 0px 0px 15px #d170ff;"><i style = "color: rgba(0, 0, 0, 0.8);"><b><font size = 2>Pokémon Reborn:</font></b> Byxbysion Wasteland theme</i></font><audio controls src = "https://dl.pushbulletusercontent.com/U6jcDqHbeUTxoZz8LKB3IgwK8u3970rA/Atmosphere-%20Findmuck.mp3" ' +
			'style = "width: 100%; background: linear-gradient(135deg, black, #b516ff, black, #b516ff, black, #b516ff, black, #b516ff, black, #b516ff); box-shadow: 0px 0px 15px #d170ff;"></td></tr>' +
			'<tr><td colspan = 2 style = "text-shadow: 0px 0px 8px #d170ff; color: rgba(0, 0, 0, 0.8);"><center>' + getBadges('frontiersrewop') + '</center></td></tr></table></div>');
	},

	terror2: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply('|html|<div style = "padding: 7px; border: 2px solid black; color: white; background: radial-gradient(circle, #1919c1, #2143ed, #1919c1, #2143ed, #1919c1, #2143ed, #1919c1, #2143ed);"><center><b><font size="4" color="82127a">Terror</font></b></center><br>' +
			'<center><i>"Looking for dank memes"</i> </center><br /><br />' +
			'<b>Ace: </b>Mega Sharpedo/Garchomp<br />' +
			'<b>Skilled at: </b>Being incredibly annoying, Balanced Hackmons, Certain Monotypes.<br />' +
			'<b>Achievements: </b><br />' +
			'<li>Best Ex-Electric & Ground Leader of Sora<br />' +
			'<li>Current Water Leader of Sora<br />' +
			'<li>Ex-Balanced Hackmons Frontier of Yagagadrazeel<br />' +
			'<li>Achieved Top 10 in the Balanced Hackmons ladder<br />' +
			'<li>Achieved Top 25 in the Ubers ladder<br />' +
			'<img src="http://play.pokemonshowdown.com/sprites/xyani-shiny/greninja.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/ferrothorn.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani-shiny/sharpedo.gif"><img src="http://play.pokemonshowdown.com/sprites/xyani/garchomp.gif">' +
			getBadges('e4terror'));
	},

	trainergasp: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('Trainer <b>gasp</b><br />' +
			'<i>"Lights out."</i> <br />' +
			'<b>Ace:</b> Mega Gengar<br />' +
			'<b>Honours:</b> Sora\'s first challenger to reach Hall of Fame.<br />' +
			'<b>Prefered Tier:</b> Balanced Hackmons' +
			'<img src="http://pldh.net/media/pokemon/gen5/blackwhite_animated_front/302.gif"> <img src="http://media.tumblr.com/tumblr_m6ci5tQsEv1qf6fp2.gif"><br />' + getBadges('gasp'));
	},

	you: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply('|html|<div style = "cursor: url(http://cur.cursors-4u.net/games/gam-8/gam703.cur), default; border: 2px solid #7f00c9; border-radius: 10px; padding: 5px; color: #87d7ff; text-shadow: 0px 0px 5px; background-image: url(http://images.designtrends.com/wp-content/uploads/2015/11/26092829/Purple-Backgrounds8.jpg); background-size: cover;">' +
			'<center><b><span style = "color: #ff87e9; font-size: 16pt; text-shadow: 2px 2px 10px black">Youmaton</span></b><br>' +
			'<i style = "font-size: 9pt; color: #ff87e9; text-shadow: 1px 1px 3px black">"A little sparkle will fix that right up... Wait no that\'s a diamond storm"</i><br>' +
			'<img src = "http://play.pokemonshowdown.com/sprites/xyani/azumarill.gif"><img src = "http://play.pokemonshowdown.com/sprites/xyani/infernape.gif">' +
			'<img src = "http://play.pokemonshowdown.com/sprites/xyani/diancie-mega.gif"><img src = "http://play.pokemonshowdown.com/sprites/xyani/togekiss.gif">' +
			'<img src = "http://play.pokemonshowdown.com/sprites/xyani/clefable.gif"><br><br>' +
			'<b style = "font-size: 9pt;">Best With:</b> Fairy and Flying Monotype, Hackmons Cup, UU<br><br>' +
			'<b style = "font-size: 9pt;">Bragging Rights:</b><br>' +
			'<li>Greatest Fairy Leader<br>' +
			'<li>UU Frontier<br>' +
			'<li>30+ GL Defends club<br>' +
			'<audio controls src = "https://dl2.pushbulletusercontent.com/gxrmXAXogKMLTn4qJDXbFynuhX3oTzuv/Bravely%20second.mp3" style = "width: 90%; border-radius: 5px; border: 1px solid violet; background: linear-gradient(45deg, #ebadff, #9600c4, #ebadff, #9600c4, #011100, #ebadff);"></center></div>'
		);
	},
	
	zeno: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply('|html|<div style="background-image: url(&quot;https://media.giphy.com/media/cFU3qzhgMi0bC/giphy.gif&quot;) ; background-size: 100% 100%">'+
			       '<center><img src="http://i.imgur.com/xyJHThm.png" width="320" height="100" alt="Imp Zeno" /></center><hr width="383" size="1">'+
			       '<center><button class="astext" name="parseCommand" value="/user Imp Zeno" style="border-radius: 20px ; border: 1px solid ; padding: 0px ; color: maroon ; box-shadow: 0px 0px 22px 5px rgba(255 , 255 , 255 , 0.5) ; background: rgba(0 , 0 , 0 , 0)">'+
			       '<img src="http://192.99.54.194:8080/avatars/impzeno.png" height="80" width="80"></button><span style="display:inline-block; width: 100px;"></span>'+
			       '<button class="astext" name="parseCommand" value="/user xZeno" style="border-radius: 20px ; border: 1px solid ; padding: 0px ; color: maroon ; box-shadow: 0px 0px 22px 5px rgba(255 , 255 , 255 , 0.5) ; background: rgba(0 , 0 , 0 , 0)">'+
			       '<img src="http://i.imgur.com/ytxNDKf.png" height="80" width="80"></button><span style="display:inline-block; width: 100px;"></span><button class="astext" name="parseCommand" value="/user Zeno Testing" style="border-radius: 20px ; border: 1px solid ; padding: 0px ; color: maroon ; box-shadow: 0px 0px 22px 5px rgba(255 , 255 , 255 , 0.5) ; background: rgba(0 , 0 , 0 , 0)">'+
			       '<img src="http://i.imgur.com/78Wi9LT.gif" height="80" width="80"></button></center><br><hr width="383" size="1"><center><font color="white" size="2" face="verdana"><i>Imperium LC Frontier</i><br><br><i>Avis made by SeoKing</i> || <i>TC made by Wando</i></font></center><br></div>');
	},

	showtier: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><img src="http://i.imgur.com/DI9T4Y6.png" width=550></center>');
	},


	/*********************************************************
	 * Music Cards
	 *********************************************************/

	feelingit: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<div class="infobox" style="cursor: url(&quot;http://i.imgur.com/c4qM0iM.gif&quot;) , auto; border: 0px ; background-image: url(&quot;http://files.gamebanana.com/img/ss/wips/4ffc9f6bed5e2.jpg&quot;) ; background-size: cover"><br \>' +
			'<br \><center><b><font color=#FF9900 size=2>You Will Know Our Names</b></font><font color=#FF9900 size=2> \- <i>Xenoblade Chronicles</i></font><br \>' +
			'<audio src="http://www.ssbwiki.com/images/f/f5/Victory%21_%28Shulk%29.ogg" controls="" style="width: 100% ; border: 2px solid #00CC00 ; background-color: #00000a" target="_blank"></audio></center><br \><br \>');
	},

	easymoney: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<div style="background-image: url(&quot;http://i.imgur.com/orlVvMg.jpg&quot;) ; background-size: cover" target="_blank"><br \>' +
			'<br \><center><font size=3 color=#FF9900><b>Easy Money</b> - <i>Bizzaro Flame</i></font><br \>' +
			'<audio src="https://dl.pushbulletusercontent.com/qrAveUFTyNQlmvq3HEtlqSmBiuQeUaaQ/Easy%20Money.mp3" controls="" loop style="width: 100% ; border: 2px solid #00CC00 ; background-color: #00000a" target="_blank"></audio></center><br \><br \><br /><br /><br /><br /><br /><br /><br /><br />');
	},

	afraud: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<div style="background-image: url(&quot;http://i.imgur.com/jBfZq5A.jpg&quot;) ; background-size: cover"><br \><br /><br /><br /><br /><br /><br /><br /><br />' +
			'<br \><center><font size=3 color=#00FF40><b>A Fraud</b> - <i>Izzaro Flame</i></font><br \>' +
			'<audio src="https://dl.pushbulletusercontent.com/Pl3dDtxvFMbdAn6IZQHAF6gxFluLoAhA/A%20Fraud%20-%20%20A%20Big%20Fraud.mp3" controls="" loop style="width: 100% ; border: 2px solid #58FAF4 ; background-color: #00000a" target="_blank"></audio></center><br \><br \>');
	},

	getrekt: 'rekt',
	rekt: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><img src = "https://lh3.googleusercontent.com/-6BDWwnjS9Cs/VajnpfmQumI/AAAAAAAAD7s/u1hZqlM09s0/w500-h200/img-3516109-1-Mc5cCal.gif">' +
			'<audio autoplay controls style = "border: 2px solid red; background: black; width: 100%" src = "http://www.myinstants.com/media/sounds/wombo-combo_2.mp3">' +
			'</audio></center>');
	},

	nojohns: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<div style = "background: url(http://i.imgur.com/dTD1J7o.gif); text-align: center; height: 299px; background-size: cover;"><span style = "color: red; font-weight: bold; font-size: 13pt;">No Johns</span><br>' +
			'<audio controls src = "http://s0.vocaroo.com/media/download_temp/Vocaroo_s0JSb5SljS5I.mp3" style = "border: 1px solid yellow; border-radius: 0px; background: black; width: 100%"></audio>'
		);
	},

	lyin: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply('|html|<div class = "infobox" style = "background: url(https://thoughtcatalog.files.wordpress.com/2015/09/screen-shot-2015-09-03-at-8-40-19-pm.png?w=786&h=600) no-repeat 0px -30px; background-size: 100%; height: 300px;">' +
			'<audio controls src = "http://b.sc.egghd.com/media/b0/a2/b0a2bf0d5e10ef92fcd8726640fabdb9.mp3?id=223206908&key=eadd7f5398105057d30329e22c595d27e4ce8794" style = "float: right; margin-top: 100px; margin-right: 5px; background: black; border: 2px solid red;"></div>'
		);
	},

	lyinfull: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><span style = "font-size: 12pt; color: red;"><i>Lyin\'</i></span><br>' +
			'<video controls src = "https://dl.pushbulletusercontent.com/PlrszI1cm30CsAtEGVfnefB2w9HVsyh4/lyin.mp4#t=56" style = "width: 100%"></center>'
		);
	},

	ichibannotakaramono: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<div class="infobox" style="border: 0px ; background-image: url(&quot;http://img2.wikia.nocookie.net/__cb20101231031301/angelbeats/images/f/f5/EP10-Yui-and-Hinata-500x281.png&quot;) ; background-size: cover" target="_blank">' +
			'<center><font size=2 color=#0066FF><b>Original Version</b> - <i>Karuta</i></font><br \><audio src="https://dl.pushbulletusercontent.com/NBtI15PWK0EQDXkB8YNqKe6YZYWpLHaO/19%20-%20Ichiban%20no%20Takaramono%20%28Original%20Version%29.mp3" controls="" target="_blank"></audio><br /><br /><br /><br /><br /><br /><br /><br />' +
			'<br \></center><b><font size=2 color=#FF0000>  一番の宝物</b></font><font size=2 color=#FF0000> \- <i>Angel Beats</i></font><br /><font size=1>Ichiban no Takaramono</font><center><br \><br \><br \><br \><br \><br \><font size=2 color=#0099FF><b>Yui\'s Version</b> - <i>Girls Dead Monster, feat. LiSA.</i></font><audio src="https://dl.pushbulletusercontent.com/5CLffau3dUgPCVIPwKyIQUjblB4NgQ5G/09%20-%20Ichiban%20no%20Takaramono%20%20%28Yui%20ver.%29.mp3" controls="" target="_blank"></audio></center>');
	},

	feelthebern: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<img src="https://timedotcom.files.wordpress.com/2016/02/bernie-sanders13.jpg?quality=75&strip=color&w=1100" height=350 width=450> <br />');
	},
	
	testcard: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply('|html| <table border="3"><thead><tr>Heading 1</tr><tr>Heading 2</tr></thead><tbody><tr><td contenteditable=true>Test</td><td contenteditable=true>Test</td></tr><tr><td contenteditable=true>Test</td><td contenteditable=true>Test</td></tr></tbody></table>' );
	},


	/*********************************************************
	 * Priomons Cards
	 *********************************************************/

	incweather: 'incweather',
	incweather: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('Here is a detailed explanation of the format Inclement Weather:<br />' +
			'- <a href="http://soraleague.weebly.com/inclement-weather.html">Inclement Weather</a><br />' +
			'</div>');
	},

	nervepulse: 'priomonsnervepulse',
	priomonsnervepulse: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<img src="http://oi58.tinypic.com/ayw0aq.jpg"> <br />');
	},

	tremorshock: 'priomonstremorshock',
	priomonstremorshock: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<img src="http://oi58.tinypic.com/14u8e2s.jpg"> <br />');
	},

	fairywind: 'priomonsfairywind',
	priomonsfairywind: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<img src="http://oi60.tinypic.com/33z7ndf.jpg"> <br />');
	},

	twineedle: 'priomonstwineedle',
	priomonstwineedle: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<img src="http://oi58.tinypic.com/9h6i5z.jpg"> <br />');
	},

	dracocrash: 'priomonsdracocrash',
	priomonsdracocrash: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<img src="http://oi59.tinypic.com/dyvvw2.jpg"> <br />');
	},

	flameshot: 'priomonsflameshot',
	priomonsflameshot: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<img src="http://oi62.tinypic.com/29m6j5e.jpg"> <br />');
	},

	venomstrike: 'priomonsvenomstrike',
	priomonsvenomstrike: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<img src="http://oi60.tinypic.com/2wf761w.jpg"> <br />');
	},

	divingcharge: 'priomonsdivingcharge',
	priomonsdivingcharge: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<img src="http://oi58.tinypic.com/ezj4pl.jpg"> <br />');
	},

	stonespine: 'priomonsstonespine',
	priomonsstonespine: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<img src="http://oi62.tinypic.com/2moy06e.jpg"> <br />');
	},

	sapblast: 'priomonssapblast',
	priomonssapblast: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<img src="http://oi62.tinypic.com/23rk9oz.jpg"> <br />');

	},

	kineticforce: 'priomonskineticforce',
	priomonskineticforce: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<img src="http://oi60.tinypic.com/1ptn36.jpg"> <br />');
	},

	/*********************************************************
	 * Informative Cards
	 *********************************************************/

	leaderranks: 'ranks',
	ranks: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('Listed here are the Top 3 Leaders in The Sora League based on performance in our Monthly Promotional Tournament! Please keep in mind, the number of ranked Leaders may change month to month and the ranking methodology may be changed in the future.<br />' +
			'-<b>1st <font color= ffa5d5>Bigo</font></b> (Normal)<br />' +
			'-<b>2nd <font color= aa00ff>Zoro</font></b></b> (Poison)<br />' +
			'-<b>3rd <font color= ff42a0>You</font></b> (Fairy)<br />' +
			'</div>');
	},

	donate: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<center><font size = 2>If you wish to donate to the server, please click on the button below.<br>' +
			'<a href = "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=Q3B5Z6STF3EA4&lc=AU&item_name=Sora&currency_code=AUD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img src = "https://www.paypalobjects.com/en_AU/i/btn/btn_donate_SM.gif"></a><br>' +
			'Remember to mention your username when you leave a note with your donation, or we won\'t know who donated. To all of those who\'ve donated or plan on donating, thank you! We really appreciate it!</center></font><br><br>' +
			'<b>All donators will have their name displayed on a donators list as a way of saying Thank You!</b><br>' +
			'<font size=0.5>Note: Due to a change in the EULA we cannot provide ANY perks to donators. Users who have donated before this change was implemented will keep their badge, name colour change and userlist highlight.</font>');
	},

	ateam: 'adminteam',
	adminteam: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReplyBox('<a><center><b><font color = 075ff7 size=3>The Admin Team</font></b></center></a><br />' +
			'FAQ <br />' +
			'<b>Who are we?</b><br><li>The Admin team are a group of senior members who make most of the major league decisions and organize most major league events. <br />' +
			'<b>Who\'s in the Admin Team?</b><br><li><a href="http://sora.cu.cc/ateam.html">Current active members</a><br />' +
			'<b>What exactly do you guys do?</b><br><li>The Admin Team handle or oversee all matters from disputes in the League, to League Challenge Registration <br />' +
			'<b>How does one join the Admin team?</b><br><li>The Admin Team usually invites a select few senior members who\'ve shown to be mature and capable of handling responsibility. <br />' +
			'<center><img src="http://sora.cu.cc/img/namelist.png"><br />' +
			'All current Admin Team Members can be identified by their userlist highlight and by having the left badge on their trainer card.<br>Past and Present Ateam members will also have the right badge featured in their badge cases.</center> <br />' +
			'<center><img src="http://oi62.tinypic.com/14cfyh0.jpg"><img src="http://66.media.tumblr.com/6d1996ce9d10db40fa5f088f7887c71e/tumblr_o15namAV1o1v5aa3xo1_1280.png" width=150 height=150></center> <br />');
	},
};
