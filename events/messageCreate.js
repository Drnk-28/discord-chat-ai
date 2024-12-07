const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection } = require('discord.js');

module.exports = {
   name: "messageCreate", // The name of the event being handled
   once: true, // The event will be triggered only once
   async execute(client, message) {
      const { author, guild } = message;

      // Ignore messages from bots or those not in a server
      if (author.bot || !guild) return;

      try {
         const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
         const commandName = args.shift().toLowerCase();
         const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases?.includes(commandName));

         // If the command is not found, do nothing
         if (!command) return;
         // Cooldown handler
         const cooldowns = client.cooldowns || new Collection();
         const cooldown = command.cooldown || 5;
         if (!cooldowns.has(commandName)) cooldowns.set(commandName, new Collection());

         const now = Date.now();
         const timestamps = cooldowns.get(commandName);
         const cooldownAmount = cooldown * 1000;

         if (timestamps.has(author.id)) {
            const expirationTime = timestamps.get(author.id) + cooldownAmount;

            if (now < expirationTime) {
               const timeLeft = Math.ceil((expirationTime - now) / 1000);
               let msg = `Please wait (**${message.author.username}**), the cooldown will end <t:${Math.floor(expirationTime / 1000)}:R>`
               const cooldownMessage = await channel.send({ content: msg });

               setTimeout(() => cooldownMessage.delete().catch(console.error), expirationTime - now);
               return;
            }
         }

         timestamps.set(author.id, now);
         setTimeout(() => timestamps.delete(author.id), cooldownAmount);

         // Execute the command
         return command.run(client, message, args);
      } catch (err) {
         console.error("An error occurred:", err); // Log the error to the console
      }
   }
};