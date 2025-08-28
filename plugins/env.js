const config = require('../config');
const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

function isEnabled(value) {
    return value && value.toString().toLowerCase() === "true";
}

// Save updated config
function saveConfig() {
    const filePath = path.join(__dirname, '../config.js');
    fs.writeFileSync(filePath, `module.exports = ${JSON.stringify(config, null, 4)};`);
}

cmd({
    pattern: "settings",
    alias: ["env","setting","allvar"],
    desc: "Manage bot settings with numbers",
    category: "menu",
    react: "⚙️",
    filename: __filename
}, async (conn, mek, m, { from }) => {
    try {
        const settingsMenu = `╭─〔 *【𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃】 SETTINGS ⚙️* 〕─⊷
┃ 1️⃣ Auto Read Status: ${isEnabled(config.AUTO_STATUS_SEEN) ? "✅ ON" : "❌ OFF"}
┃    ➤ 1.1 ON | 1.2 OFF
┃
┃ 2️⃣ Auto Reply Status: ${isEnabled(config.AUTO_STATUS_REPLY) ? "✅ ON" : "❌ OFF"}
┃    ➤ 2.1 ON | 2.2 OFF
┃
┃ 3️⃣ Auto Reply: ${isEnabled(config.AUTO_REPLY) ? "✅ ON" : "❌ OFF"}
┃    ➤ 3.1 ON | 3.2 OFF
┃
┃ 4️⃣ Auto Sticker: ${isEnabled(config.AUTO_STICKER) ? "✅ ON" : "❌ OFF"}
┃    ➤ 4.1 ON | 4.2 OFF
┃
┃ 5️⃣ Auto Voice: ${isEnabled(config.AUTO_VOICE) ? "✅ ON" : "❌ OFF"}
┃    ➤ 5.1 ON | 5.2 OFF
┃
┃ 6️⃣ Owner React: ${isEnabled(config.OWNER_REACT) ? "✅ ON" : "❌ OFF"}
┃    ➤ 6.1 ON | 6.2 OFF
┃
┃ 7️⃣ Custom Reacts: ${isEnabled(config.CUSTOM_REACT) ? "✅ ON" : "❌ OFF"}
┃    ➤ 7.1 ON | 7.2 OFF
┃
┃ 8️⃣ Auto React: ${isEnabled(config.AUTO_REACT) ? "✅ ON" : "❌ OFF"}
┃    ➤ 8.1 ON | 8.2 OFF
┃
┃ 9️⃣ Delete Links: ${isEnabled(config.DELETE_LINKS) ? "✅ ON" : "❌ OFF"}
┃    ➤ 9.1 ON | 9.2 OFF
┃
┃ 🔟 Anti-Link: ${isEnabled(config.ANTI_LINK) ? "✅ ON" : "❌ OFF"}
┃    ➤ 10.1 ON | 10.2 OFF
┃
┃ 1️⃣1️⃣ Anti-Bad Words: ${isEnabled(config.ANTI_BAD) ? "✅ ON" : "❌ OFF"}
┃    ➤ 11.1 ON | 11.2 OFF
┃
┃ 1️⃣2️⃣ Auto Typing: ${isEnabled(config.AUTO_TYPING) ? "✅ ON" : "❌ OFF"}
┃    ➤ 12.1 ON | 12.2 OFF
┃
┃ 1️⃣3️⃣ Auto Recording: ${isEnabled(config.AUTO_RECORDING) ? "✅ ON" : "❌ OFF"}
┃    ➤ 13.1 ON | 13.2 OFF
┃
┃ 1️⃣4️⃣ Always Online: ${isEnabled(config.ALWAYS_ONLINE) ? "✅ ON" : "❌ OFF"}
┃    ➤ 14.1 ON | 14.2 OFF
┃
┃ 1️⃣5️⃣ Public Mode: ${isEnabled(config.PUBLIC_MODE) ? "✅ ON" : "❌ OFF"}
┃    ➤ 15.1 ON | 15.2 OFF
┃
┃ 1️⃣6️⃣ Read Message: ${isEnabled(config.READ_MESSAGE) ? "✅ ON" : "❌ OFF"}
┃    ➤ 16.1 ON | 16.2 OFF
╰────────────────────
*🔢 Reply with number e.g. 5.1 (ON) or 5.2 (OFF)*`;

        // Send menu (Channel Style)
        const sentMsg = await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/a6wgig.jpg' },
            caption: settingsMenu,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363419102725912@newsletter',
                    newsletterName: "𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃 𝐒𝐄𝐓𝐓𝐈𝐍𝐆𝐒"
                }
            }
        }, { quoted: mek });

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/310dic.aac' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

        // Handle Replies
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const text = msg.message.extendedTextMessage.text.trim();
            const ctx = msg.message.extendedTextMessage.contextInfo;

            if (ctx && ctx.stanzaId === sentMsg.key.id) {
                let confirmMsg = "";

                const updates = {
                    "1.1": ["AUTO_STATUS_SEEN", "true", "✅ Auto Read Status ENABLED"],
                    "1.2": ["AUTO_STATUS_SEEN", "false", "❌ Auto Read Status DISABLED"],

                    "2.1": ["AUTO_STATUS_REPLY", "true", "✅ Auto Reply Status ENABLED"],
                    "2.2": ["AUTO_STATUS_REPLY", "false", "❌ Auto Reply Status DISABLED"],

                    "3.1": ["AUTO_REPLY", "true", "✅ Auto Reply ENABLED"],
                    "3.2": ["AUTO_REPLY", "false", "❌ Auto Reply DISABLED"],

                    "4.1": ["AUTO_STICKER", "true", "✅ Auto Sticker ENABLED"],
                    "4.2": ["AUTO_STICKER", "false", "❌ Auto Sticker DISABLED"],

                    "5.1": ["AUTO_VOICE", "true", "✅ Auto Voice ENABLED"],
                    "5.2": ["AUTO_VOICE", "false", "❌ Auto Voice DISABLED"],

                    "6.1": ["OWNER_REACT", "true", "✅ Owner React ENABLED"],
                    "6.2": ["OWNER_REACT", "false", "❌ Owner React DISABLED"],

                    "7.1": ["CUSTOM_REACT", "true", "✅ Custom React ENABLED"],
                    "7.2": ["CUSTOM_REACT", "false", "❌ Custom React DISABLED"],

                    "8.1": ["AUTO_REACT", "true", "✅ Auto React ENABLED"],
                    "8.2": ["AUTO_REACT", "false", "❌ Auto React DISABLED"],

                    "9.1": ["DELETE_LINKS", "true", "✅ Delete Links ENABLED"],
                    "9.2": ["DELETE_LINKS", "false", "❌ Delete Links DISABLED"],

                    "10.1": ["ANTI_LINK", "true", "✅ Anti-Link ENABLED"],
                    "10.2": ["ANTI_LINK", "false", "❌ Anti-Link DISABLED"],

                    "11.1": ["ANTI_BAD", "true", "✅ Anti-Bad Words ENABLED"],
                    "11.2": ["ANTI_BAD", "false", "❌ Anti-Bad Words DISABLED"],

                    "12.1": ["AUTO_TYPING", "true", "✅ Auto Typing ENABLED"],
                    "12.2": ["AUTO_TYPING", "false", "❌ Auto Typing DISABLED"],

                    "13.1": ["AUTO_RECORDING", "true", "✅ Auto Recording ENABLED"],
                    "13.2": ["AUTO_RECORDING", "false", "❌ Auto Recording DISABLED"],

                    "14.1": ["ALWAYS_ONLINE", "true", "✅ Always Online ENABLED"],
                    "14.2": ["ALWAYS_ONLINE", "false", "❌ Always Online DISABLED"],

                    "15.1": ["PUBLIC_MODE", "true", "✅ Public Mode ENABLED"],
                    "15.2": ["PUBLIC_MODE", "false", "❌ Public Mode DISABLED"],

                    "16.1": ["READ_MESSAGE", "true", "✅ Read Message ENABLED"],
                    "16.2": ["READ_MESSAGE", "false", "❌ Read Message DISABLED"]
                };

                if (updates[text]) {
                    const [key, value, message] = updates[text];
                    config[key] = value;
                    saveConfig();
                    confirmMsg = message;
                }

                if (confirmMsg) {
                    // Confirm msg goes to Channel only
                    await conn.sendMessage(
                        '120363419102725912@newsletter',
                        {
                            text: confirmMsg,
                            contextInfo: {
                                forwardingScore: 999,
                                isForwarded: true,
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: '120363419102725912@newsletter',
                                    newsletterName: "𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃 𝐔𝐏𝐃𝐀𝐓𝐄"
                                }
                            }
                        }
                    );
                }
            }
        });

    } catch (err) {
        console.log(err);
        await conn.sendMessage(from, { text: `Error: ${err.message}` });
    }
});
