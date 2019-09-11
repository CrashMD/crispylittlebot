const Discord = require('discord.js');

module.exports = {
	name: 'bear',
	description: 'Bear!',
	usage: '>bear',
	execute(message) {
		// Randomize size for placebear url
		const int1 = Math.floor(Math.random() * 540) + 100;
		const int2 = Math.floor(Math.random() * 540) + 100;

		// Create embed image
		const imageEmbed = new Discord.RichEmbed();
		imageEmbed.setColor('RANDOM');
		imageEmbed.setImage(`https://placebear.com/${int1}/${int2}.jpg`);

		message.channel.send({ embed: imageEmbed });
	},
};