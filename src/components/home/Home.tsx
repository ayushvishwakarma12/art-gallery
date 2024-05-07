import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="h-screen w-full bg-cyan-500 flex justify-start items-center  "
        style={{
          background: `url('/art.png') center/cover`,
          backgroundPosition: "center 30%",
        }}
      >
        <div
          className=" rounded-2xl mx-2 md:ml-10 px-12 py-12 shadow-2xl h-[300px] flex flex-col justify-center
          hover:bg-slate-800 hover:bg-opacity-80 duration-1000 bg-black bg-opacity-70 ease-in-out scale-100 hover:scale-105"
        >
          <h1 className="text-4xl font-briemhand text-center text-white scale-up ">
            A Journey Through Arts
          </h1>

          <button
            className=" bg-rose-300 px-5 hover:tracking-widest py-4 font-semibold rounded-xl mt-10 hover:bg-rose-500 duration-500"
            onClick={() => navigate("/gallery")}
          >
            Explore Arts
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
