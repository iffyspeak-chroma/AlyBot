const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nick')
        .setDescription('Change your server nickname')
        .addSubcommand(subcommand => 
            subcommand
                .setName('clear')
                .setDescription('Clear the nickname you currently have (resets compliancy)')
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName('set')
                .setDescription('Change your nickname (sets compliancy)')
                .addStringOption(nickname =>
                    nickname.setName('nickname')
                        .setDescription('The nickname you wish to go by')
                        .setRequired(true)
                )
        ),
    async execute(interaction)
    {
        const sent = await interaction.reply({content: `Command not complete. Come back later.`, fetchReply: true});

    }
}