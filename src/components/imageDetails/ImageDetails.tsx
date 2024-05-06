import { useLocation, useNavigate } from "react-router-dom";
import { ImageData } from "../../utils/types/types";
import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { MdArrowBackIos } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import Loader from "../loader/Loader";

const ImageDetails: React.FC = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const [image, setImage] = useState<ImageData[]>([]);
  const [overview, setOverwiew] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // setLoading(true);
    const response = await fetch(
      `https://pixabay.com/api/?key=43710421-01fe7100b37aad5b2cc8bed3b&id=${id}`
    );
    const data = await response.json();
    console.log(data.hits);

    setImage(data.hits);
    //setLoading(false);
  };
  console.log(overview);

  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:hidden flex justify-between items-center fixed py-5 px-4 w-full">
        <button className="text-2xl text-white" onClick={() => navigate("/")}>
          <MdArrowBackIos />
        </button>
        <button className="text-2xl text-white ml-auto">
          <FaHeart />
        </button>
      </div>
      {image.length !== 0 ? (
        <div className="flex flex-col items-center justify-center w-full  bg-gradient-to-br from-emerald-50 to-slate-100">
          <img
            src={image[0].largeImageURL}
            className="w-full max-h-[100vh] object-contain object-top"
          />

          <div
            className={`fixed w-full bg-white ${
              overview ? "min-h-[450px]" : "min-h-[100px] md:min-h-[100px]"
            } bottom-0 rounded-t-[100px] md:rounded-t-[200px] flex justify-center`}
          >
            <button
              className="absolute bg-orange-500 px-8 py-4 text-white text-lg font-bold rounded-lg -top-5"
              onClick={() => setOverwiew(!overview)}
            >
              overview
            </button>

            <div
              className={`${
                overview ? "block" : "hidden"
              } relative mt-14 self-center ml-[40px]  md:ml-[100px]`}
            >
              <p className=" text-slate-500  md:text-lg  font-bold">Artist</p>
              <p className="font-semibold  md:text-lg ">Ken Taylor</p>
              <p className="text-slate-500 md:text-xl mt-2 font-bold">Size</p>
              <p className="font-semibold md:text-lg">12x16" (30.5x40.6 cm)</p>
              <p className="text-slate-500 md:text-xl mt-2 font-bold">
                Location
              </p>
              <p className="font-semibold md:text-lg ">
                The Museum of Modern Art,
              </p>
              <p className="font-semibold md:text-lg">Melbourne, Australia</p>
              <br />
              <p className=" md:w-[60%] font-semibold md:text-lg ">
                Melbourne based Illustrator & Designer Ken Taylor works
                primarily within the music industry and is predominantly well
                known for his striking rock posters. Ken started in Perth
                Western Australia doing posters and album artwork for local
                bands.
              </p>
              <audio className="w-full md:w-[90%] my-8" controls>
                <source src="/AlanCross-Porter-v2.mp3" type="audio/mpeg" />
                hey
              </audio>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ImageDetails;
