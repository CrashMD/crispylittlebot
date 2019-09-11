const Discord = require('discord.js');
const { catImageList } = require('./randomImageURLs.json');
const fs = require('fs');
const request = require('snekfetch');

module.exports = {
	name: 'cat',
	description: 'Cat!',
	usage: '>cat',
	async execute(message, args) {
		// Choose an image at random from randomImageURLs.json
		if (args[0] == 'add' && args[1]) {
			const file = require('./randomImageURLs.json');
			file.catImageList.push(args[1]);
			fs.writeFile('./commands/randomImageURLs.json', JSON.stringify(file), function(err) {
				if(err) {
					return console.log(err);
				}
				else {
					console.log(`${message.author.username} added ${args[1]} to catImageList`);
					message.reply('Thanks for adding that image!');
				}
			});
		}
		else if (args[0] == 'remove') {
			const file = require('./randomImageURLs.json');
			const image = file.catImageList.pop();
			fs.writeFile('./commands/randomImageURLs.json', JSON.stringify(file), function(err) {
				if(err) {
					return console.log(err);
				}
				else {
					console.log(`${message.author.username} removed ${image} from catImageList`);
					message.reply(`you just removed ${image} from test`);
				}
			});
		}
		else if (args[0] > 0 && args[0] <= catImageList.length) {
			const URL = catImageList[(args[0] - 1)];
			const imageEmbed = new Discord.RichEmbed();
			imageEmbed.setColor('RANDOM');
			if (URL.includes('youtube')) {
				message.channel.send(URL);
			}
			else {
				imageEmbed.setImage(URL);
				imageEmbed.setFooter(URL, 'https://cdn.discordapp.com/avatars/425861718107881472/63b1698c90184aaf169fb66846e93602.png');

				message.channel.send({ embed: imageEmbed });
			}
		}
		else {
			// Get image from http://aws.random.cat/meow
			try {
				const { body } = await request.get('http://aws.random.cat/meow');

				// Create embed image
				const imageEmbed = new Discord.RichEmbed();
				imageEmbed.setColor('RANDOM');
				imageEmbed.setImage(body.file);

				message.channel.send({ embed: imageEmbed });
			}
			catch(error) {
				// message.channel.send(`${error.name}: ${error.message}`);
				// Pull from catImageList instead
				const url = catImageList[Math.floor(Math.random() * catImageList.length) ];

				if (url.includes('youtube')) {
					message.channel.send(url);
				}
				else {
					// Embed image
					const imageEmbed = new Discord.RichEmbed();
					imageEmbed.setColor('RANDOM');
					imageEmbed.setImage(url);

					message.channel.send({ embed: imageEmbed });
				}
			}
		}
	},
};