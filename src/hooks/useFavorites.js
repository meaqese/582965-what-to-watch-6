import {useDataLoading} from "./useDataLoading";
import {fetchFavorites} from "../store/api-actions";
import {useSelector} from "react-redux";

export const useFavorites = () => {
  return useDataLoading(fetchFavorites, `isFavoritesLoaded`, `favorites`);
};
