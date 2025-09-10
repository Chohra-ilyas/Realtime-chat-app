import Message, { messageValidationSchema } from "../models/Mesaage.js";
import User from "../models/User.js";

// Get All users except the logged in user
export const getUsersForSideBar = async (req, res) => {
  try {
    const usersId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: usersId } }).select(
      "-password"
    );
    // Count unread messages for each user
    const unreadMessages = {};
    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: usersId,
        seen: false,
      });
      if (messages.length > 0) {
        unreadMessages[user._id] = messages.length;
      }
    });
    await Promise.all(promises);
    res
      .status(200)
      .json({ success: true, users: filteredUsers, unreadMessages });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get all messages for selected user
export const getMessages = async (req, res) => {
  try {
    const { id: selectedUserId } = req.params;
    const userId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: selectedUserId },
        { senderId: selectedUserId, receiverId: userId },
      ],
    });
    // Mark messages as seen
    await Message.updateMany(
      { senderId: selectedUserId, receiverId: userId, seen: false },
      { $set: { seen: true } }
    );
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// mark messages as seen using messageId
export const markMessagesAsSeen = async (req, res) => {
  try {
    const { messageIds } = req.params;
    await Message.findByIdAndUpdate(messageIds, { seen: true });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Send a message to selected user
export const sendMessage = async (req, res) => {
  try {
    const { error } = messageValidationSchema(req.body);
    const receiverId = req.params.id;
    const senderId = req.user._id;
    const { text, image } = req.body;
    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "chat-app",
      });
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });
    res.status(200).json({ success: true, newMessage });
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
