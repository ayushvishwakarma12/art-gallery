import React, { useEffect, useState } from "react";
import { ImageData } from "../../utils/types/types";
import Navbar from "../navbar/Navbar";
import MobileNavbar from "../mobileNavbar/MobileNavbar";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";

const Galleries = () => {
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getData();
  }, [pageNo]);

  const getData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://pixabay.com/api/?key=43710421-01fe7100b37aad5b2cc8bed3b&page=${pageNo}`
    );
    const data = await response.json();
    console.log(data.hits);
    setImageData(data.hits);
    setLoading(false);
    // const response = await fetch(
    //   "https://pixabay.com/api/?key=43710421-01fe7100b37aad5b2cc8bed3b&category=&image_type="
    // );
    // const data = await response.json();
    // console.log("hey", data.hits);
  };

  // const gridList = ["wide", "tall", "big"];
  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:hidden block">
        <MobileNavbar />
      </div>
      {!loading ? (
        <div className="min-h-screen  bg-gradient-to-br from-emerald-50 to-slate-100">
          <h1 className="font-briemhand tracking-widest text-center text-xl md:text-4xl font-bold py-4 underline-offset-8 underline">
            Discover the extraoridnary Arts
          </h1>
          <div className="px-4">
            <p className="font-bold pl-8 leading-8">Page No : {pageNo}</p>
            <ul className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2 gap-2 md:px-5 md:gap-4 justify-center h-[70vh] md:h-[80vh] overflow-y-auto">
              {imageData.map((e: ImageData) => (
                <Link key={e.id} to={`/image-details/${e.id}`}>
                  <li className="scale-100 hover:scale-105 duration-500 ease-in-out">
                    <img
                      className=" object-cover h-[200px] w-[200px] md:h-[350px] md:w-[400px]  inline-block bg-slate-900 rounded-lg"
                      key={e.id}
                      src={e.largeImageURL}
                    />
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex py-4 justify-center items-center gap-5">
            <button
              className=" bg-slate-700 w-[150px] md:w-[200px] py-2 rounded-full text-white font-bold hover:bg-slate-600 duration-500 scale-100 hover:scale-105"
              onClick={() => {
                pageNo > 1 && setPageNo(pageNo - 1);
                window.scrollTo(0, 0);
              }}
            >
              Previous
            </button>
            <button
              className=" bg-slate-700 w-[150px] md:w-[200px] py-2 rounded-full text-white font-bold hover:bg-slate-600 duration-500 scale-100 hover:scale-105"
              onClick={() => {
                setPageNo(pageNo + 1);
                window.scrollTo(0, 0);
              }}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[80vh]">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Galleries;
