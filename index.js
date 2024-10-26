const { Client, Events, GatewayIntentBits } = require('discord.js');
const { TOKEN } = process.env.TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, cli => {
    console.log(`Logged in as ${cli.user.tag}`);
});