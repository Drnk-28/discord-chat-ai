# Discord Chat AI

Discord Chat AI is a Node.js-based application designed to provide an interactive experience by integrating **Discord.js** for Discord bot functionality and **Cohere AI** for natural language processing. This project also uses **dotenv** for environment variable management and **fs** for file manipulation.

## Key Features
- **Discord.js**: Enables the application to function as a Discord bot.
- **Cohere AI**: Used for text processing and generating AI-based responses.
- **dotenv**: Manages secure configurations using a `.env` file.
- **fs**: Provides efficient file read/write operations.

## System Requirements
Before running this application, ensure your system meets the following requirements:
- **Node.js**: Version 18.0.0 or later.
- **npm**: Version 8.0.0 or later (usually included with Node.js).

## Application Requirements
Before running the application, make sure you have the following:
- **Cohere API Key**: This is the primary model used in this project. If you don’t have an API key, visit [this page](https://cohere.com/) to obtain one and follow the steps outlined there.
- **Discord Bot Token**: Required to run the bot. If you don’t have a token, visit [this page](https://discord.com/developers/applications), select one of your existing applications, or create a new one by clicking the "New Application" button. Once created, navigate to the "Bot" menu and click "Reset Token" to generate a token.
- **Discord Bot ID**: Required for registering slash commands. To get it, visit [this page](https://discord.com/developers/applications), select or create an application, and look for the "General Information" menu. There, you'll find the "Application ID."

## Installation
Follow these steps to set up and run the application:

1. **Clone the repository**  
   Run the following command to clone this repository:
   ```bash
   git clone https://github.com/Drnk-28/discord-chat-ai.git
   cd discord-chat-ai
   ```

2. **Install dependencies**  
   Use the following command to install all required dependencies:
   ```bash
   npm install
   ```

3. **Configure the `.env` file**  
   Create or edit a `.env` file in the project's root directory and add the necessary environment variables, such as the Discord bot token and the Cohere AI API key. Example:
   ```env
   TOKEN=your_discord_bot_token
   cohere=your_cohere_api_key
   clientId=your_discord_bot_id
   prefix=your_discord_bot_prefix
   ```

4. **Run the application**  
   Use the following command to start the application:
   ```bash
   npm start
   ```

## Project Structure
- **index.js**: The main application file.
- **node_modules/**: The directory containing project dependencies.
- **package.json**: The project configuration file.
- **.env**: The environment configuration file (excluded from the repository).

## Notes
Ensure you have valid **Cohere AI API keys** and a **Discord bot token** before running the application.
