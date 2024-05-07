import { useLocation, useNavigate } from "react-router-dom";
import { ImageData } from "../../utils/types/types";
import { useContext, useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { MdArrowBackIos } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import Loader from "../loader/Loader";
import { FaRegHeart } from "react-icons/fa";
import ArtGalleryContext from "../../utils/context/artGalleryContext";

const ImageDetails: React.FC = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const [image, setImage] = useState<ImageData[]>([]);

  // State for overview toggle
  const [overview, setOverwiew] = useState<boolean>(false);
  const navigate = useNavigate();

  // Context for saved artworks
  const { setSavedArtWorks } = useContext(ArtGalleryContext);

  // Context for saved artworks
  const { savedArtWorks } = useContext(ArtGalleryContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // setLoading(true);
    const response = await fetch(
      `https://pixabay.com/api/?key=43710421-01fe7100b37aad5b2cc8bed3b&id=${id}`
    );
    const data = await response.json();

    setImage(data.hits);
    //setLoading(false);
  };

  // Function to handle saving artwork
  const handleSaveArtWorksButton = (imageData: ImageData) => {
    setSavedArtWorks((prevSavedArtWorks) => [...prevSavedArtWorks, imageData]);
  };

  // Function to handle removing saved artwork
  const handleUnSavedArtWorksButton = (imageData: ImageData[]) => {
    const savedImageData = savedArtWorks.filter(
      (e: ImageData) => e.id !== imageData[0].id
    );
    setSavedArtWorks(savedImageData);
  };

  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="flex justify-between items-center fixed py-5 px-4 w-full">
        <button
          className="text-2xl text-black"
          onClick={() => navigate("/category")}
        >
          <MdArrowBackIos />
        </button>

        {!savedArtWorks.some((imageData) => imageData?.id === image[0]?.id) ? (
          <button
            className="text-2xl   rounded-full  p-2 "
            onClick={() => handleSaveArtWorksButton(image[0])}
          >
            <FaRegHeart />
          </button>
        ) : (
          <button
            className="text-2xl  text-red-600  rounded-full  p-2 "
            onClick={() => handleUnSavedArtWorksButton(image)}
          >
            <FaHeart />
          </button>
        )}
      </div>
      {image.length !== 0 ? (
        <>
          <div className="flex flex-col items-center justify-center w-full  bg-gradient-to-br from-emerald-50 to-slate-100">
            <img
              src={image[0].largeImageURL}
              alt={image[0].type}
              className="min-w-[90%] min-h-[100vh] max-h-[100vh] object-cover md:object-contain object-top"
            />
          </div>

          <div
            className={`fixed w-full bg-white ${
              overview ? "min-h-[550px]" : "min-h-[100px] md:min-h-[100px]"
            } -bottom-12 rounded-t-[100px] md:rounded-t-[200px] flex justify-center`}
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
                audio
              </audio>
            </div>
          </div>
        </>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ImageDetails;
