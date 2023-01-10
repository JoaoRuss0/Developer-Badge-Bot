const {Client, GatewayIntentBits, Routes} = require('discord.js');
const {REST} = require('@discordjs/rest');
const client = new Client({intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds]})
require('dotenv').config()

var guilds = process.env.GUILD_IDS.split('_')

client.on('ready', () => {
	console.log("Ready")
})

client.on('interactionCreate', (interaction) => {
    interaction.reply({content: "Ok"})
})

const commands = [{
    name: 'slash',
    description: 'slash command',

},
{
    name: 'command',
    type: 2,
}]

const updateCommands = async (guild_id) => {
	await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guild_id),{
       		body: commands
	})
}

const rest = new REST({version: '10'}).setToken(process.env.TOKEN)

async function main() {
  try {
    console.log('Refreshing slash commands');

    guilds.forEach((guild) => updateCommands(guild))
    client.login(process.env.TOKEN)
  }
  catch (error) {
    console.log(error)
  }
}

main()
