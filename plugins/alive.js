const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["av", "a", "runtime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Get system info
        const platform = "Heroku Platform"; // Fixed deployment platform
        const release = os.release(); // OS version
        const cpuModel = os.cpus()[0].model; // CPU info
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2); // Total RAM in MB
        const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // Used RAM in MB

        // Stylish and detailed system status message
        const status = `╭───❰ *🩸 𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃 🩸* ❱──┈⊷
┃ *✨𝖴ᴘᴛɪᴍᴇ* : *${runtime(process.uptime())}*
┃ *💾 𝖱ᴀᴍ ᴜsᴀɢᴇ* : *${usedMem}MB / ${totalMem}MB*
┃ *🧑‍💻𝖣ᴇᴘʟᴏʏᴇᴅ ᴏɴ* : *${platform}*
┃ *🧠𝖮ᴡɴᴇʀ* : *sachithra madusanka*
┃ *🧬𝖵ᴇʀsɪᴏɴ* : *𝟣.𝟢.𝟢 𝖡𝖤𝖳𝖠*
╰────────────────────────┈⊷

*╭──────────●●►*
*│Owner = 94761332610*
*╰──────────●●►* 

*Reply Text Massage*

*1 │❯❯◦ COMMANDS MENU ( Comming soon )*
*2 │❯❯◦ BLOOD-XMD SPEED ( .ping )*

𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐆𝐑𝐎𝐔𝐏 𝐋𝐈𝐍𝐊 👉= _https://chat.whatsapp.com/I3QPd8C6WeWJmVaShYIV3g?mode=ac_t_*
𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋 𝐋𝐈𝐍𝐊 👉= _https://whatsapp.com/channel/0029Vb5hLc0HltYF7Ebf2S0M_*


> 𝙿𝙾𝚆𝙴𝚁𝙳 𝙱𝚈 𝙱𝙻𝙾𝙾𝙳 𝚇𝙼𝙳 𝚃𝙴𝙰𝙼`;

        // Send image + caption + audio combined
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/njl5qf.jpg` },  
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363419102725912@newsletter',
                    newsletterName: '𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃 𝐀𝐋𝐈𝐕𝐄 🥵',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Attach audio within the same "quoted" message for grouping
        await conn.sendMessage(from, { 
            audio: { url: 'https://files.catbox.moe/8fiark.mp3' },
            mimetype: 'audio/mp4',
            ptt: true 
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`🚨 *An error occurred:* ${e.message}`);
    }
});
