const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "about",
    alias: ["caseyrhodes","whois"], 
    react: "👑",
    desc: "get owner dec",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let about = `
*╭━━〔 🩸 BLOOD XMD 🩸 〕━━┈⊷*

*👋 HELLO ${pushname}*

*╰──────────────┈⊷*
*╭━━━〔 MY ABOUT 〕━━━┈⊷*
*┃★╭──────────────*
*┃★│* *ᴄʀᴇᴀᴛᴇʀ : Sachithra*
*┃★│* *ʀᴇᴀʟ ɴᴀᴍᴇ : Sachithra Madusanka*
*┃★│* *ᴀɢᴇ : 17 ʏᴇᴀʀ*
*┃★│* *ᴄɪᴛʏ : Kegalla twn*
*┃★│* *ᴀ sɪᴍᴘʟᴇ ᴡʜᴀᴛsᴀᴘᴘ ᴅᴇᴠᴇʟᴘᴏʀ*
*┃★╰──────────────*
*╰━━━━━━━━━━━━━━━┈⊷*
> *◆◆◆◆◆◆◆◆◆◆◆◆*

*[ • SPECIAL THANKS FOR • ]*
*╭━━━〔 THANKS TO 〕━━━┈⊷*
*┃★╭──────────────*
*┃★│* *▢Bot Asiss -: Dileesha*
*┃★│* *▢Age -: 15 years old*
*┃★╰──────────────*
*╰━━━━━━━━━━━━━━━┈⊷*

*•────────────•⟢*
> © ᴾᴼᵂᴱᴿᴰ ᴮʸ ᴮᴸᴼᴼᴰ ˣᴹᴰ
*•────────────•⟢*
`

await conn.sendMessage(from,{image:{url:`https://files.catbox.moe/rklpuz.jpg`},caption:about,
                             contextInfo: {
    mentionedJid: [m.sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363419102725912@newsletter',
      newsletterName: 'BLOOD XMD ABOUT',
      serverMessageId: 999
    }
  }
}, { quoted: mek });
} catch (e) {
console.log(e)
reply(`${e}`)
}
})
