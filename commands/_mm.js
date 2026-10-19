/*CMD
  command: /mm
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

var accepted = User.getProperty("accepted_terms");

if (!accepted) {
  Api.sendMessage({
    text: "<i>⚠️ You must accept the terms & privacy policy to use the bot.</i>",
    parse_mode: "html"
  });

  Bot.runCommand("/showTerms"); // Show Terms Again
  return;
}// Required user variables
let userID = user.telegramid;
let username = user.username ? "@" + user.username : "N/A";
let fullName = user.first_name + (user.last_name ? " " + user.last_name : "");

// Fetch user's saved files
let all_files = Bot.getProperty("user_files", {}) || {};
let user_files = all_files[userID] || [];
let totalFiles = user_files.length;

// Get current time
let currentTime = Libs.DateTimeFormat.format(new Date(), "dd.MM.yyyy HH:mm:ss", "Asia/Colombo");

// Message content
let text = "<b>🧒 User Profile</b>\n\n" +
  "<b>🆔 User ID:</b> <code>" + userID + "</code>\n" +
  "<b>👀 Username:</b> " + username + "\n" +
  "<b>✏️ Name:</b> " + fullName + "\n" +
  "<b>📚 Total Files:</b> " + totalFiles + "\n\n" +
  "<b>⏰ Current Time (Colombo):</b> " + currentTime;

// Inline keyboard
// Inline keyboard
let keyboard = [
  [
    { text: "🔐 Upload", callback_data: "/save" },
    { text: "📚 Files", callback_data: "/m" }
  ],
  [
    { text: "📢 Join Our Channel", url: "https://t.me/sl_bjs" }
  ]
];

// Safe editMessageText or sendMessage
if (request && request.message && request.message.message_id) {
  Api.editMessageText({
    chat_id: userID,
    message_id: request.message.message_id,
    text: text,
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: keyboard }
  });
} else {
  Api.sendMessage({
    chat_id: userID,
    text: text,
    parse_mode: "HTML",
    reply_markup: { inline_keyboard: keyboard }
  });
}
