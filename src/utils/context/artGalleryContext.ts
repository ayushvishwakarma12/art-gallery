import React, { createContext } from "react";

import { ImageData } from "../types/types";

interface ContextValue {
  savedArtWorks: ImageData[];
  setSavedArtWorks: React.Dispatch<React.SetStateAction<ImageData[]>>;
}

const ArtGalleryContext = createContext<ContextValue>({
  savedArtWorks: [],
  setSavedArtWorks: () => {},
});

export default ArtGalleryContext;
