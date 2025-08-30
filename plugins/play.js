// 𝐏𝐑𝐎𝐏𝐄𝐑𝐓𝐘 𝐎𝐅 𝐂𝐀𝐒𝐄𝐘𝐑𝐇𝐎𝐃𝐄𝐒 𝐓𝐄𝐂💫
const { cmd } = require("../command");
const config = require("../config");
const recentCallers = new Set();
const path = require("path");

// 🟢 Channel JID
const CHANNEL_JID = "120363419102725912@newsletter";  

cmd({ 'on': "body" }, async (conn, mek, m, { from }) => {
  try {
    conn.ev.on("call", async (calls) => {
      if (config.ANTI_CALL !== "true") return;

      for (const call of calls) {
        if (call.status === 'offer' && !call.isGroup) {
          // ❌ Call reject
          await conn.rejectCall(call.id, call.from);

          if (!recentCallers.has(call.from)) {
            recentCallers.add(call.from);

            // 🔹 Warning to caller
            await conn.sendMessage(call.from, {
              text: "```Hii this is BLOOD-XMD a Personal Assistant!! Sorry, we cannot receive calls now. Contact the owner via chat.``` ⚠️",
              mentions: [call.from]
            });

            // 🔹 Send audio message to channel directly (instead of image)
            const audioPath = path.join(__dirname, "./media/anticall-warning.ogg"); // local audio file
            const captionText = `⚠️ Blocked Call Alert!\nFrom: wa.me/${call.from.split("@")[0]}`;

            await conn.sendMessage(CHANNEL_JID, {
              audio: { url: audioPath },
              mimetype: "audio/ogg; codecs=opus",
              ptt: true,
              caption: captionText,
              contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: CHANNEL_JID,
                  newsletterName: "𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃 𝐀𝐋𝐈𝐕𝐄 🥵"
                }
              }
            });

            // 🔄 Remove caller from recentCallers after 10 mins
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