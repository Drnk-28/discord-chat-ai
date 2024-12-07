const { SlashCommandBuilder, EmbedBuilder } = require("discord.js"); // Import SlashCommandBuilder to create commands

module.exports = {
   // Define the command
   data: new SlashCommandBuilder()
      .setName('credit') // Command name
      .setDescription('Displays appreciation to the code owner.'), // Command description
   async execute(client, interaction) {
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
         return await interaction.reply({ embeds: [creditEmbed] });
      } catch (err) {
         console.error("An error occurred while executing the credit command:", err); // Log the error
         // Notify the user about the error
         return await interaction.reply({ content: "Sorry, something went wrong while displaying the credits. 🛠️", ephemeral: true });
      }
   },
};