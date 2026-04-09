require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

// ──────────────────────────────────────────
// CONFIG — edit these values
// ──────────────────────────────────────────
const config = {
  // ID of the channel to monitor
  watchChannelId: "1452763777622737098",

  // Add as many keyword + role pairs as you want
  rules: [
    { keyword: "starfall", roleId: "1491755934052257871" },
    { keyword: "sand storm",   roleId: "1491755423395610624" },
    { keyword: "hell",    roleId: "1491755464772554752" },
	{ keyword: "heaven",    roleId: "1491755505708699658" },
	{ keyword: "null",    roleId: "1491755533886029934" },
	{ keyword: "corruption",    roleId: "1491755964280606740" },
  ],
};
// ──────────────────────────────────────────

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  console.log(`👀 Watching channel: ${config.watchChannelId}`);
});

client.on("messageCreate", async (message) => {
  // Only ignore itself, not other bots/webhooks
  if (message.author.id === client.user.id) return;

  // Only watch the configured channel
  if (message.channelId !== config.watchChannelId) return;

  // Check each keyword rule
  for (const rule of config.rules) {
    if (message.content.toLowerCase().includes(rule.keyword.toLowerCase())) {
      await message.channel.send(
        `🚨 <@&${rule.roleId}> — keyword **"${rule.keyword}"** was mentioned by ${message.author}:\n> ${message.content.slice(0, 200)}`
      );
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
