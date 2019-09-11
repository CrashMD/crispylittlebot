const fetch = require('node-fetch');

module.exports = {
	name: 'minions',
	description: 'Retrieves the given character\'s minion count.',
	usage: '>minions Shard FirstName LastName',
	async execute(message, args) {
		if(args.length === 3) {
			let msgID = null;
			message.channel.send('Looking that up for ya!').then(msg => msgID = msg);
			// Find character ID using XIVAPI
			fetch(`https://xivapi.com/character/search?name=${args[1]}+${args[2]}&server=${args[0]}`, { mode: 'cors' })
				.then(response => response.json())
				.then(data => {
					const ID = data.Results[0].ID;
					// Scrape the lodestone page I guess
					// msgID.edit(`Scraping: https://na.finalfantasyxiv.com/lodestone/character/${ID}/minion/`);
					fetch(`https://na.finalfantasyxiv.com/lodestone/character/${ID}/minion/`)
						.then(res => res.text())
						.then(body => {
							// console.log(body);
							const totalStart = body.indexOf('minion__sort__total') + 34;
							const totalEnd = body.indexOf('</span>', totalStart);
							const minionCount = body.substr(totalStart, totalEnd - totalStart);
							const minionPercent = Math.round(minionCount / 340 * 100);
							console.log(`${totalStart} ${totalEnd} ${minionCount} ${minionPercent}`);
							msgID.edit(`${args[1]} ${args[2]} has ${minionCount}/340 minions. ${minionPercent}%`);
						})
						.catch(err => {
							message.channel.send('Couldn\'t reach Lodestone');
							return console.log(err);
						});
				})
				.catch(err => {
					message.channel.send(`Couldn't find ${args[1]} ${args[2]} on ${args[0]}`);
					return console.log(err);
				});
		}
		else{
			message.channel.send('Usage: >minions Shard FirstName LastName');
		}
	},
};