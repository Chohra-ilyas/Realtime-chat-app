import assets from "../assets/assets";
const LoginPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center
      justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl"
    >
      {/* -----left side------ */}
      <img src={assets.logo_big} alt="" />
    </div>
  );
};

export default LoginPage;
