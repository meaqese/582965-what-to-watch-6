import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchFavorites} from "../store/api-actions";

export const useFavorites = () => {
  const {favorites, isFavoritesLoaded} = useSelector((state) => state.DATA);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isFavoritesLoaded) {
      dispatch(fetchFavorites());
    }
  }, [isFavoritesLoaded]);

  return [isFavoritesLoaded, favorites];
};
