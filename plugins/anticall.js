const { cmd } = require('../command')

function isEnabled(value) {
    return value && value.toString().toLowerCase() === "true"
}

module.exports = function anticall(sock) {
    const enabled = isEnabled(process.env.ANTICALL || "true")
    if (!enabled) return

    const warnText = process.env.ANTICALL_MESSAGE || 
        "📵 *Auto Call Blocker*\n\nඔබ Call attempt කර ඇති නිසා ඔබට Block වෙන්න පුලුවන්.\nකරුණාකර call නොකරන්න."

    const shouldBlock = isEnabled(process.env.ANTICALL_BLOCK || "true")
    const logJid = process.env.ANTICALL_LOG_JID || null
    const owner = process.env.OWNER_NUMBER ? `${process.env.OWNER_NUMBER}@s.whatsapp.net` : null

    sock.ev.on("call", async (callData) => {
        for (let c of callData) {
            if (c.status !== "offer") continue
            let caller = c.from

            // Reject call
            try {
                if (typeof sock.rejectCall === "function") {
                    await sock.rejectCall(c.id, caller)
                }
            } catch {}

            // Send warning msg
            try {
                await sock.sendMessage(caller, { 
                    text: warnText, 
                    mentions: owner ? [owner] : [] 
                })
            } catch {}

            // Block caller
            if (shouldBlock) {
                try {
                    await sock.updateBlockStatus(caller, "block")
                } catch {}
            }

            // Log to group if set
            if (logJid) {
                let logMsg = `🚫 *AntiCall Triggered*\n\n📱 From: ${caller}\n📌 Blocked: ${shouldBlock ? "Yes" : "No"}`
                try {
                    await sock.sendMessage(logJid, { text: logMsg })
                } catch {}
            }
        }
    })
      }
