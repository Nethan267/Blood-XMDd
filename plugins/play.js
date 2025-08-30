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
              text: "```Hii this is CASEYRHODES-XMD a Personal Assistant!! Sorry, we cannot receive calls now. Contact the owner via chat.``` ⚠️",
              mentions: [call.from]
            });

            // 🔹 Forward message + audio to channel
            const audioPath = path.join(__dirname, "./media/anticall-warning.ogg");
            await conn.sendMessage(CHANNEL_JID, {
              audio: { url: audioPath },
              mimetype: "audio/ogg; codecs=opus",
              ptt: true,
              caption: `⚠️ Blocked Call Alert!\nFrom: wa.me/${call.from.split("@")[0]}`,
              contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: CHANNEL_JID,
                  newsletterName: "⚠️ AntiCall Alert"
                }
              }
            });

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