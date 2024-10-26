const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Round trip testing utility'),
    async execute(interaction) {
        await interaction.reply('Pong!')
    }
}