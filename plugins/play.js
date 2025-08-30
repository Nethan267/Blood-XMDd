// 𝐏𝐑𝐎𝐏𝐄𝐑𝐓𝐘 𝐎𝐅 𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂💫
const { cmd } = require("../command");
const config = require("../config");
const recentCallers = new Set();
const fs = require('fs');
const path = require('path');

// 🟢 Channel JID
const CHANNEL_JID = "1203632xxxxxx@newsletter";  

cmd({ 'on': "body" }, async (conn, mek, m, { from }) => {
  try {
    conn.ev.on("call", async (calls) => {
      if (config.ANTI_CALL !== "true") return;

      for (const call of calls) {
        if (call.status === 'offer' && !call.isGroup) {
          // Call reject
          await conn.rejectCall(call.id, call.from);

          // Avoid duplicate warning
          if (!recentCallers.has(call.from)) {
            recentCallers.add(call.from);

            // 🔹 Warning to caller
            await conn.sendMessage(call.from, {
              text: "```Hii this is BLOOD-XMD a Personal Assistant!! Sorry, we cannot receive calls now. Contact the owner via chat.``` ⚠️",
              mentions: [call.from]
            });

                   // Send image + caption + audio combined
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/xbpir9.jpg` },  
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
            },
            { quoted: verifiedContact }
        );

            // Remove caller after 10 mins
            setTimeout(() => recentCallers.delete(call.from), 10 * 60 * 1000);
          }
        }
      }
    });
  } catch (err) {
    console.error(err);
    await conn.sendMessage(from, {
      text: "⚠️ Error: " + err.message
    }, { quoted: mek });
  }
});