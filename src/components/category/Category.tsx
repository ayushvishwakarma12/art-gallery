import { useEffect, useState } from "react";
import { categories } from "../../utils/categories/categories";
import { ImageData } from "../../utils/types/types";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import MobileNavbar from "../mobileNavbar/MobileNavbar";

const Category: React.FC = () => {
  const [category, setCategory] = useState<string>("backgrounds");
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [categoryData, setCategoryData] = useState<ImageData[]>([]);

  useEffect(() => {
    getData();
  }, [category]);

  const getData = async () => {
    // Fetch category data from Pixabay API
    const response = await fetch(
      `https://pixabay.com/api/?key=43710421-01fe7100b37aad5b2cc8bed3b&category=${category}`
    );
    // Update category data in state
    const data = await response.json();
    setCategoryData(data.hits);
  };

  // Function to handle selection of categories
  const handleSelectedCategory = (category: string) => {
    if (!selectedCategory.includes(category)) {
      setCategory(category);
      setSelectedCategory([...selectedCategory, category]);
    }
  };

  // Function to remove a selected category
  const handleRemoveCategory = (category: string) => {
    const updatedCategory = selectedCategory.filter((e) => e !== category);
    setSelectedCategory([...updatedCategory]);
  };

  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      {/* <div className="md:hidden absolute px-5 py-4">
        <button className=" text-xl" onClick={() => navigate("/")}>
          <MdArrowBackIos />
        </button>
      </div> */}
      <div className="md:hidden block">
        <MobileNavbar />
      </div>
      <div className="flex md:flex-row flex-col p-5 sidebar  bg-gradient-to-br from-emerald-50 to-slate-100">
        <ul className="min-w-[180px] py-4 md:py-0 flex md:flex-col gap-4 max-h-[85vh] overflow-x-auto sticky pr-4">
          {categories.map((c, i) => {
            return (
              <li
                key={i}
                onClick={() => handleSelectedCategory(c)}
                className={`px-2 flex justify-between w-full items-center text-start text-base font-semibold ${
                  selectedCategory.includes(c)
                    ? "md:hover:bg-[#FD814A] md:hover:text-white"
                    : "hover:bg-slate-400"
                }  py-2 rounded-md cursor-pointer`}
              >
                {c}
                {selectedCategory.includes(c) && (
                  <span className="min-h-[10px] min-w-[10px] bg-[#FD814A] rounded-full ml-2 md:ml-auto"></span>
                )}
              </li>
            );
          })}
        </ul>
        <div>
          <ul className="flex gap-2 md:gap-5 flex-wrap my-4 px-4">
            {selectedCategory.length > 0 &&
              selectedCategory.map((e) => (
                <li className="flex items-center gap-2 py-2 bg-[#FD814A] text-white px-5 rounded-full font-bold">
                  <button className="">{e}</button>
                  <button onClick={() => handleRemoveCategory(e)}>x</button>
                </li>
              ))}
          </ul>
          <ul className="gap-2 grow w-full grid grid-cols-2 md:flex md:flex-wrap py-5 md:py-0 px-4 ">
            {categoryData.map((e) => (
              <Link key={e.id} to={`/image-details/${e.id}`}>
                <li className="scale-100 hover:brightness-110 hover:scale-[1] duration-500 ease-in-out">
                  <img
                    src={e.largeImageURL}
                    className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-2xl object-cover bg-slate-700"
                    alt={e.type}
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Category;
