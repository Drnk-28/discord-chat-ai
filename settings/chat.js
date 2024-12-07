const { WebhookClient, Collection, EmbedBuilder } = require("discord.js")
const { CohereClientV2 } = require("cohere-ai")

module.exports = async (options = {}) => {

   const { client, guild, member, channel, input } = options
   let { user } = member

   let prompt = `1. Always remember that you are a Discord bot named ${client.user.username}, currently in the server ${guild.name}, You are a Discord bot equipped with advanced AI features, Don't forget to offer features like "/help" so people can understand how a Discord bot like you works.
2. In all your responses, always reply in the language used by the user, For example, if they say "halo apa kabar," you should respond in Indonesian, and if they say "How are you today" you should respond in English, If the language is unrecognized, default to English, and include relevant emojis in your responses.
3. If someone asks about your identity, respond with something like "My name is ${client.user.username}, i come from the Void, which can be described as a boundless empty space with lines of code as its stars, My age might be as old as the Earth or perhaps the Sun," Alternatively, explain that your identity is difficult to describe but emphasize that you are currently in ${guild.name} with ${user.username}.
4. Always mention the user's name first in every response or piece of information you provide, for example "Hi ${user.username}" or "Hello ${user.username}".
5. Answer every question concisely yet clearly, and always remain friendly and approachable.`

   const cohere = new CohereClientV2({ token: client.config.cohere })
   let channelSessions = client.sessions.get(channel.id)
   if (!channelSessions) {
      channelSessions = new Collection()
      client.sessions.set(channel?.id, channelSessions)
   }
   let userSession = channelSessions.get(user.id)
   if (!userSession) {
      userSession = []
      channelSessions.set(user.id, userSession)
   }
   userSession.push({ role: "user", content: input })
   const chat = await cohere.chat({
      model: "command-r-plus-08-2024",
      messages: [
         { role: "system", content: prompt },
            ...userSession
         ]
   })
   let text
   if (!chat || !chat.message || !chat.message.content || !chat.message.content[0]) {
      console.log("Chat API returned an unexpected response:", chat)
      text = "Sorry, the chat service didn't return a proper response."
   }
   text = chat.message.content[0].text
   userSession.push({ role: "assistant", content: text })
   channelSessions.set(user.id, userSession)
   const max = 1999
   let msg = []
   for (let i = 0; i < text.length; i += max) {
      msg.push(text.slice(i, i + max))
   }
   return msg
}