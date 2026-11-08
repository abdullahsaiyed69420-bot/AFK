const mineflayer = require('mineflayer');
const http = require('http');

// Web server so Render detects the service as active and healthy
http.createServer((req, res) => {
  res.write("AFK Bot Online");
  res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'Chachunbros3.mcsh.gg',
    port: 25565,
    username: 'AFK_Bot_247',
    version: false
  });

  bot.on('spawn', () => {
    console.log('AFK Bot joined the server!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 15 seconds...');
    setTimeout(createBot, 15000);
  });

  bot.on('error', (err) => {
    console.log('Error:', err);
  });
}

createBot();
