const config = require('../config');
const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

function isEnabled(value) {
    return value && value.toString().toLowerCase() === "true";
}

// Function to save config to file
function saveConfig() {
    const filePath = path.join(__dirname, '../config.js'); // Adjust path if needed
    fs.writeFileSync(filePath, `module.exports = ${JSON.stringify(config, null, 4)};`);
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
        // Settings Menu
        let settingsMenu = `╭〔 *【𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃】* 〕⊷
┃▸╭───────────
┃▸┃๏ *SETTINGS MENU 👻*
┃▸└───────────···๏
╰────────────────┈⊷

1️⃣ Auto Read Status: ${isEnabled(config.AUTO_STATUS_SEEN) ? "✅ ON" : "❌ OFF"} > 1.1 ON | 1.2 OFF
2️⃣ Auto Reply Status: ${isEnabled(config.AUTO_STATUS_REPLY) ? "✅ ON" : "❌ OFF"} > 2.1 ON | 2.2 OFF
3️⃣ Auto Reply: ${isEnabled(config.AUTO_REPLY) ? "✅ ON" : "❌ OFF"} > 3.1 ON | 3.2 OFF
4️⃣ Auto Sticker: ${isEnabled(config.AUTO_STICKER) ? "✅ ON" : "❌ OFF"} > 4.1 ON | 4.2 OFF
5️⃣ Auto Voice: ${isEnabled(config.AUTO_VOICE) ? "✅ ON" : "❌ OFF"} > 5.1 ON | 5.2 OFF
6️⃣ Owner React: ${isEnabled(config.OWNER_REACT) ? "✅ ON" : "❌ OFF"} > 6.1 ON | 6.2 OFF
7️⃣ Custom Reacts: ${isEnabled(config.CUSTOM_REACT) ? "✅ ON" : "❌ OFF"} > 7.1 ON | 7.2 OFF
8️⃣ Auto React: ${isEnabled(config.AUTO_REACT) ? "✅ ON" : "❌ OFF"} > 8.1 ON | 8.2 OFF
9️⃣ Delete Links: ${isEnabled(config.DELETE_LINKS) ? "✅ ON" : "❌ OFF"} > 9.1 ON | 9.2 OFF
🔟 Anti-Link: ${isEnabled(config.ANTI_LINK) ? "✅ ON" : "❌ OFF"} > 10.1 ON | 10.2 OFF | 10.3 REMOVE
1️⃣1️⃣ Anti-Bad Words: ${isEnabled(config.ANTI_BAD) ? "✅ ON" : "❌ OFF"} > 11.1 ON | 11.2 OFF
1️⃣2️⃣ Auto Typing: ${isEnabled(config.AUTO_TYPING) ? "✅ ON" : "❌ OFF"} > 12.1 ON | 12.2 OFF
1️⃣3️⃣ Auto Recording: ${isEnabled(config.AUTO_RECORDING) ? "✅ ON" : "❌ OFF"} > 13.1 ON | 13.2 OFF
1️⃣4️⃣ Always Online: ${isEnabled(config.ALWAYS_ONLINE) ? "✅ ON" : "❌ OFF"} > 14.1 ON | 14.2 OFF
1️⃣5️⃣ Public Mode: ${isEnabled(config.PUBLIC_MODE) ? "✅ ON" : "❌ OFF"} > 15.1 ON | 15.2 OFF
1️⃣6️⃣ Read Message: ${isEnabled(config.READ_MESSAGE) ? "✅ ON" : "❌ OFF"} > 16.1 ON | 16.2 OFF

*🔢 Reply with number e.g. 1.1 (ON) or 1.2 (OFF)*
`;

        // Send menu with image
        const sentMsg = await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/a6wgig.jpg' },
                caption: settingsMenu,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363419102725912@newsletter',
                        newsletterName: "𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃 SETTINGS",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send audio with menu
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/310dic.aac' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

        // Listen for number replies
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const replyText = msg.message.extendedTextMessage.text.trim();
            const context = msg.message.extendedTextMessage.contextInfo;

            if (context && context.stanzaId === sentMsg.key.id) {
                let confirmation = "";
                switch (replyText) {
                    case "1.1": config.AUTO_STATUS_SEEN = "true"; confirmation = "Auto Read Status ENABLED ✅"; break;
                    case "1.2": config.AUTO_STATUS_SEEN = "false"; confirmation = "Auto Read Status DISABLED ❌"; break;
                    case "2.1": config.AUTO_STATUS_REPLY = "true"; confirmation = "Auto Reply Status ENABLED ✅"; break;
                    case "2.2": config.AUTO_STATUS_REPLY = "false"; confirmation = "Auto Reply Status DISABLED ❌"; break;
                    case "3.1": config.AUTO_REPLY = "true"; confirmation = "Auto Reply ENABLED ✅"; break;
                    case "3.2": config.AUTO_REPLY = "false"; confirmation = "Auto Reply DISABLED ❌"; break;
                    case "4.1": config.AUTO_STICKER = "true"; confirmation = "Auto Sticker ENABLED ✅"; break;
                    case "4.2": config.AUTO_STICKER = "false"; confirmation = "Auto Sticker DISABLED ❌"; break;
                    case "5.1": config.AUTO_VOICE = "true"; confirmation = "Auto Voice ENABLED ✅"; break;
                    case "5.2": config.AUTO_VOICE = "false"; confirmation = "Auto Voice DISABLED ❌"; break;
                    case "6.1": config.OWNER_REACT = "true"; confirmation = "Owner React ENABLED ✅"; break;
                    case "6.2": config.OWNER_REACT = "false"; confirmation = "Owner React DISABLED ❌"; break;
                    case "7.1": config.CUSTOM_REACT = "true"; confirmation = "Custom Reacts ENABLED ✅"; break;
                    case "7.2": config.CUSTOM_REACT = "false"; confirmation = "Custom Reacts DISABLED ❌"; break;
                    case "8.1": config.AUTO_REACT = "true"; confirmation = "Auto React ENABLED ✅"; break;
                    case "8.2": config.AUTO_REACT = "false"; confirmation = "Auto React DISABLED ❌"; break;
                    case "9.1": config.DELETE_LINKS = "true"; confirmation = "Delete Links ENABLED ✅"; break;
                    case "9.2": config.DELETE_LINKS = "false"; confirmation = "Delete Links DISABLED ❌"; break;
                    case "10.1": config.ANTI_LINK = "true"; confirmation = "Anti-Link ENABLED ✅"; break;
                    case "10.2": config.ANTI_LINK = "false"; confirmation = "Anti-Link DISABLED ❌"; break;
                    case "10.3": config.ANTI_LINK = "false"; config.DELETE_LINKS = "false"; confirmation = "Anti-Link & Delete Links DISABLED ❌"; break;
                    case "11.1": config.ANTI_BAD = "true"; confirmation = "Anti-Bad Words ENABLED ✅"; break;
                    case "11.2": config.ANTI_BAD = "false"; confirmation = "Anti-Bad Words DISABLED ❌"; break;
                    case "12.1": config.AUTO_TYPING = "true"; confirmation = "Auto Typing ENABLED ✅"; break;
                    case "12.2": config.AUTO_TYPING = "false"; confirmation = "Auto Typing DISABLED ❌"; break;
                    case "13.1": config.AUTO_RECORDING = "true"; confirmation = "Auto Recording ENABLED ✅"; break;
                    case "13.2": config.AUTO_RECORDING = "false"; confirmation = "Auto Recording DISABLED ❌"; break;
                    case "14.1": config.ALWAYS_ONLINE = "true"; confirmation = "Always Online ENABLED ✅"; break;
                    case "14.2": config.ALWAYS_ONLINE = "false"; confirmation = "Always Online DISABLED ❌"; break;
                    case "15.1": config.PUBLIC_MODE = "true"; confirmation = "Public Mode ENABLED ✅"; break;
                    case "15.2": config.PUBLIC_MODE = "false"; confirmation = "Public Mode DISABLED ❌"; break;
                    case "16.1": config.READ_MESSAGE = "true"; confirmation = "Read Message ENABLED ✅"; break;
                    case "16.2": config.READ_MESSAGE = "false"; confirmation = "Read Message DISABLED ❌"; break;
                    default: confirmation = null;
                }

                if (confirmation) {
                    saveConfig();

                    await conn.sendMessage(from, {
                        text: `📢 *${confirmation}*`,
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
