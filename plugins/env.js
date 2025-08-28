const config = require('../config');
const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

function isEnabled(value) {
    return value && value.toString().toLowerCase() === "true";
}

// Save config function
function saveConfig() {
    const filePath = path.join(__dirname, '../config.js');
    fs.writeFileSync(filePath, `module.exports = ${JSON.stringify(config, null, 4)};`);
}

// SETTINGS COMMAND
cmd({
    pattern: "settings",
    alias: ["env","setting","allvar"],
    desc: "Manage bot settings with numbers",
    category: "menu",
    react: "⚙️",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // SETTINGS MENU
        let settingsMenu = `╭─〔 *【𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃】* 〕─⊷
┃ *⚙️ SETTINGS MENU ⚙️*
┃────────────────────
┃ 1️⃣ Auto Read Status: ${isEnabled(config.AUTO_STATUS_SEEN) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 1.1 ON | 1.2 OFF
┃ 2️⃣ Auto Reply Status: ${isEnabled(config.AUTO_STATUS_REPLY) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 2.1 ON | 2.2 OFF
┃ 3️⃣ Auto Reply: ${isEnabled(config.AUTO_REPLY) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 3.1 ON | 3.2 OFF
┃ 4️⃣ Auto Sticker: ${isEnabled(config.AUTO_STICKER) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 4.1 ON | 4.2 OFF
┃ 5️⃣ Auto Voice: ${isEnabled(config.AUTO_VOICE) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 5.1 ON | 5.2 OFF
┃ 6️⃣ Owner React: ${isEnabled(config.OWNER_REACT) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 6.1 ON | 6.2 OFF
┃ 7️⃣ Custom Reacts: ${isEnabled(config.CUSTOM_REACT) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 7.1 ON | 7.2 OFF
┃ 8️⃣ Auto React: ${isEnabled(config.AUTO_REACT) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 8.1 ON | 8.2 OFF
┃ 9️⃣ Delete Links: ${isEnabled(config.DELETE_LINKS) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 9.1 ON | 9.2 OFF
┃ 🔟 Anti-Link: ${isEnabled(config.ANTI_LINK) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 10.1 ON | 10.2 OFF
┃ 1️⃣1️⃣ Anti-Bad Words: ${isEnabled(config.ANTI_BAD) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 11.1 ON | 11.2 OFF
┃ 1️⃣2️⃣ Auto Typing: ${isEnabled(config.AUTO_TYPING) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 12.1 ON | 12.2 OFF
┃ 1️⃣3️⃣ Auto Recording: ${isEnabled(config.AUTO_RECORDING) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 13.1 ON | 13.2 OFF
┃ 1️⃣4️⃣ Always Online: ${isEnabled(config.ALWAYS_ONLINE) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 14.1 ON | 14.2 OFF
┃ 1️⃣5️⃣ Public Mode: ${isEnabled(config.PUBLIC_MODE) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 15.1 ON | 15.2 OFF
┃ 1️⃣6️⃣ Read Message: ${isEnabled(config.READ_MESSAGE) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 16.1 ON | 16.2 OFF
╰────────────────────`;

        // Send menu + image
        const sentMsg = await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/a6wgig.jpg' },
            caption: settingsMenu
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
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const replyText = msg.message.extendedTextMessage.text.trim();
            const context = msg.message.extendedTextMessage.contextInfo;

            if (context && context.stanzaId === sentMsg.key.id) {
                let confirmation = "";
                switch (replyText) {
                    case "5.1": config.AUTO_VOICE = "true"; confirmation = "✅ *Auto Voice ENABLED*"; break;
                    case "5.2": config.AUTO_VOICE = "false"; confirmation = "❌ *Auto Voice DISABLED*"; break;
                    // Add other settings here if needed
                    default: confirmation = null;
                }

                if (confirmation) {
                    saveConfig();
                    await conn.sendMessage(from, {
                        text: confirmation,
                        contextInfo: {
                            forwardingScore: 999,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '120363419102725912@newsletter',
                                newsletterName: "𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃 CONFIRMATION",
                                serverMessageId: Math.floor(Math.random() * 1000)
                            }
                        }
                    });
                }
            }
        });

    } catch (err) {
        console.log(err);
        reply(`Error: ${err.message}`);
    }
});
