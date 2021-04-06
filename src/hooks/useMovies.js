import {useDataLoading} from "./useDataLoading";
import {fetchMovies} from "../store/api-actions";

export const useMovies = () => {
  return useDataLoading(fetchMovies, `isDataLoaded`, `movies`);
};
