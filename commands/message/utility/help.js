const { readdirSync } = require("fs");
const { EmbedBuilder } = require("discord.js")
module.exports = {
   name: "help",
   aliases: ["command", "cmd", "?"],
   description: "Displays a list of commands or details of a specific command.",
   usage: "{prefix}help [command]",
   cooldown: 10,
   run: async (client, message, args) => {
      const { guild, author } = message;
      const categories = [];

      const prefix = client.config.prefix;

      const helperInfo = "<> = required, [] = optional, {} = Usage Layout";

      // If no specific command is provided
      if (!args[0]) {
         // Read command directories and build categories
         readdirSync("./commands/message").forEach((dir) => {
            const commands = readdirSync(`./commands/message/${dir}`).filter((file) => file.endsWith(".js"));

            const commandList = commands.map((file) => {
               const cmd = require(`../../../commands/message/${dir}/${file}`);
               return `\`${cmd.name}\``;
            });

            categories.push({
               name: dir.toUpperCase(),
               value: commandList.length > 0 ? commandList.join(", ") : "No commands available.",
            });
         });

         // Create the embed for the command list
         const embed = new EmbedBuilder()
            .setColor("#5865f2")
            .setAuthor({
               name: `${guild.name} | ${client.user.username}'s commands`,
               iconURL: guild.iconURL({ dynamic: true }),
            })
            .setDescription(`Here is a list of available commands grouped by category.\n> **Guild Prefix:** \`${prefix}\``)
            .addFields(categories)
            .setFooter({
               text: `${author.username}, use ${prefix}help [command] for details.`,
               iconURL: author.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();

         // Send the embed
         await message.channel.sendTyping();
         setTimeout(() => {
            message.channel.send({ embeds: [embed] });
         }, 500);
      } else {
         // Handle specific command details
         const cmd =
            client.commands.get(args[0].toLowerCase()) ||
            client.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));

         if (!cmd) {
            return message.reply({
               content: `**${author.username}**, I couldn't find a command named "${args[0]}".`,
            });
         }

         // Format command details
         const description = [
            `> **Name:** \`${prefix}${cmd.name}\``,
            `> **Aliases:** ${cmd.aliases.length > 0 ? cmd.aliases.map((a) => `\`${a}\``).join(", ") : "None"}`,
            `> **Usage:** \`${cmd.usage.replace("{prefix}", prefix)}\``,
            `> **Description:** \`${cmd.description || "No description provided."}\``,
         ].join("\n");

         // Create the embed for command details
         const embed = new EmbedBuilder()
            .setColor("#5865f2")
            .setDescription(`Understand the formatting guide:\n> \`${helperInfo}\``)
            .setAuthor({
               name: `${guild.name} | ${client.user.username}'s Commands`,
               iconURL: guild.iconURL({ dynamic: true }),
            })
            .addFields({ name: "Command Details", value: description })
            .setFooter({
               text: `${author.username}`,
               iconURL: author.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();

         // Send the embed
         await message.channel.sendTyping();
         setTimeout(() => {
            message.channel.send({ embeds: [embed] });
         }, 500);
      }
   },
};