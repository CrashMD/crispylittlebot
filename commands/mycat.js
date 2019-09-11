const Discord = require('discord.js');
const { catImageList } = require('./randomImageURLs.json');
const fs = require('fs');
const testImageList = catImageList;

module.exports = {
	name: 'mycat',
	description: 'Screw random cats, my cats are better!',
	usage: '>mycat [add] [URL]',
	execute(message, args) {
		// Choose an image at random from randomImageURLs.json
		if (args[0] == 'add' && args[1]) {
			const file = require('./randomImageURLs.json');
			file.testImageList.push(args[1]);
			fs.writeFile('./commands/randomImageURLs.json', JSON.stringify(file), function(err) {
				if(err) {
					return console.log(err);
				}
				else {
					console.log(`${message.author.username} added ${args[1]} to testImageList`);
					message.reply('Thanks for adding that image!');
				}
			});
		}
		else if (args[0] == 'remove') {
			const file = require('./randomImageURLs.json');
			const image = file.testImageList.pop();
			fs.writeFile('./commands/randomImageURLs.json', JSON.stringify(file), function(err) {
				if(err) {
					return console.log(err);
				}
				else {
					console.log(`${message.author.username} removed ${image} from testImageList`);
					message.reply(`you just removed ${image} from test`);
				}
			});
		}
		else if (args[0] > 0 && args[0] <= testImageList.length) {
			const URL = testImageList[(args[0] - 1)];
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
		else if (testImageList.length > 0) {
			const url = testImageList[Math.floor(Math.random() * testImageList.length) ];

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
		else {
			message.channel.send('The image list is empty!');
		}
	},
};