module.exports = {
    // ... existing

    anticall: {
        warning: `📵 *Auto Call Blocker*\n\n❌ ඔබ botට call attempt කරලා තියෙනවා.\n➡️ කරුණාකර call නොකරන්න.\n➡️ නැත්නම් ඔබට block වෙන්න පුළුවන්.`,
        log: (jid, blocked) => 
            `🚫 *AntiCall Triggered*\n\n📱 Caller: ${jid}\n📌 Blocked: ${blocked ? "Yes" : "No"}\n🕒 ${new Date().toLocaleString()}`,
        status: (state) => `⚙️ AntiCall system is now *${state ? "ENABLED ✅" : "DISABLED ❌"}*`
    }
              }
