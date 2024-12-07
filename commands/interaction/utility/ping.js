const { SlashCommandBuilder } = require("discord.js"); // Import SlashCommandBuilder to create commands

module.exports = {
   // Define the command
   data: new SlashCommandBuilder()
      .setName('ping') // Command name
      .setDescription('Check the bot and Discord API latency'), // Command description
   async execute(client, interaction) {
      // Calculate bot latency and API latency
      const botLatency = Date.now() - interaction.createdTimestamp; // Time difference from when interaction was created
      const apiLatency = client.ws.ping; // WebSocket API latency

      // Send a playful response while calculating latencies
      await interaction.reply({ content: "🙈 Peek-a-boo!" }).then(async (message) => {
         setTimeout(() => message.delete(), 300); // Delete the first message after 300ms

         // Send a follow-up message with latency details after a short delay
         setTimeout(async () => {
            await interaction.followUp({ content: `🙉 Gotcha!\n**Bot Latency:** ${botLatency}ms \n**API Latency:** ${apiLatency}ms` });
         }, 350); // Delay of 350ms before sending latency details
      });
   },
};