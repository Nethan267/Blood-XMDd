const config = require('../config');
const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

// Save config to file
function saveConfig() {
    const configPath = path.join(__dirname, '../config.js'); // adjust if config.js path differs
    fs.writeFileSync(configPath, 'module.exports = ' + JSON.stringify(config, null, 4));
}

function isEnabled(value) {
    return value && value.toString().toLowerCase() === "true";
}

// Generate dynamic settings menu caption
function settingsMenu() {
    return `╭〔 *【𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃】* 〕⊷
┃▸╭───────────
┃▸┃๏ *SETTINGS MENU 👻*
┃▸└───────────···๏
╰────────────────┈⊷

1️⃣ Auto Read Status: ${isEnabled(config.AUTO_STATUS_SEEN) ? "✅ ON" : "❌ OFF"}
   > 1.1 ON | 1.2 OFF
2️⃣ Auto Reply Status: ${isEnabled(config.AUTO_STATUS_REPLY) ? "✅ ON" : "❌ OFF"}
   > 2.1 ON | 2.2 OFF
3️⃣ Auto Reply: ${isEnabled(config.AUTO_REPLY) ? "✅ ON" : "❌ OFF"}
   > 3.1 ON | 3.2 OFF
4️⃣ Auto Sticker: ${isEnabled(config.AUTO_STICKER) ? "✅ ON" : "❌ OFF"}
   > 4.1 ON | 4.2 OFF
5️⃣ Auto Voice: ${isEnabled(config.AUTO_VOICE) ? "✅ ON" : "❌ OFF"}
   > 5.1 ON | 5.2 OFF
6️⃣ Owner React: ${isEnabled(config.OWNER_REACT) ? "✅ ON" : "❌ OFF"}
   > 6.1 ON | 6.2 OFF
7️⃣ Custom Reacts: ${isEnabled(config.CUSTOM_REACT) ? "✅ ON" : "❌ OFF"}
   > 7.1 ON | 7.2 OFF
8️⃣ Auto React: ${isEnabled(config.AUTO_REACT) ? "✅ ON" : "❌ OFF"}
   > 8.1 ON | 8.2 OFF
9️⃣ Delete Links: ${isEnabled(config.DELETE_LINKS) ? "✅ ON" : "❌ OFF"}
   > 9.1 ON | 9.2 OFF
🔟 Anti-Link: ${isEnabled(config.ANTI_LINK) ? "✅ ON" : "❌ OFF"}
   > 10.1 ON | 10.2 OFF | 10.3 REMOVE
1️⃣1️⃣ Anti-Bad Words: ${isEnabled(config.ANTI_BAD) ? "✅ ON" : "❌ OFF"}
   > 11.1 ON | 11.2 OFF
1️⃣2️⃣ Auto Typing: ${isEnabled(config.AUTO_TYPING) ? "✅ ON" : "❌ OFF"}
   > 12.1 ON | 12.2 OFF
1️⃣3️⃣ Auto Recording: ${isEnabled(config.AUTO_RECORDING) ? "✅ ON" : "❌ OFF"}
   > 13.1 ON | 13.2 OFF
1️⃣4️⃣ Always Online: ${isEnabled(config.ALWAYS_ONLINE) ? "✅ ON" : "❌ OFF"}
   > 14.1 ON | 14.2 OFF
1️⃣5️⃣ Public Mode: ${isEnabled(config.PUBLIC_MODE) ? "✅ ON" : "❌ OFF"}
   > 15.1 ON | 15.2 OFF
1️⃣6️⃣ Read Message: ${isEnabled(config.READ_MESSAGE) ? "✅ ON" : "❌ OFF"}
   > 16.1 ON | 16.2 OFF

*🔢 Reply with number e.g. 1.1 (ON) or 1.2 (OFF)*`;
}

cmd({
    pattern: "settings",
    alias: ["env","setting","allvar"],
    desc: "Manage bot settings with numbers",
    category: "menu",
    react: "⚙️",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Send menu message (forward style)
        const menuMsg = await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/a6wgig.jpg' },
            caption: settingsMenu(),
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363419102725912@newsletter',
                    newsletterName: "𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒🥰",
                    serverMessageId: 143
                },
                mentionedJid: [m.sender]
            }
        }, { quoted: mek });

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/310dic.aac' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

        // Listen for replies
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message?.extendedTextMessage) return;

            const userReply = msg.message.extendedTextMessage.text.trim().toLowerCase();

            let updated = false;

            switch (userReply) {
                case "1.1": config.AUTO_STATUS_SEEN = "true"; updated = true; break;
                case "1.2": config.AUTO_STATUS_SEEN = "false"; updated = true; break;
                case "2.1": config.AUTO_STATUS_REPLY = "true"; updated = true; break;
                case "2.2": config.AUTO_STATUS_REPLY = "false"; updated = true; break;
                case "3.1": config.AUTO_REPLY = "true"; updated = true; break;
                case "3.2": config.AUTO_REPLY = "false"; updated = true; break;
                case "4.1": config.AUTO_STICKER = "true"; updated = true; break;
                case "4.2": config.AUTO_STICKER = "false"; updated = true; break;
                case "5.1": config.AUTO_VOICE = "true"; updated = true; break;
                case "5.2": config.AUTO_VOICE = "false"; updated = true; break;
                case "6.1": config.OWNER_REACT = "true"; updated = true; break;
                case "6.2": config.OWNER_REACT = "false"; updated = true; break;
                case "7.1": config.CUSTOM_REACT = "true"; updated = true; break;
                case "7.2": config.CUSTOM_REACT = "false"; updated = true; break;
                case "8.1": config.AUTO_REACT = "true"; updated = true; break;
                case "8.2": config.AUTO_REACT = "false"; updated = true; break;
                case "9.1": config.DELETE_LINKS = "true"; updated = true; break;
                case "9.2": config.DELETE_LINKS = "false"; updated = true; break;
                case "10.1": config.ANTI_LINK = "true"; updated = true; break;
                case "10.2": config.ANTI_LINK = "false"; updated = true; break;
                case "10.3": config.ANTI_LINK = "false"; config.DELETE_LINKS = "false"; updated = true; break;
                case "11.1": config.ANTI_BAD = "true"; updated = true; break;
                case "11.2": config.ANTI_BAD = "false"; updated = true; break;
                case "12.1": config.AUTO_TYPING = "true"; updated = true; break;
                case "12.2": config.AUTO_TYPING = "false"; updated = true; break;
                case "13.1": config.AUTO_RECORDING = "true"; updated = true; break;
                case "13.2": config.AUTO_RECORDING = "false"; updated = true; break;
                case "14.1": config.ALWAYS_ONLINE = "true"; updated = true; break;
                case "14.2": config.ALWAYS_ONLINE = "false"; updated = true; break;
                case "15.1": config.PUBLIC_MODE = "true"; updated = true; break;
                case "15.2": config.PUBLIC_MODE = "false"; updated = true; break;
                case "16.1": config.READ_MESSAGE = "true"; updated = true; break;
                case "16.2": config.READ_MESSAGE = "false"; updated = true; break;
            }

            if (updated) {
                saveConfig();
                // Send confirmation message channel style
                await conn.sendMessage(from, {
                    text: `✅ *Setting updated:* ${userReply}`,
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363419102725912@newsletter',
                            newsletterName: "𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒🥰",
                            serverMessageId: 144
                        }
                    }
                });
            }
        });

    } catch (err) {
        console.log(err);
        reply(`Error: ${err.message}`);
    }
});
