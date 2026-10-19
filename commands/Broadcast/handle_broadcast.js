/*CMD
  command: handle_broadcast
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Broadcast

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ============ CONFIG ============
const ADMIN_ID = 5491775006; // <-- ඔයාගේ Admin Telegram ID දාන්න
// ============ CONFIG END ============

let mode = User.getProperty("bcast_mode");

if (!mode) {
  Bot.sendMessage("❌ No broadcast mode selected. Please start broadcast again.");
  return // <-- Now it's safe, return inside if-block after Bot.sendMessage()
}

let all_users = Bot.getProperty("all_users", []) || [];
let totalUsers = all_users.length;

let successCount = 0;

// Start time
let startTime = Date.now();

// Escape HTML special chars
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// === Broadcast ===
if (mode == "text") {
  let safeText = escapeHtml(message);

  all_users.forEach(function(uid) {
    Api.sendMessage({ chat_id: uid, text: safeText, parse_mode: "HTML" });
    successCount++;
  });

  Api.sendMessage({ chat_id: ADMIN_ID, text: "📢 <b>Broadcast Message (Text)</b>\n\n" + safeText, parse_mode: "HTML" });

} else if (mode == "photo") {
  if (!request.photo) {
    Bot.sendMessage("❌ Please send a valid *photo*.", { parse_mode: "Markdown" });
    return;
  }

  let fileId = request.photo[request.photo.length - 1].file_id;

  all_users.forEach(function(uid) {
    Api.sendPhoto({ chat_id: uid, photo: fileId });
    successCount++;
  });

  Api.sendPhoto({ chat_id: ADMIN_ID, photo: fileId, caption: "📢 <b>Broadcast Message (Photo)</b>", parse_mode: "HTML" });

} else if (mode == "photo_caption") {
  if (!request.photo) {
    Bot.sendMessage("❌ Please send a valid *photo* with caption.", { parse_mode: "Markdown" });
    return;
  }

  let fileId = request.photo[request.photo.length - 1].file_id;
  let caption = request.caption || message || "";
  let safeCaption = escapeHtml(caption);

  all_users.forEach(function(uid) {
    Api.sendPhoto({ 
      chat_id: uid, 
      photo: fileId, 
      caption: safeCaption, 
      parse_mode: "HTML" 
    });
    successCount++;
  });

  Api.sendPhoto({ 
    chat_id: ADMIN_ID, 
    photo: fileId, 
    caption: "📢 <b>Broadcast Message (Photo + Caption)</b>\n\n" + safeCaption, 
    parse_mode: "HTML" 
  });
}

// Calculate time
let endTime = Date.now();
let secondsTaken = Math.floor((endTime - startTime) / 1000);

// Report text
let reportText = 
  `📊 <b>Broadcast Report</b>\n\n` +
  `👥 <b>Total Users:</b> ${totalUsers}\n` +
  `✅ <b>Delivered:</b> ${successCount}\n` +
  `⏰ <b>Time Taken:</b> ${secondsTaken} sec`;

Api.sendMessage({ chat_id: ADMIN_ID, text: reportText, parse_mode: "HTML" });

// Clear session
User.setProperty("bcast_mode", "", "string");
