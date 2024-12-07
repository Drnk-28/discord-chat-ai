module.exports = {
   // The name of the event being handled. In this case, it is the "ready" event,
   // which is triggered when the bot successfully logs in and is ready to operate.
   name: "ready",

   // A flag indicating whether this event should be executed only once or multiple times.
   // Setting `once: true` means the event will be executed only the first time it is triggered.
   once: true,

   // The asynchronous function to execute when the event is triggered.
   // It receives the `client` object as a parameter, representing the bot instance.
   async execute(client) {
      // Logs a message to the console indicating that the bot is ready,
      // displaying the bot's username retrieved from the `client.user` object.
      console.log(`Client name "${client.user.username}" ready...`);
   }
};