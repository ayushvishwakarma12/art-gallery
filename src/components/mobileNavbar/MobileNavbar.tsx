import { BsCompass } from "react-icons/bs";
import { AiOutlineAppstore } from "react-icons/ai";
import { PiPencilLine } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const MobileNavbar: React.FC = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  console.log(path);

  return (
    <div className="fixed bottom-0 rounded-t-2xl h-[80px] bg-white w-full px-4  shadow-2xl z-50">
      <div className="relative">
        <div className="absolute h-14 w-14 bg-orange-600 rounded-full flex items-center justify-center text-[45px] font-bold text-white pb-2 left-[45%] -top-10">
          +
        </div>
      </div>
      <div className="flex w-full justify-between items-center text-3xl text-slate-500 mt-5 ">
        <Link to={"/"} className={`${pathname == "/" ? "text-[#FD814A]" : ""}`}>
          <BsCompass />
        </Link>
        <Link
          to={"/category"}
          className={`${path === "category" ? "text-[#FD814A] scale-125" : ""}`}
        >
          <AiOutlineAppstore />
        </Link>
        <Link
          to={"/gallery"}
          className={`${path === "gallery" ? "text-[#FD814A] scale-125" : ""}`}
        >
          <PiPencilLine />
        </Link>
        {/* <Link
          to={"/profile"}
          className={`${path == "category" ? "text-[#FD814A] scale-125" : ""}`}
        >
          <FaRegUser />
        </Link> */}
      </div>
    </div>
  );
};

export default MobileNavbar;
