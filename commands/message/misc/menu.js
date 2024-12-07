const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const AI = require("../../../settings/chat"); // Import AI function to handle chatbot responses

module.exports = {
   name: "open-chat", // Command name
   aliases: ["menu"], // Optional aliases
   description: "Open a chat menu to ask anything to the bot", // Description for the command
   usage: "{prefix}open-chat", // Usage format
   cooldown: 60, // 60s
   run: async (client, message, args) => {
      let { author } = message

      const ChatEmbed = new EmbedBuilder()
         .setColor("#5865f2")
         .setTitle("Ask me anything!")
         .setDescription(`Hi <@${author.id}>, my name is **${client.user.username}**.\nYou called me, which means you need my help!\n\nI can assist you in answering various questions, but please remember **${author.username}**, I'll do my best within my capabilities.\n\n-# Click the button below to start chatting.`)
         .setTimestamp();

      // Create a button for the chatbot
      const AskButton = new ButtonBuilder()
         .setCustomId("ask-button")
         .setStyle(ButtonStyle.Secondary)
         .setLabel("Let's chat")
         .setEmoji("1314458490256752710");

      // Arrange the button in a row
      const askRow = new ActionRowBuilder().addComponents(AskButton);

      return message.channel.send({ embeds: [ChatEmbed], components: [askRow] });
   },
};