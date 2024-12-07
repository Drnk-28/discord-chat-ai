const { readdirSync } = require("fs") // Import the `readdirSync` function to read directories
const { Routes, REST, Events } = require("discord.js") // Import necessary classes and methods from Discord.js
const config = require("../settings/config") // Import configuration file

module.exports = async (client) => {
   try {
      let slash = []; // Array to store all slash commands
      const rest = new REST({ version: 10 }).setToken(client.config.TOKEN); // Initialize REST API client with bot token

      // Load and register slash commands
      readdirSync("./commands/interaction").forEach((dirr) => {
         let command = readdirSync(`./commands/interaction/${dirr}`).filter((p) => p.endsWith(".js")); // Get all JavaScript files in the directory
         for (let cmd of command) {
            let file = require(`../commands/interaction/${dirr}/${cmd}`); // Import each command file
            client.slash.set(file.data.name, file); // Add command to the slash commands collection
            slash.push(file.data.toJSON()); // Push command data to the slash array for registration
            console.log(`[SLASH] ${file.data.name} ready...`); // Log the loaded slash command
         }
      });

      // Load and register message-based commands
      readdirSync("./commands/message").forEach((dirr) => {
         let command = readdirSync(`./commands/message/${dirr}`).filter((p) => p.endsWith(".js")); // Get all JavaScript files in the directory
         for (let cmd of command) {
            let file = require(`../commands/message/${dirr}/${cmd}`); // Import each command file
            client.commands.set(file.name, file); // Add command to the message commands collection
            console.log(`[MSG] ${file.name} ready...`); // Log the loaded message command
         }
      });

      // Load and register event handlers
      readdirSync("./events").forEach((file) => {
         let event = require(`../events/${file}`); // Import each event file
         if (event.once) {
            client.on(event.name, (...args) => event.execute(client, ...args)); // Bind the event to the client
            console.log(`[EVENT] => (${event.name}) active...`); // Log active event
         } else {
            console.log(`[EVENT] => (${event.name}) not working (inactive)`); // Log inactive event
         }
      });

      // Register slash commands once the client is ready
      client.on(Events.ClientReady, async () => {
         try {
            console.log(`Started refreshing ${slash.length} application (/) commands.`);
            let data = await rest.put(
               Routes.applicationCommands(config.clientId), // Register commands globally for the bot
               { body: slash }
            );
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
         } catch (err) {
            console.error(`Discord REST Error`, err); // Log any errors during the registration process
         }
      });
   } catch (err) {
      console.error(`🔴 Error in "handler/command.js"\n`, err); // Log errors in this handler file
   }
};