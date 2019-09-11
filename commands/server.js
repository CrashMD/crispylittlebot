module.exports = {
	name: 'server',
	description: 'Outputs server info.',
	execute(message) {
		message.channel.send(`This server's name is: ${message.guild.name}`);
	},
};