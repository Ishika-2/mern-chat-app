import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar:", error.message);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const otherUserId = req.params.id;
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        {
          senderId: loggedInUserId,
          receiverId: otherUserId,
        },
        {
          senderId: otherUserId,
          receiverId: loggedInUserId,
        },
      ],
    }).sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages:", error.message);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    if (!text?.trim() && !image) {
      return res.status(400).json({
        message: "A text message or image is required",
      });
    }

    let imageUrl = "";

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text: text?.trim() || "",
      image: imageUrl,
    });

   await newMessage.save();

const receiverSocketId = getReceiverSocketId(receiverId);

if (receiverSocketId) {
  io.to(receiverSocketId).emit("newMessage", newMessage);
}

return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage:", error.message);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};