const config = require('../config');
const { cmd } = require('../command');

function isEnabled(value) {
    return value && value.toString().toLowerCase() === "true";
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
        // Settings Menu
        let settingsMenu = `╭〔 *【𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃】* 〕⊷
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

*🔢 Reply with number e.g. 1.1 (ON) or 1.2 (OFF)*
`;

        // Send message with image + caption (Channel Forward Style)
        const sentMsg = await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/a6wgig.jpg' }, // Image URL
                caption: settingsMenu,
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
            },
            { quoted: mek }
        );

        // Send audio file after menu
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/310dic.aac' }, // Audio URL
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

        // Handle Replies
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const userReply = msg.message.extendedTextMessage.text.trim().toLowerCase();
            if (msg.message.extendedTextMessage.contextInfo &&
                msg.message.extendedTextMessage.contextInfo.stanzaId === sentMsg.key.id) {

                switch (userReply) {
                    case "1.1": reply(".update AUTO_STATUS_SEEN:true"); break;
                    case "1.2": reply(".update AUTO_STATUS_SEEN:false"); break;
                    case "2.1": reply(".update AUTO_STATUS_REPLY:true"); break;
                    case "2.2": reply(".update AUTO_STATUS_REPLY:false"); break;
                    case "3.1": reply(".update AUTO_REPLY:true"); break;
                    case "3.2": reply(".update AUTO_REPLY:false"); break;
                    case "4.1": reply(".update AUTO_STICKER:true"); break;
                    case "4.2": reply(".update AUTO_STICKER:false"); break;
                    case "5.1": reply(".update AUTO_VOICE:true"); break;
                    case "5.2": reply(".update AUTO_VOICE:false"); break;
                    case "6.1": reply(".update OWNER_REACT:true"); break;
                    case "6.2": reply(".update OWNER_REACT:false"); break;
                    case "7.1": reply(".update CUSTOM_REACT:true"); break;
                    case "7.2": reply(".update CUSTOM_REACT:false"); break;
                    case "8.1": reply(".update AUTO_REACT:true"); break;
                    case "8.2": reply(".update AUTO_REACT:false"); break;
                    case "9.1": reply(".update DELETE_LINKS:true"); break;
                    case "9.2": reply(".update DELETE_LINKS:false"); break;
                    case "10.1": reply(".update ANTI_LINK:true"); break;
                    case "10.2": reply(".update ANTI_LINK:false"); break;
                    case "10.3": reply(".update ANTI_LINK:false"); reply(".update DELETE_LINKS:false"); break;
                    case "11.1": reply(".update ANTI_BAD:true"); break;
                    case "11.2": reply(".update ANTI_BAD:false"); break;
                    case "12.1": reply(".update AUTO_TYPING:true"); break;
                    case "12.2": reply(".update AUTO_TYPING:false"); break;
                    case "13.1": reply(".update AUTO_RECORDING:true"); break;
                    case "13.2": reply(".update AUTO_RECORDING:false"); break;
                    case "14.1": reply(".update ALWAYS_ONLINE:true"); break;
                    case "14.2": reply(".update ALWAYS_ONLINE:false"); break;
                    case "15.1": reply(".update PUBLIC_MODE:true"); break;
                    case "15.2": reply(".update PUBLIC_MODE:false"); break;
                    case "16.1": reply(".update READ_MESSAGE:true"); break;
                    case "16.2": reply(".update READ_MESSAGE:false"); break;
                    default:
                        reply("❌ Invalid option. Use e.g. 1.1 or 1.2");
                }
            }
        });

    } catch (err) {
        console.log(err);
        reply(`Error: ${err.message}`);
    }
});
