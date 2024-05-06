import { useEffect, useState } from "react";
import { categories } from "../../utils/categories/categories";
import { ImageData } from "../../utils/types/types";
import Navbar from "../navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";
import MobileNavbar from "../mobileNavbar/MobileNavbar";

const Category: React.FC = () => {
  const [category, setCategory] = useState<string>("backgrounds");
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<ImageData[]>([]);
  const navigate = useNavigate();
  console.log(selectedCategory);

  useEffect(() => {
    getData();
  }, [category]);

  const getData = async () => {
    setLoading(true);
    const response = await fetch(
      `https://pixabay.com/api/?key=43710421-01fe7100b37aad5b2cc8bed3b&category=${category}`
    );
    const data = await response.json();
    setCategoryData(data.hits);
    setLoading(false);
  };

  const handleSelectedCategory = (category: string) => {
    if (!selectedCategory.includes(category)) {
      setCategory(category);
      setSelectedCategory([...selectedCategory, category]);
    }
  };

  const handleRemoveCategory = (category: string) => {
    const updatedCategory = selectedCategory.filter((e) => e !== category);
    setSelectedCategory([...updatedCategory]);
  };

  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:hidden px-5 py-4">
        <button className="text-xl" onClick={() => navigate("/")}>
          <MdArrowBackIos />
        </button>
      </div>
      <div className="md:hidden block">
        <MobileNavbar />
      </div>
      <div className="flex md:flex-row flex-col p-5 sidebar  bg-gradient-to-br from-emerald-50 to-slate-100">
        <ul className="min-w-[200px] px-2 py-4 md:py-0 flex md:flex-col gap-4 max-h-[85vh] overflow-x-auto sticky">
          {categories.map((c, i) => {
            return (
              <li
                key={i}
                onClick={() => handleSelectedCategory(c)}
                className={`${
                  selectedCategory.includes(c) && "bg-slate-800 text-white"
                } w-full text-start text-base font-semibold hover:bg-slate-400 p-2 rounded-2xl cursor-pointer`}
              >
                {c}
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
          <ul className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-2 w-full py-5 md:py-0 px-4 max-h-[80vh] overflow-y-auto">
            {categoryData.map((e) => (
              <Link key={e.id} to={`/image-details/${e.id}`}>
                <li className="scale-100 hover:brightness-110 hover:scale-[1] duration-500 ease-in-out">
                  <img
                    src={e.largeImageURL}
                    className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-2xl object-cover bg-slate-700"
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
