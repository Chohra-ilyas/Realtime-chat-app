import { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [name, setName] = useState("chohra ilyas");
  const [bio, setBio] = useState("i'm a web developer");
  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div
        className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2
      border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg"
      >
        <form className="flex flex-col gap-5 p-10 flex-1">
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
            className="p-2 rounded-md bg-transparent border border-gray-500 
            focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </form>
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default ProfilePage;
