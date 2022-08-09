import { combineReducers } from "redux";

import alerts from "./Alerts";
import records from "./Records";
import structures from "./Structures";

export default combineReducers({ alerts, records, structures });