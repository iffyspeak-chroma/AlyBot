const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mc')
        .setDescription('Minecraft server management utility')
        .addSubcommand(snapshot =>
            snapshot
                .setName('snapshot')
                .setDescription('Manage the snapshot server')
                .addSubcommand(rcon =>
                    rcon
                        .setName('rcon')
                        .setDescription('Send an RCON command to the snapshot server')
                        .addStringOption(command =>
                            command.setName('command')
                                .setDescription('The command you want to send')
                        )
                )
        ),
    async execute(interaction) {
        const sent = await interaction.reply({content: `Loading...`, fetchReply: true});
        //interaction.editReply(`Calculated RTL: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
    }
}