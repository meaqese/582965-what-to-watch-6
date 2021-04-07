import {useDataLoading} from "./useDataLoading";
import {fetchFavorites} from "../store/api-actions";

export const useFavorites = () => {
  return useDataLoading(fetchFavorites, `isFavoritesLoaded`, `favorites`);
};
