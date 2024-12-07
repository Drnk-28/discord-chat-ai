const { ChannelType, Collection, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType } = require('discord.js');
const AI = require("../settings/chat");

module.exports = {
   name: "interactionCreate", // Event handler for interaction creation
   once: true,
   async execute(client, interaction) {
      try {
         // Create a button for users to initiate chat
         const AskButton = new ButtonBuilder()
            .setCustomId("ask-button")
            .setStyle(ButtonStyle.Secondary)
            .setLabel("Let's Chat")
            .setEmoji("1314458490256752710");

         const replyRow = new ActionRowBuilder().addComponents(AskButton);

         // Handle slash commands
         if (interaction.isChatInputCommand()) {
            const command = client.slash.get(interaction.commandName);
            if (command) {
               return command.execute(client, interaction); // Execute the command
            }
         }

         // Handle button interactions
         if (interaction.isButton()) {
            if (interaction.customId === "ask-button") {
               // Create a modal for user input
               const modal = new ModalBuilder()
                  .setTitle("Ask Anything")
                  .setCustomId("my-modal");

               const modalInput = new TextInputBuilder()
                  .setCustomId("user-message")
                  .setLabel("What do you want to ask?")
                  .setStyle(TextInputStyle.Paragraph)
                  .setPlaceholder("Write your question here...")
                  .setMinLength(0) // Minimum input length
                  .setMaxLength(1000) // Maximum input length
                  .setRequired(false); // Input is mandatory

               const firstActionRow = new ActionRowBuilder().addComponents(modalInput);
               modal.addComponents(firstActionRow);

               await interaction.showModal(modal); // Show the modal to the user
            }
         }

         // Handle modal submission
         if (interaction.type === InteractionType.ModalSubmit && interaction.customId === "my-modal") {
            const userInput = interaction.fields.getTextInputValue("user-message"); // Get user input

            await interaction.reply({ content: `Wait a moment...`, ephemeral: true }).then(async (reply) => {

               let options = {
                  client,
                  member: interaction.member,
                  input: userInput,
                  guild: interaction.guild,
                  channel: interaction.channel
               }
               let chatResponses = await AI(options); // Get AI responses

               setTimeout(() => reply.delete(), 500); // Delete initial reply after a short delay

               // Send each AI response with a delay
               chatResponses.forEach((response) => {
                  setTimeout(async () => {
                     AskButton.setLabel("Reply");
                     await interaction.followUp({ content: response, components: [replyRow], ephemeral: true });
                  }, 500);
               });
            });
         }
      } catch (err) {
         // Handle any errors
         return await interaction.reply({ content: `An error occurred: ${err.message}`, ephemeral: true });
      }
   }
};