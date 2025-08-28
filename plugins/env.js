const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');

const SETTINGS_FILE = path.join(__dirname, '../settings.json');

// Load settings file or create default
let settings = {};
if (fs.existsSync(SETTINGS_FILE)) {
  settings = JSON.parse(fs.readFileSync(SETTINGS_FILE));
} else {
  settings = {
    AUTO_STATUS_SEEN: "false",
    AUTO_STATUS_REPLY: "false",
    AUTO_REPLY: "false",
    AUTO_STICKER: "false",
    AUTO_VOICE: "false",
    OWNER_REACT: "false",
    CUSTOM_REACT: "false",
    AUTO_REACT: "false",
    DELETE_LINKS: "false",
    ANTI_LINK: "false",
    ANTI_BAD: "false",
    AUTO_TYPING: "false",
    AUTO_RECORDING: "false",
    ALWAYS_ONLINE: "false",
    PUBLIC_MODE: "false",
    READ_MESSAGE: "false"
  };
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
}

function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
}

function isEnabled(value) {
  return value && value.toString().toLowerCase() === "true";
}

// Map number replies to setting keys
const settingMap = {
  "1.1": ["AUTO_STATUS_SEEN", "true"],
  "1.2": ["AUTO_STATUS_SEEN", "false"],
  "2.1": ["AUTO_STATUS_REPLY", "true"],
  "2.2": ["AUTO_STATUS_REPLY", "false"],
  "3.1": ["AUTO_REPLY", "true"],
  "3.2": ["AUTO_REPLY", "false"],
  "4.1": ["AUTO_STICKER", "true"],
  "4.2": ["AUTO_STICKER", "false"],
  "5.1": ["AUTO_VOICE", "true"],
  "5.2": ["AUTO_VOICE", "false"],
  "6.1": ["OWNER_REACT", "true"],
  "6.2": ["OWNER_REACT", "false"],
  "7.1": ["CUSTOM_REACT", "true"],
  "7.2": ["CUSTOM_REACT", "false"],
  "8.1": ["AUTO_REACT", "true"],
  "8.2": ["AUTO_REACT", "false"],
  "9.1": ["DELETE_LINKS", "true"],
  "9.2": ["DELETE_LINKS", "false"],
  "10.1": ["ANTI_LINK", "true"],
  "10.2": ["ANTI_LINK", "false"],
  "11.1": ["ANTI_BAD", "true"],
  "11.2": ["ANTI_BAD", "false"],
  "12.1": ["AUTO_TYPING", "true"],
  "12.2": ["AUTO_TYPING", "false"],
  "13.1": ["AUTO_RECORDING", "true"],
  "13.2": ["AUTO_RECORDING", "false"],
  "14.1": ["ALWAYS_ONLINE", "true"],
  "14.2": ["ALWAYS_ONLINE", "false"],
  "15.1": ["PUBLIC_MODE", "true"],
  "15.2": ["PUBLIC_MODE", "false"],
  "16.1": ["READ_MESSAGE", "true"],
  "16.2": ["READ_MESSAGE", "false"]
};

// Menu text generator
function getMenu() {
  return `╭─〔 *【𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃】* 〕─⊷
┃ *⚙️ SETTINGS MENU ⚙️*
┃────────────────────
┃ *1️⃣ Auto Read Status:* ${isEnabled(settings.AUTO_STATUS_SEEN) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 1.1 ON | 1.2 OFF
┃
┃ *2️⃣ Auto Reply Status:* ${isEnabled(settings.AUTO_STATUS_REPLY) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 2.1 ON | 2.2 OFF
┃
┃ *3️⃣ Auto Reply:* ${isEnabled(settings.AUTO_REPLY) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 3.1 ON | 3.2 OFF
┃
┃ *4️⃣ Auto Sticker:* ${isEnabled(settings.AUTO_STICKER) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 4.1 ON | 4.2 OFF
┃
┃ *5️⃣ Auto Voice:* ${isEnabled(settings.AUTO_VOICE) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 5.1 ON | 5.2 OFF
┃
┃ *6️⃣ Owner React:* ${isEnabled(settings.OWNER_REACT) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 6.1 ON | 6.2 OFF
┃
┃ *7️⃣ Custom Reacts:* ${isEnabled(settings.CUSTOM_REACT) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 7.1 ON | 7.2 OFF
┃
┃ *8️⃣ Auto React:* ${isEnabled(settings.AUTO_REACT) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 8.1 ON | 8.2 OFF
┃
┃ *9️⃣ Delete Links:* ${isEnabled(settings.DELETE_LINKS) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 9.1 ON | 9.2 OFF
┃
┃ *🔟 Anti-Link:* ${isEnabled(settings.ANTI_LINK) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 10.1 ON | 10.2 OFF
┃
┃ *1️⃣1️⃣ Anti-Bad Words:* ${isEnabled(settings.ANTI_BAD) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 11.1 ON | 11.2 OFF
┃
┃ *1️⃣2️⃣ Auto Typing:* ${isEnabled(settings.AUTO_TYPING) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 12.1 ON | 12.2 OFF
┃
┃ *1️⃣3️⃣ Auto Recording:* ${isEnabled(settings.AUTO_RECORDING) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 13.1 ON | 13.2 OFF
┃
┃ *1️⃣4️⃣ Always Online:* ${isEnabled(settings.ALWAYS_ONLINE) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 14.1 ON | 14.2 OFF
┃
┃ *1️⃣5️⃣ Public Mode:* ${isEnabled(settings.PUBLIC_MODE) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 15.1 ON | 15.2 OFF
┃
┃ *1️⃣6️⃣ Read Message:* ${isEnabled(settings.READ_MESSAGE) ? "✅ *ON*" : "❌ *OFF*"}
┃    ➤ 16.1 ON | 16.2 OFF
╰────────────────────
*🔢 Reply with number (e.g. 1.1 / 1.2)*`;
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
    const body = (m.body || "").trim().toLowerCase();

    // If user typed number reply like 1.1 / 2.2
    if (settingMap[body]) {
      const [key, val] = settingMap[body];
      settings[key] = val;
      saveSettings();
      return reply(`✅ *${key.replace(/_/g, " ")}* is now ${val === "true" ? "ON ✅" : "OFF ❌"}`);
    }

    // If no number → Show menu
    await conn.sendMessage(
      from,
      {
        image: { url: 'https://files.catbox.moe/a6wgig.jpg' },
        caption: getMenu()
      },
      { quoted: mek }
    );

  } catch (e) {
    console.log(e);
    reply(`❌ Error: ${e.message}`);
  }
});
