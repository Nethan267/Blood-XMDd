const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

function isEnabled(value) {
    // Function to check if a value represents a "true" boolean state
    return value && value.toString().toLowerCase() === "true";
}

cmd({
    pattern: "env",
    alias: ["settings","setting", "allvar"],
    desc: "Settings of bot",
    category: "menu",
    react: "⚙️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Define the settings message with the correct boolean checks
        let envSettings = `╭〔 *【𝐁𝐋𝐎𝐎𝐃 𝐗𝐌𝐃】* 〕⊷
┃▸╭───────────
┃▸┃๏ *ENV SETTINGS 👻*
┃▸└───────────···๏
╰────────────────┈⊷


╭══════════════════════○
┣━ *𝗪𝗢𝗥𝗞 𝗠𝗢𝗗𝗘 😈*
> *1️⃣.1️⃣  Public Work*
> *1️⃣.2️⃣  Private Work*
> *1️⃣.3️⃣  Group Only*
> *1️⃣.4️⃣  Inbox Only*
╭══════════════════════○
┣━ *𝗔𝗨𝗧𝗢 𝗩𝗢𝗜𝗖𝗘 😈*
> *2️⃣.1️⃣ Auto Voice On*
> *2️⃣.2️⃣ Auto Voice Off*
╭══════════════════════○
┣━ *𝗔𝗨𝗧𝗢 𝗦𝗧𝗔𝗧𝗨𝗦 𝗦𝗘𝗘𝗡 😈*
> *3️⃣.1️⃣ Auto Read Status On*
> *3️⃣.2️⃣ Auto Read Status Off*
╭══════════════════════○
┣━ *𝗔𝗨𝗧𝗢 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 😈*
> *4️⃣.1️⃣ Auto sticker On*
> *4️⃣.2️⃣ Auto sticker Off*
╭══════════════════════○
┣━ *𝗔𝗨𝗧𝗢 𝗥𝗘𝗣𝗟𝗬😈*
> *5️⃣.1️⃣ Auto reply On*
> *5️⃣.2️⃣ Auto reply Off*
╭══════════════════════○
┣━ *𝗕𝗢𝗧 𝗢𝗡𝗟𝗜𝗡𝗘 𝗢𝗙𝗙𝗟𝗜𝗡𝗘 😈*
> *6️⃣.1️⃣ Online On*
> *6️⃣.2️⃣ Online Off*
╭══════════════════════○
┣━ *𝗠𝗦𝗚 𝗥𝗘𝗔𝗗 😈*
> *7️⃣.1️⃣ Read Msg On*
> *7️⃣.2️⃣ Read Msg Off*
╭══════════════════════○
┣━ *𝗠𝗦𝗚 𝗥𝗘𝗔𝗖𝗧 😈*
> *8️⃣.1️⃣ Auto React On*
> *8️⃣.2️⃣ Auto React Off*
╭══════════════════════○
┣━ *𝗔𝗡𝗧𝗜 𝗟𝗜𝗡𝗞 😈*
> *9️⃣.1️⃣ Anti Link On*
> *9️⃣.2️⃣ Anti Link Off*
> *9️⃣.3️⃣ Anti Link Remove*
╰═══════════════════════○


* *🔢 Reply Below This Number Change To Bot Change Setting*

> *🄿🄾🅆🄴🅁🄳 🅱🆈 SULA*`;

        const vv = await conn.sendMessage(from, { image: { url: "YOUR PHOTO URL"}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1.1':
                        reply(".update MODE:public" );
                        break;
                    case '1.2':               
                        reply(".update MODE:private");
                        break;
                    case '1.3':               
                          reply(".update MODE:group");
                      break;
                    case '1.4':     
                        reply(".update MODE:inbox");
                      break;
                    case '2.1':     
                        reply(".update AUTO_VOICE:true");
                        break;
                    case '2.2':     
                        reply(".update AUTO_VOICE:false");
                    break;
                    case '3.1':    
                        reply(".update AUTO_READ_STATUS:true");
                    break;
                    case '3.2':    
                        reply(".update AUTO_READ_STATUS:false");
                    break;                    
                    case '4.1':    
                        reply(".update AUTO_STICKER:true");
                    break;
                    case '4.2':    
                        reply(".update AUTO_STICKER:false");
                    break;                                        
                    case '5.1':    
                        reply(".update AUTO_REPLY:true");
                    break;
                    case '5.2':    
                        reply(".update AUTO_REPLY:false");
                    break;                        
                    case '6.1':    
                        reply(".update ALLWAYS_OFFLINE:true");
                    break; 
                    case '6.2':    
                        reply(".update ALLWAYS_OFFLINE:false");
                    break;                       
                    case '7.1':    
                        reply(".update READ_MESSAGE:true");
                    break;
                    case '7.2':    
                        reply(".update READ_MESSAGE:false");
                    break;
                    case '8.1':    
                        reply(".update config.AUTO_REACT:true");
                    break;
                    case '8.2':    
                        reply(".update config.AUTO_REACT:false");
                    break;
                    case '9.1':    
                        reply(".update ANTI_LINK:true");
                        reply(".update ANTI_LINKK:false");
                    break;
                    case '9.2':    
                        reply(".update ANTI_LINKK:true");
                        reply(".update ANTI_LINK:false");
                    break;
                    case '9.3':    
                        reply(".update ANTI_LINK:false");
                        reply(".update ANTI_LINKK:false");
                    break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");

        // Send message with an image
        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/a6wgig.jpg' }, // Image URL
                caption: envSettings,
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

        // Send an audio file
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/310dic.aac' }, // Audio URL
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.log(error);
        reply(`Error: ${error.message}`);
    }
});
