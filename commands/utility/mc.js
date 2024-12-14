const { SlashCommandBuilder } = require('discord.js');
const { minecraft } = require('../../config.json');
const Rcon = require('rcon');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mc')
        .setDescription('Minecraft server management utility')
        .addSubcommandGroup(snapshot =>
            snapshot
                .setName('snapshot')
                .setDescription('Manage the snapshot server')
                .addSubcommand(rcon =>
                    rcon
                        .setName('rcon')
                        .setDescription('Send an RCON command to the snapshot server')
                        .addStringOption(command =>
                            command
                                .setName('command')
                                .setDescription('The command you want to send')
                                .setMinLength(1)
                                .setRequired(true)
                        )
                )
                .addSubcommand(whitelist =>
                    whitelist
                        .setName('whitelist')
                        .setDescription('Add someone to the whitelist')
                        .addStringOption(user =>
                            user
                                .setName('player')
                                .setDescription('The player you want to add')
                                .setMinLength(1)
                                .setRequired(true)
                        )
                )
        ),
    async execute(interaction) {
        const sent = await interaction.reply({content: `Authentication: :regional_indicator_x:`, fetchReply: true});
        //interaction.editReply(`Calculated RTL: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
        if (interaction.options.getSubcommandGroup(false) == 'snapshot')
        {
            if (interaction.options.getSubcommand() == 'rcon')
            {
                if (interaction.member.id === 348151645286432779)
                {
                    const command = interaction.options.getString('command');
                    const rcon = new Rcon(
                        minecraft.servers.snapshot.rcon_ip,
                        minecraft.servers.snapshot.rcon_port,
                        minecraft.servers.snapshot.rcon_pass
                    );

                    rcon.on('auth', () => {
                        interaction.editReply(`Authentication: :ballot_box_with_check:`);

                        rcon.send(command);
                    });

                    rcon.on('response', (res) => {
                        interaction.editReply(`## Response:\n ${res}\n||-# Took ${sent.createdTimestamp - interaction.createdTimestamp}ms||`);
                        rcon.disconnect();
                    });

                    rcon.on('error', (err) => {
                        interaction.editReply(`Error: ${err}\n||-# Took ${sent.createdTimestamp - interaction.createdTimestamp}ms||`);
                        rcon.disconnect();
                    });

                    rcon.on('end', () => {
                        console.log("RCON connection closed.")
                    });

                    rcon.connect();
                } else
                {
                    interaction.editReply(`Only iffyspeak can administer remote commands from AlyBot.\n||-# Took ${sent.createdTimestamp - interaction.createdTimestamp}ms||`);
                }
            }

            if (interaction.options.getSubcommand() == 'whitelist')
            {
                const player = interaction.options.getString('player');
                const command = `whitelist add ${player}`;

                const rcon = new Rcon(
                    minecraft.servers.snapshot.rcon_ip,
                    minecraft.servers.snapshot.rcon_port,
                    minecraft.servers.snapshot.rcon_pass
                );

                rcon.on('auth', () => {
                    interaction.editReply(`Connected: :ballot_box_with_check:`);

                    rcon.send(command);
                });

                rcon.on('response', (res) => {
                    interaction.editReply(`## Response:\n ${res}\n||-# Took ${sent.createdTimestamp - interaction.createdTimestamp}ms||`);
                    rcon.disconnect();
                });

                rcon.on('error', (err) => {
                    interaction.editReply(`Error: ${err}\n||-# Took ${sent.createdTimestamp - interaction.createdTimestamp}ms||`);
                    rcon.disconnect();
                });

                rcon.on('end', () => {
                    console.log("RCON connection closed.")
                });

                rcon.connect();
            }
        }
    }
}