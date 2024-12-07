const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const AI = require("../../../settings/chat"); // Import AI function to handle chatbot responses

module.exports = {
   name: "chat", // Command name
   aliases: ["ask", "botchat", "ai"], // Optional aliases
   description: "I can answer any questions you have...", // Description for the command
   usage: "{prefix}chat <question>", // Usage format
   cooldown: 5,
   run: async (client, message, args) => {
      // Create a button for the user to continue chatting
      const AskButton = new ButtonBuilder()
         .setCustomId("ask-button") // Unique ID for the button
         .setStyle(ButtonStyle.Secondary) // Secondary button style (gray)
         .setLabel("Let's chat") // Label displayed on the button
         .setEmoji("1314458490256752710"); // Add an emoji to the button

      // Add the button to an action row
      const replyRow = new ActionRowBuilder().addComponents(AskButton);

      // Get the user's question or use a default question
      const question = args.join(" ") || "how to make nastar cake";

      try {
         // Notify the user that the bot is processing
         let processingMessage = await message.channel.send("Let me think... 🤔")

         // Prepare options for the AI function
         let options = {
            client,
            member: message.member, // The user sending the command
            input: question, // The question or input for the AI
            guild: message.guild, // The server where the command was used
            channel: message.channel, // The channel where the command was used
         };

         // Call the AI function to get chatbot responses
         const chat = await AI(options);
          // Send each response from the AI with a slight delay
         for (let i = 0; i < chat.length; i++) {
            const aiMessage = chat[i];
            AskButton.setLabel("Reply"); // Update the button label to "Reply"
            await message.reply({
               content: aiMessage,
               components: [replyRow],
            });
            await new Promise((resolve) => setTimeout(resolve, 550)); // Delay between messages
         }

         // Delete the processing message after completion
         await processingMessage.delete();
      } catch (err) {
         console.error(err); // Log the error for debugging
         // Notify the user about the error
         await message.channel.send("There was an issue processing your request, please try again later 🛠️");
      }
   },
};