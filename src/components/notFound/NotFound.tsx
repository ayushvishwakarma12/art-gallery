import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col py-4 px-4 md:py-12 md:px-12 h-screen items-center justify-center">
      <img
        src="https://res.cloudinary.com/ddkfpnw7u/image/upload/v1684156199/movie%20app/Background-Complete_vldnun.png"
        alt="not found"
        className="w-[400px] h-[300px]"
      />
      <h1 className="text-2xl font-semibold mt-8">Oops! Page Not Found</h1>
      <button
        className="bg-[#FD814A] px-8 py-4 text-white rounded-full text-lg mt-8"
        onClick={() => navigate("/")}
      >
        Back to homepage
      </button>
    </div>
  );
};

export default NotFound;
