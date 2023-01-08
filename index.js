const {Client, GatewayIntentBits, Routes} = require('discord.js');
const {REST} = require('@discordjs/rest');
const client = new Client({intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds]})
require('dotenv').config()

client.on('ready', () => {
	console.log("Ready")
})

client.on('interactionCreate', (interaction) => {
    interaction.reply({content: "Ok"})
})

const commands = [{
    name: 'command',
    description: 'description'
}]

const rest = new REST({version: '10'}).setToken(process.env.TOKEN)

async function main() {
  try {
    console.log('Refreshing slash commands');

    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),{
        body: commands
    })

    client.login(process.env.TOKEN)
  }
  catch (error) {
    console.log(error)
  }
}

main()