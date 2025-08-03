import React, { createContext, useReducer, useContext } from 'react';

const FavoritesContext = createContext();

const initialState = { items: [] };

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVORITE':
      if (
        state.items.some(
          i => i.category === action.payload.category && i.id === action.payload.id
        )
      ) {
        return state;
      }
      return { items: [...state.items, action.payload] };

    case 'REMOVE_FAVORITE':
      return {
        items: state.items.filter(
          i =>
            !(
              i.category === action.payload.category &&
              i.id === action.payload.id
            )
        )
      };

    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const addFavorite = item =>
    dispatch({ type: 'ADD_FAVORITE', payload: item });
  const removeFavorite = item =>
    dispatch({ type: 'REMOVE_FAVORITE', payload: item });

  return (
    <FavoritesContext.Provider
      value={{ favorites: state.items, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}