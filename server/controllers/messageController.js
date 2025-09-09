import Message from "../models/Mesaage.js";
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
        reciverId: usersId,
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
        { senderId: userId, reciverId: selectedUserId },
        { senderId: selectedUserId, reciverId: userId },
      ],
    });
    // Mark messages as seen
    await Message.updateMany(
      { senderId: selectedUserId, reciverId: userId, seen: false },
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
    await Message.findByIdAndUpdate(id, { seen: true });
    res.status(200).json({ success: true});
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
