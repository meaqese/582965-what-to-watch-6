import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchMovies} from "../store/api-actions";

export const useMovies = () => {
  const {isDataLoaded, movies} = useSelector((state) => state.DATA);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchMovies());
    }
  }, [isDataLoaded]);

  return [isDataLoaded, movies];
};
