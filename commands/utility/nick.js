const { SlashCommandBuilder, PermissionsFlagBits } = require('discord.js');

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
                        .setMinLength(1)
                        .setMaxLength(21)
                        .setRequired(true)
                )
        ),
    async execute(interaction)
    {
        const sent = await interaction.reply({content: `Loading...`, fetchReply: true});
        if (interaction.member.id != interaction.guild.ownerId) {
            if (interaction.options.getSubcommand() == 'clear') {
                interaction.member.setNickname(null, 'User cleared own nickname');
                interaction.editReply(`Cleared your nickname.\n||-# Took ${sent.createdTimestamp - interaction.createdTimestamp}ms||`);
                return;
            }
    
            if (interaction.options.getSubcommand() == 'set') {
                //const max_nick_length = 32;
                const prefix = "Commoner ♙ ";
                const fullname = `${prefix} ${interaction.options.getString('nickname')}`
                interaction.member.setNickname(fullname, 'User set own nickname');
                interaction.editReply(`Set your nickname to ${fullname}\n-# Compliant ✔\n||-# Took ${sent.createdTimestamp - interaction.createdTimestamp}ms||`);
                return;
            }
        } else
        {
            interaction.editReply(`You are the server owner. I cannot change your nickname.\n||-# Took ${sent.createdTimestamp - interaction.createdTimestamp}ms||`);
        }
    } 
}