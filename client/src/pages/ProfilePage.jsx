import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";
const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser?.fullName);
  const [bio, setBio] = useState(authUser?.bio);
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      await updateProfile({ fullName: name, bio });
      navigate("/");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image, fullName: name, bio });
      navigate("/");
    };
  };
  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div
        className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2
      border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg"
      >
        <form
          onSubmit={formSubmitHandler}
          className="flex flex-col gap-5 p-10 flex-1"
        >
          <h3 className="text-lg">Profile Information</h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              onChange={(e) => setSelectedImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
            />
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : assets.avatar_icon
              }
              alt=""
              className={`w-12 h-12 ${selectedImage && "rounded-full"}`}
            />
            Upload Profile Picture
          </label>
          <input
            type="text"
            className="p-2 rounded-md bg-transparent border border-gray-500 
            focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            rows={4}
            className="min-h-[70px] p-2 rounded-md bg-transparent border border-gray-500 
            focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-violet-600 text-white p-2 rounded-md
          hover:bg-gradient-to-l hover:from-purple-600 hover:to-violet-700 transition duration-600"
          >
            Save
          </button>
        </form>
        <img
          className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${
            selectedImage && "rounded-full"
          }`}
          src={authUser?.profilePic ||assets.logo_icon}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProfilePage;
