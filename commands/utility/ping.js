const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Round trip testing utility'),
    async execute(interaction) {
        const sent = await interaction.reply({content: `Calculating.`, fetchReply: true});
        interaction.editReply(`Calculated RTL: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
    }
}