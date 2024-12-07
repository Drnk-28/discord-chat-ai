const { EmbedBuilder } = require('discord.js');

module.exports = {
   name: "credit", // Command name
   aliases: ["credits", "about"], // Optional aliases
   description: "Displays appreciation to the code owner.", // Command description
   usage: "{prefix}credit", // Usage format
   cooldown: 60,
   run: async (client, message, args) => {
      try {
         // Discord ID of the code owner
         const ownerId = "626413361185292321";

         // Fetch user information using the bot
         const owner = await client.users.fetch(ownerId);

         // Create an embed to display credit information
         const creditEmbed = new EmbedBuilder()
            .setColor("#5865f2")
            .setTitle("✨ Credit: Code Owner ✨")
            .setDescription(
               "This bot was developed with dedication by:\n\n" +
               `**GitHub**: [Drnk-28](https://github.com/Drnk-28)\n` +
               `**Discord**: [${owner.tag}](https://discord.com/users/${ownerId})\n\n` +
               "### Important Note:\n" +
               "If you use this code for a major project and appreciate my contribution as the owner, " +
               "I kindly request **that this owner ID is not removed**. A small token of appreciation from you means a lot to me. 🙏"
            )
            .setThumbnail("https://github.com/Drnk-28.png") // Display profile picture
            .setFooter({ text: "Created with dedication and love 💙" })
            .setTimestamp();

         // Send the embed to the channel
         return message.channel.send({ embeds: [creditEmbed] });
      } catch (err) {
         console.error("An error occurred while executing the credit command:", err); // Log the error
         // Notify the user about the error
         return message.channel.send("Sorry, something went wrong while displaying the credits. 🛠️");
      }
   },
};