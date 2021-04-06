import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

export const useDataLoading = (loader, loaderFlagName, loaderDataName) => {
  const data = useSelector((state) => state.DATA);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data[loaderFlagName]) {
      dispatch(loader());
    }
  }, [data[loaderFlagName]]);

  return [data[loaderFlagName], data[loaderDataName]];
};
