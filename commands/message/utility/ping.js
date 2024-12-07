module.exports = {
   name: "ping", // Command name
   aliases: ["latency"], // Optional aliases
   description: "Check the bot and Discord API latency", // Command description
   usage: "{prefix}ping", // Usage format (leave empty if no arguments are needed)
   cooldown: 5,
   run: async (client, message, args) => {
      // Calculate bot latency and API latency
      const botLatency = Date.now() - message.createdTimestamp; // Time difference from when the message was created
      const apiLatency = client.ws.ping; // WebSocket API latency

      // Send a playful response while calculating latencies
      const firstMessage = await message.channel.send("🙈 Peek-a-boo!");

      // Delete the first message after a short delay
      setTimeout(() => firstMessage.delete(), 300); // Delete after 300ms

      // Send a follow-up message with latency details after a short delay
      setTimeout(async () => {
         await message.channel.send(`🙉 Gotcha!\n**Bot Latency:** ${botLatency}ms \n**API Latency:** ${apiLatency}ms`);
      }, 350); // Delay of 350ms before sending latency details
   },
};