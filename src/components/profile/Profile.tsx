import React, { useContext } from "react";
import Navbar from "../navbar/Navbar";
import ArtGalleryContext from "../../utils/context/artGalleryContext";
import { Link, useNavigate } from "react-router-dom";
import MobileNavbar from "../mobileNavbar/MobileNavbar";
import { MdArrowBackIos } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";

const Profile: React.FC = () => {
  const { savedArtWorks } = useContext(ArtGalleryContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:hidden block">
        <MobileNavbar />
      </div>

      <button
        className="absolute px-4 py-4 text-2xl text-black"
        onClick={() => navigate("/category")}
      >
        <MdArrowBackIos />
      </button>

      <div className="min-h-[90vh] px-12 py-12 bg-gradient-to-br from-emerald-50 to-slate-100">
        <div className="flex flex-col md:flex-row items-center gap-5 shadow-2xl p-5 rounded-lg border-2">
          <img
            src="/user.jpg"
            alt="user profile"
            className="w-[200px] h-[200px] rounded-full border-4 border-[#FD814A] object-cover"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm md:text-base">
              <p className="font-semibold text-slate-500">Username : </p>
              <p>Kevin</p>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base">
              <p className="font-semibold text-slate-500">Gender : </p>
              <p>Male</p>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base">
              <p className="font-semibold text-slate-500">Age : </p>
              <p>24</p>
            </div>
            <div className="flex  gap-2 text-sm md:text-base">
              <p className="font-semibold text-slate-500 ">Bio : </p>
              <p className="max-w-[400px]">
                "Art enthusiast finds joy in exploring diverse creative
                expressions, from classical to avant-garde, seeking inspiration
                in galleries and museums."
              </p>
            </div>
          </div>
          <div className="flex flex-row md:flex-col gap-5 md:text-2xl md:ml-auto">
            <FaTwitter />
            <FaFacebook />
            <AiFillInstagram />
            <FaLinkedin />
          </div>
        </div>
        <div className="mt-8">
          <h1 className="hover:tracking-widest text-sm md:text-base py-2 px-2 hover:w-[200px] duration-1000 ease-in-out cursor-pointer bg-orange-600 md:px-4 shadow-lg md:py-4 rounded-lg font-semibold font-briemhand my-4 w-[150px] text-white">
            Saved Artworks
          </h1>
          {savedArtWorks.length > 0 ? (
            <ul className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-5 shadow-2xl border-2">
              {savedArtWorks.map((e) => (
                <Link key={e.id} to={`/image-details/${e.id}`}>
                  <li>
                    <img
                      className="w-[300px] h-[200px] md:h-[300px] rounded-md object-cover"
                      alt={e.type}
                      src={e.largeImageURL}
                    />
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center">
              <p className="font-semibold text-lg py-8">
                Looks like you haven't saved any photos yet
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
