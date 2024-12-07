const { readdirSync } = require("fs");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("help")
      .setDescription("Displays a list of commands or details about a specific command.")
      .addStringOption(option =>
         option
         .setName("command")
         .setDescription("The name of the command to view its details.")
         .setRequired(false)
      ),
   async execute(client, interaction) {
      const { guild, user } = interaction;
      const categories = [];
      const helperInfo = "<> = required, [] = optional, {} = usage format";
      const commandName = interaction.options.getString("command");

      // If the user does not provide a command name
      if (!commandName) {
         readdirSync("./commands/interaction").forEach((dir) => {
            const commands = readdirSync(`./commands/interaction/${dir}`).filter((file) => file.endsWith(".js"));

            const commandList = commands.map((file) => {
               const cmd = require(`../../../commands/interaction/${dir}/${file}`);
               return `</${cmd.data.name}:${client.config.clientId}>`;
            });

            categories.push({
               name: dir.toUpperCase(),
               value: commandList.length > 0 ? commandList.join(", ") : "No commands available.",
            });
         });

         // Create the embed for the list of commands
         const embed = new EmbedBuilder()
            .setColor("#5865f2")
            .setAuthor({
               name: `${guild.name} | ${client.user.username}'s Commands`,
               iconURL: guild.iconURL({ dynamic: true }),
            })
            .setDescription(`Here is a list of available commands.`)
            .addFields(categories)
            .setFooter({
               text: `${user.username}, use /help command:[command name] for details.`,
               iconURL: user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();

         await interaction.reply({ embeds: [embed], ephemeral: false });
      } else {
         // If the user provides a command name
         const cmd = client.slash.get(commandName.toLowerCase());

         if (!cmd) {
            return interaction.reply({
               content: `**${user.username}**, no command named "${commandName}" was found.`,
               ephemeral: true,
            });
         }

         // Create the details for the specific command
         const description = [
                `> **Name:** </${cmd.data.name}:${client.config.clientId}> `,
                `> **Description:** \`${cmd.data.description || "No description provided."}\``,
            ].join("\n");

         const embed = new EmbedBuilder()
            .setColor("#5865f2")
            .setDescription(`Understand the usage format:\n> \`${helperInfo}\``)
            .setAuthor({
               name: `${guild.name} | ${client.user.username}'s Commands`,
               iconURL: guild.iconURL({ dynamic: true }),
            })
            .addFields({ name: "Command Details", value: description })
            .setFooter({
               text: `${user.username}`,
               iconURL: user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();

         await interaction.reply({ embeds: [embed], ephemeral: false });
      }
   },
};