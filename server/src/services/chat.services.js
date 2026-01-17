
import {auth} from "../lib/auth.js";
import prisma from "../lib/db.js";

console.log("💬 Initializing Chat Service...");

export class ChatService {
  /**
   * Create a new conversation
   * @param {string} userId - User ID
   * @param {string} mode - chat, tool, or agent
   * @param {string} title - Optional conversation title
   */
  async createConversation( userId , mode = "chat", title = null) {
    console.log(`📝 Creating new ${mode} conversation for user ${userId}...`);
    const conversation = await prisma.conversation.create({
      data: {
        userId,
        mode,
        title: title || `New ${mode} conversation`,
      },
    });
    console.log(`✅ Conversation created with ID: ${conversation.id}`);
    return conversation;
  }

  /**
   * Get or create a conversation for user
   * @param {string} userId - User ID
   * @param {string} conversationId - Optional conversation ID
   * @param {string} mode - chat, tool, or agent
   */
  async getOrCreateConversation(userId, conversationId = null, mode = "chat") {
    console.log(`🔍 Getting or creating conversation for user ${userId} (mode: ${mode})...`);

    if (conversationId) {
      console.log(`📋 Looking for existing conversation with ID: ${conversationId}`);
      const conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId,
        },
        include: {
          messages: {
            orderBy: { createdAt: "asc" },
          },
        },
      });

      if (conversation) {
        console.log(`✅ Found existing conversation with ${conversation.messages.length} messages`);
        return conversation;
      }
      console.log("⚠️ Conversation not found, will create new one");
    }

    console.log("🆕 Creating new conversation...");
    // Create new conversation if not found or not provided
    return await this.createConversation(userId, mode);
  }

  /**
   * Add a message to conversation
   * @param {string} conversationId - Conversation ID
   * @param {string} role - user, assistant, system, tool
   * @param {string|object} content - Message content
   */
  async addMessage(conversationId, role, content) {
    console.log(`💬 Adding ${role} message to conversation ${conversationId}...`);

    // Convert content to JSON string if it's an object
    const contentStr = typeof content === "string" 
      ? content 
      : JSON.stringify(content);

    console.log(`📝 Message content type: ${typeof content === "string" ? "string" : "object"}`);

    const message = await prisma.message.create({
      data: {
        conversationId,
        role,
        content: contentStr,
      },
    });

    console.log(`✅ Message added with ID: ${message.id}`);
    return message;
  }

  /**
   * Get conversation messages
   * @param {string} conversationId - Conversation ID
   */
  async getMessages(conversationId) {
    console.log(`📜 Retrieving messages for conversation ${conversationId}...`);

    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });

    console.log(`✅ Retrieved ${messages.length} messages`);

    // Parse JSON content back to objects if needed
    const parsedMessages = messages.map((msg) => ({
      ...msg,
      content: this.parseContent(msg.content),
    }));

    console.log("🔄 Message content parsing completed");
    return parsedMessages;
  }

  /**
   * Get all conversations for a user
   * @param {string} userId - User ID
   */
  async getUserConversations(userId) {
    console.log(`📂 Retrieving conversations for user ${userId}...`);

    const conversations = await prisma.conversation.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: {
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    console.log(`✅ Retrieved ${conversations.length} conversations`);
    return conversations;
  }

  /**
   * Delete a conversation
   * @param {string} conversationId - Conversation ID
   * @param {string} userId - User ID (for security)
   */
  async deleteConversation(conversationId, userId) {
    console.log(`🗑️ Deleting conversation ${conversationId} for user ${userId}...`);

    const result = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userId,
      },
    });

    console.log(`✅ Deleted ${result.count} conversation(s)`);
    return result;
  }

  /**
   * Update conversation title
   * @param {string} conversationId - Conversation ID
   * @param {string} title - New title
   */
  async updateTitle(conversationId, title) {
    console.log(`📝 Updating title for conversation ${conversationId} to "${title}"...`);

    const conversation = await prisma.conversation.update({
      where: { id: conversationId },
      data: { title },
    });

    console.log("✅ Conversation title updated");
    return conversation;
  }

  /**
   * Helper to parse content (JSON or string)
   */
  parseContent(content) {
    console.log("🔄 Parsing message content...");
    try {
      const parsed = JSON.parse(content);
      console.log("✅ Content parsed as JSON");
      return parsed;
    } catch {
      console.log("ℹ️ Content is plain string");
      return content;
    }
  }

  /**
   * Format messages for AI SDK
   * @param {Array} messages - Database messages
   */
  formatMessagesForAI(messages) {
    console.log(`🤖 Formatting ${messages.length} messages for AI SDK...`);

    const formatted = messages.map((msg) => ({
      role: msg.role,
      content: typeof msg.content === "string" ? msg.content : JSON.stringify(msg.content),
    }));

    console.log("✅ Messages formatted for AI SDK");
    return formatted;
  }
}