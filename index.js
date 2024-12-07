require("dotenv").config()
// Load environment variables from a `.env` file into `process.env`
const { Collection, Events, Client, GatewayIntentBits } = require('discord.js'); // Import various classes and utilities from the Discord.js library
// Create a new Discord client instance with specific intents
const client = new Client({
   intents: [
      // Intents to specify the events and data the bot can access
      GatewayIntentBits.Guilds, // Access to guild-related events and data
      GatewayIntentBits.GuildMembers, // Access to member join, leave, and update events
      GatewayIntentBits.GuildIntegrations, // Access to integration events
      GatewayIntentBits.GuildMessages, // Access to guild text messages
      GatewayIntentBits.MessageContent // Access to the content of messages
   ],
   allowedMentions: {
      parse: ['roles'], // Only mention roles from messages
      repliedUser: false // Do not mention the user when replying
   }
})

// Load additional configuration from a file
client.config = require("./settings/config");

// Initialize custom collections for session and slash command handlers
client.sessions = new Collection();
client.slash = new Collection();
client.commands = new Collection();
client.cooldowns = new Collection()
// Define a list of handlers (currently just "command") to load
let handler = ["command"];
handler.forEach((y) => {
   require(`./handler/${y}`)(client); // Load each handler module and pass the client instance
})

// Log in to Discord using the bot token from the configuration
client.login(client.config.TOKEN);