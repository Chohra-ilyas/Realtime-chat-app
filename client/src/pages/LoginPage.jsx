import { useState } from "react";
import assets from "../assets/assets";
const LoginPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [currentState, setCurrentState] = useState("Sign Up");
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(currentState === "Sign Up" && !isDataSubmitted){
      setIsDataSubmitted(true);
      return
    }
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center
      justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl"
    >
      {/* -----left side------ */}
      <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)]" />

      {/* -----right side------ */}
      <form
        onSubmit={formSubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex
        flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currentState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt=""
              className="w-4 cursor-pointer"
            />
          )}
        </h2>
        {currentState === "Sign Up" && !isDataSubmitted && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 border-b border-gray-500 focus:outline-none rounded-md focus:ring-2
              focus:ring-indigo-500"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              type="email"
              placeholder="Email"
              className="p-2 border-b border-gray-500 focus:outline-none rounded-md focus:ring-2
              focus:ring-indigo-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 border-b border-gray-500 focus:outline-none rounded-md focus:ring-2
              focus:ring-indigo-500"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        {currentState === "Sign Up" && isDataSubmitted && (
          <textarea
            rows={4}
            placeholder="Bio"
            className="min-h-[60px] p-2 border border-gray-500 focus:outline-none rounded-md focus:ring-2
              focus:ring-indigo-500"
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        )}

        <button
          className="bg-gradient-to-r from-purple-400 to-violet-600
         hover:from-purple-500 hover:to-violet-500 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
        >
          {currentState === "Sign Up" ? "Create Account" : "Log In"}
        </button>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" className="w-4 h-4 accent-indigo-500" />
          <p>Agree to the terms and conditions & privacy policy</p>
        </div>

        <div className="flex flex-col gap-2">
          {currentState === "Sign Up" ? (
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <span
                className="text-violet-500 cursor-pointer"
                onClick={() => {
                  setCurrentState("Log In");
                  setIsDataSubmitted(false);
                }}
              >
                Log In
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <span
                className="text-violet-500 cursor-pointer"
                onClick={() => setCurrentState("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
