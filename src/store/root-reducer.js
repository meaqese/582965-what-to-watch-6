import {combineReducers} from "redux";
import {data} from "./reducers/data/data";
import {processes} from "./reducers/processes/processes";
import {user} from "./reducers/user/user";

export const NameSpace = {
  DATA: `DATA`,
  PROCESSES: `PROCESSES`,
  USER: `USER`
};

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.PROCESSES]: processes,
  [NameSpace.USER]: user
});
