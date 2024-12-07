const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const AI = require("../../../settings/chat"); // Import AI function to handle chatbot responses

module.exports = {
   data: new SlashCommandBuilder()
      .setName('chat') // The command name
      .setDescription('I can answer any questions you have...') // Command description
      .addStringOption(option =>
         option
         .setName('question') // Option name
         .setDescription('What question would you like to ask?') // Option description
         .setRequired(false) // The question is optional
      ),
   async execute(client, interaction) {
      // Create a button for the user to continue chatting
      const AskButton = new ButtonBuilder()
         .setCustomId("ask-button") // Unique ID for the button
         .setStyle(ButtonStyle.Secondary) // Secondary button style (gray)
         .setLabel("Let's chat") // Label displayed on the button
         .setEmoji("1314458490256752710"); // Add an emoji to the button

      // Add the button to an action row
      const replyRow = new ActionRowBuilder().addComponents(AskButton);

      // Get the user's question or use a default question
      const question = interaction.options.getString('question') || "how to make nastar cake";

      try {
         // Defer the reply to indicate that the bot is processing
         await interaction.deferReply({ ephemeral: true });

         // Prepare options for the AI function
         let options = {
            client,
            member: interaction.member, // The user interacting with the bot
            input: question, // The question or input for the AI
            guild: interaction.guild, // The server where the interaction happened
            channel: interaction.channel, // The channel where the interaction happened
         };

         // Call the AI function to get chatbot responses
         const chat = await AI(options);

         // Send each response from the AI with a slight delay
         for (let i = 0; i < chat.length; i++) {
            const message = chat[i];
            AskButton.setLabel("Reply"); // Update the button label to "Reply"
            await interaction.followUp({
               content: message,
               components: [replyRow],
               ephemeral: true
            });
            await new Promise((resolve) => setTimeout(resolve, 550)); // Delay between messages
         }
      } catch (err) {
         console.error(err); // Log the error for debugging
         // Notify the user about the error
         await interaction.followUp({
            content: "There was an issue processing your request, please try again later 🛠️",
            ephemeral: true,
         });
      }
   },
};