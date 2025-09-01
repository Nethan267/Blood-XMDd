const { cmd } = require("../command")
const plat = require("../lib/plat")

let anticallEnabled = true
let blockEnabled = true

module.exports = function anticall(sock) {
    // 📞 Listen for calls
    sock.ev.on("call", async (calls) => {
        if (!anticallEnabled) return
        for (let call of calls) {
            if (call.status !== "offer") continue
            let caller = call.from

            // Reject
            try {
                if (typeof sock.rejectCall === "function") {
                    await sock.rejectCall(call.id, caller)
                }
            } catch {}

            // Warn
            try {
                await sock.sendMessage(caller, { text: plat.anticall.warning })
            } catch {}

            // Block if enabled
            if (blockEnabled) {
                try { await sock.updateBlockStatus(caller, "block") } catch {}
            }
        }
    })

    // 🔘 Commands for owner
    cmd({
        pattern: "anticall",
        desc: "Enable/Disable AntiCall system",
        category: "owner",
        react: "📵"
    }, async (conn, mek, m, { args, isOwner }) => {
        if (!isOwner) return m.reply("❌ Owner only command")

        let choice = (args[0] || "").toLowerCase()

        if (choice === "on") {
            anticallEnabled = true
            return m.reply(plat.anticall.status(true))
        }
        if (choice === "off") {
            anticallEnabled = false
            return m.reply(plat.anticall.status(false))
        }
        if (choice === "blockon") {
            blockEnabled = true
            return m.reply("✅ Callers will now be *BLOCKED* after warning.")
        }
        if (choice === "blockoff") {
            blockEnabled = false
            return m.reply("⚠️ Callers will *NOT* be blocked (only warned).")
        }

        // Help menu
        return m.reply(`📵 *AntiCall Settings*\n\n• .anticall on → Enable anticall\n• .anticall off → Disable anticall\n• .anticall blockon → Block callers\n• .anticall blockoff → Only warn callers`)
    })
            }

