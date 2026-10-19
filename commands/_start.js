/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Check if user already accepted terms
var accepted = User.getProperty("accepted_terms");

if (!accepted) {
  Api.sendMessage({
    text: "<i>⚠️ You must accept the terms & privacy policy to use the bot.</i>",
    parse_mode: "html"
  });
  Bot.runCommand("/showTerms");
  return;
}

// Mark user as "active" for broadcast
User.setProperty("is_active", true, "boolean");

// Optionally: Save user in global list (optional, for later use)
let all_users = Bot.getProperty("all_users", []);
if (!all_users) all_users = [];
if (!all_users.includes(user.telegramid)) {
  all_users.push(user.telegramid);
  Bot.setProperty("all_users", all_users, "json");
}

// Then show your main menu (your existing code ↓)

// Function to escape HTML special characters
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Get current Sri Lanka (Colombo) time
let options = {
  timeZone: 'Asia/Colombo',
  hour12: true,
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
};
let sriLankaTime = escapeHtml(new Date().toLocaleString('en-US', options));

// Get user files count
let all_data = Bot.getProperty("user_files", {}) || {};
let userFiles = all_data[user.telegramid] || [];
let totalFiles = userFiles.length;

// Prepare user information with HTML escaping
let username = user.username ? '@' + escapeHtml(user.username) : 'N/A';
let fullName = escapeHtml(user.first_name || '') + ' ' + escapeHtml(user.last_name || '');

// Prepare the message text with HTML formatting
let messageText = 
  `<b>🧒 User Profile</b>\n\n` +
  `<b>🆔 User ID:</b> <code>${escapeHtml(user.telegramid)}</code>\n` +
  `<b>👀 Username:</b> ${username}\n` +
  `<b>✏️ Name:</b> ${fullName}\n` +
  `<b>📚 Total Files:</b> ${totalFiles}\n\n` +
  `<b>⏰ Current Time (Colombo):</b> ${sriLankaTime}`;

Api.sendMessage({
  chat_id: user.telegramid,
  text: messageText,
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [
        { text: "🔐 Upload", callback_data: "/save" },
        { text: "📚 Files", callback_data: "/m" }
      ],
      [
        { text: "📢 Join Our Channel", url: "https://t.me/sl_bjs" }
      ]
    ]
  }
});
