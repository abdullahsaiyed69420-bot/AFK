const mineflayer = require('mineflayer');
const http = require('http');

// Simple http healthcheck server
http.createServer((req, res) => {
  res.write("AFK Bot Online");
  res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Chachunbros3.mcsh.gg',
    port: 25565,
    username: 'AFK_Bot_99',
    auth: 'offline',
    
    // EXTREME MEMORY SAVERS (Prevents Exit code 137)
    loadInternalPlugins: false, // Prevents loading extra mineflayer plugins
    physicsEnabled: false,      // Turns off physics engine completely
    viewDistance: 'tiny',       // Only load minimum chunk radius
    checkTimeoutInterval: 60000
  });

  bot.on('spawn', () => {
    console.log('>>> SUCCESS: AFK Bot joined without overloading RAM!');
    
    // Login command for cracked servers
    setTimeout(() => {
      bot.chat('/register Pass123456 Pass123456');
      bot.chat('/login Pass123456');
    }, 2000);

    // Network packet keep-alive (Sends chat ping every 4 minutes)
    setInterval(() => {
      bot.chat('/afk');
    }, 240000);
  });

  bot.on('kicked', (reason) => {
    console.log('>>> Kicked:', reason);
  });

  bot.on('end', (reason) => {
    console.log(`>>> Disconnected (${reason}). Reconnecting in 15s...`);
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('>>> Error:', err);
  });
}

createBot();
