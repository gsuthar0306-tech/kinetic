import { createContext, useContext, useState, type ReactNode } from "react";

type FavoritesContextType = {
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
};

export const FavoritesContext = createContext<FavoritesContextType | null>(
  null,
);

type FavoritesProviderProps = {
  children: ReactNode;
};

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (productId: number) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(productId)) {
        return currentFavorites.filter((id) => id !== productId);
      }

      return [...currentFavorites, productId];
    });
  };

  const isFavorite = (productId: number) => {
    return favorites.includes(productId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
