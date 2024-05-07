import "./App.css";
import Home from "./components/home/Home";
import Gallaries from "./components/galleries/Galleries";
import { Route, Routes } from "react-router-dom";
import Category from "./components/category/Category";
import ImageDetails from "./components/imageDetails/ImageDetails";
import Profile from "./components/profile/Profile";
import NotFound from "./components/notFound/NotFound";
import { useState } from "react";
import ArtGalleryContext from "./utils/context/artGalleryContext";
import { ImageData } from "./utils/types/types";

function App(): JSX.Element {
  const [savedArtWorks, setSavedArtWorks] = useState<ImageData[]>([]);
  return (
    <ArtGalleryContext.Provider value={{ savedArtWorks, setSavedArtWorks }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallaries />} />
        <Route path="/category" element={<Category />} />
        <Route path="/image-details/:id" element={<ImageDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ArtGalleryContext.Provider>
  );
}

export default App;
