/*CMD
  command: /declineTerms
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Terms

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Delete the message when button is clicked
if (request && request.message) {
  Api.deleteMessage({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id
  });
}

// Save that user declined the terms
User.setProperty("accepted_terms", false, "boolean");

Api.sendMessage({
  text: "<b>❌ You have declined the terms & privacy policy.</b>\n\nYou cannot use the bot until you accept the terms.",
  parse_mode: "html"
});
