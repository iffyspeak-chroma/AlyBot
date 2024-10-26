const { REST, Routes } = require('discord.js');
const { clientId, guildIds, token } = require('./config.json');

const rest = new REST().setToken(token);

// ...

for (let index = 0; index < guildIds.length; index++) {
    // for guild-based commands
    rest.put(Routes.applicationGuildCommands(clientId, guildIds[index]), { body: [] })
    .then(() => console.log(`Successfully deleted all guild commands from ${guildIds[index]}.`))
    .catch(console.error);
}


// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
.then(() => console.log('Successfully deleted all application commands.'))
.catch(console.error);