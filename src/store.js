import React, { createContext, useReducer } from "react";

export const StoreContext = createContext();

const initialState = {
  favorites: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.favorites.some(item => item.uid === action.payload.uid && item.type === action.payload.type)) {
        return state; // Avoid duplicates
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          item => !(item.uid === action.payload.uid && item.type === action.payload.type)
        ),
      };
    default:
      return state;
  }
}

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};