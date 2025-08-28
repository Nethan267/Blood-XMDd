const config = require('../config');
const fs = require('fs');
const { cmd } = require('../command');

const SETTINGS_FILE = './config.json'; // config file path

function isEnabled(value) {
    return value && value.toString().toLowerCase() === "true";
}

// Load config dynamically
function loadConfig() {
    return JSON.parse(fs.readFileSync(SETTINGS_FILE));
}

// Save updated config
function saveConfig(newConfig) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(newConfig, null, 2));
}

cmd({
    pattern: "settings",
    alias: ["env","setting","allvar"],
    desc: "Manage bot settings with numbers",
    category: "menu",
    react: "⚙️",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        let config = loadConfig();

        const generateMenu = (cfg) => `╭〔 *【𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃】* 〕⊷
┃▸╭───────────
┃▸┃๏ *SETTINGS MENU 👻*
┃▸└───────────···๏
╰────────────────┈⊷

1️⃣ Auto Read Status: ${isEnabled(cfg.AUTO_STATUS_SEEN) ? "✅ *ON*" : "❌ *OFF*"}
   > 1.1 ON | 1.2 OFF

2️⃣ Auto Reply Status: ${isEnabled(cfg.AUTO_STATUS_REPLY) ? "✅ *ON*" : "❌ *OFF*"}
   > 2.1 ON | 2.2 OFF

3️⃣ Auto Reply: ${isEnabled(cfg.AUTO_REPLY) ? "✅ *ON*" : "❌ *OFF*"}
   > 3.1 ON | 3.2 OFF

4️⃣ Auto Sticker: ${isEnabled(cfg.AUTO_STICKER) ? "✅ *ON*" : "❌ *OFF*"}
   > 4.1 ON | 4.2 OFF

5️⃣ Auto Voice: ${isEnabled(cfg.AUTO_VOICE) ? "✅ *ON*" : "❌ *OFF*"}
   > 5.1 ON | 5.2 OFF

6️⃣ Owner React: ${isEnabled(cfg.OWNER_REACT) ? "✅ *ON*" : "❌ *OFF*"}
   > 6.1 ON | 6.2 OFF

7️⃣ Custom Reacts: ${isEnabled(cfg.CUSTOM_REACT) ? "✅ *ON*" : "❌ *OFF*"}
   > 7.1 ON | 7.2 OFF

8️⃣ Auto React: ${isEnabled(cfg.AUTO_REACT) ? "✅ *ON*" : "❌ *OFF*"}
   > 8.1 ON | 8.2 OFF

9️⃣ Delete Links: ${isEnabled(cfg.DELETE_LINKS) ? "✅ *ON*" : "❌ *OFF*"}
   > 9.1 ON | 9.2 OFF

🔟 Anti-Link: ${isEnabled(cfg.ANTI_LINK) ? "✅ *ON*" : "❌ *OFF*"}
   > 10.1 ON | 10.2 OFF

1️⃣1️⃣ Anti-Bad Words: ${isEnabled(cfg.ANTI_BAD) ? "✅ *ON*" : "❌ *OFF*"}
   > 11.1 ON | 11.2 OFF

1️⃣2️⃣ Auto Typing: ${isEnabled(cfg.AUTO_TYPING) ? "✅ *ON*" : "❌ *OFF*"}
   > 12.1 ON | 12.2 OFF

1️⃣3️⃣ Auto Recording: ${isEnabled(cfg.AUTO_RECORDING) ? "✅ *ON*" : "❌ *OFF*"}
   > 13.1 ON | 13.2 OFF

1️⃣4️⃣ Always Online: ${isEnabled(cfg.ALWAYS_ONLINE) ? "✅ *ON*" : "❌ *OFF*"}
   > 14.1 ON | 14.2 OFF

1️⃣5️⃣ Public Mode: ${isEnabled(cfg.PUBLIC_MODE) ? "✅ *ON*" : "❌ *OFF*"}
   > 15.1 ON | 15.2 OFF

1️⃣6️⃣ Read Message: ${isEnabled(cfg.READ_MESSAGE) ? "✅ *ON*" : "❌ *OFF*"}
   > 16.1 ON | 16.2 OFF

*🔢 Reply with number e.g. 1.1 (ON) or 1.2 (OFF)*`;

        // Send initial menu + audio
        const sentMsg = await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/a6wgig.jpg' },
            caption: generateMenu(config),
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363419102725912@newsletter',
                    newsletterName: "𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒🥰",
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/310dic.aac' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

        // Listen to user replies for settings update
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const userReply = msg.message.extendedTextMessage.text.trim().toLowerCase();
            if (!msg.message.extendedTextMessage.contextInfo || msg.message.extendedTextMessage.contextInfo.stanzaId !== sentMsg.key.id) return;

            // Map numbers to settings
            const mapping = {
                "1.1": "AUTO_STATUS_SEEN", "1.2": "AUTO_STATUS_SEEN",
                "2.1": "AUTO_STATUS_REPLY", "2.2": "AUTO_STATUS_REPLY",
                "3.1": "AUTO_REPLY", "3.2": "AUTO_REPLY",
                "4.1": "AUTO_STICKER", "4.2": "AUTO_STICKER",
                "5.1": "AUTO_VOICE", "5.2": "AUTO_VOICE",
                "6.1": "OWNER_REACT", "6.2": "OWNER_REACT",
                "7.1": "CUSTOM_REACT", "7.2": "CUSTOM_REACT",
                "8.1": "AUTO_REACT", "8.2": "AUTO_REACT",
                "9.1": "DELETE_LINKS", "9.2": "DELETE_LINKS",
                "10.1": "ANTI_LINK", "10.2": "ANTI_LINK",
                "11.1": "ANTI_BAD", "11.2": "ANTI_BAD",
                "12.1": "AUTO_TYPING", "12.2": "AUTO_TYPING",
                "13.1": "AUTO_RECORDING", "13.2": "AUTO_RECORDING",
                "14.1": "ALWAYS_ONLINE", "14.2": "ALWAYS_ONLINE",
                "15.1": "PUBLIC_MODE", "15.2": "PUBLIC_MODE",
                "16.1": "READ_MESSAGE", "16.2": "READ_MESSAGE"
            };

            if (mapping[userReply]) {
                const key = mapping[userReply];
                const val = userReply.endsWith(".1") ? "true" : "false";

                config[key] = val;
                saveConfig(config);

                // Send confirmation + refreshed menu
                await conn.sendMessage(from, {
                    image: { url: 'https://files.catbox.moe/a6wgig.jpg' },
                    caption: `✅ *${key.replace(/_/g," ")}* is now ${val === "true" ? "ON ✅" : "OFF ❌"}\n\n${generateMenu(config)}`,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true
                    }
                }, { quoted: mek });

                await conn.sendMessage(from, {
                    audio: { url: 'https://files.catbox.moe/310dic.aac' },
                    mimetype: 'audio/mp4',
                    ptt: true
                }, { quoted: mek });

            } else {
                reply("❌ Invalid option. Use e.g. 1.1 or 1.2");
            }
        });

    } catch (err) {
        console.log(err);
        reply(`❌ Error: ${err.message}`);
    }
});
