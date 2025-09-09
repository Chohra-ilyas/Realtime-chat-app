// Get All users except the logged in user
export const getUsersForSideBar = async (req, res) => {
  try {
    const usersId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: usersId } }).select(
      "-password"
    );
    res.status(200).json(filteredUsers);
  } catch (error) {}
};
