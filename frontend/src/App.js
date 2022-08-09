import React from "react";
import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
import { Provider } from "react-redux";

import StructuresPage from "./pages/structures/Structures";
import StructureAddPage from "./pages/structures/StructureAdd";
import StructureEditPage from "./pages/structures/StructureEdit";
import RecordsPage from "./pages/records/Records";
import RecordAddPage from "./pages/records/RecordAdd";
import RecordEditPage from "./pages/records/RecordEdit";

import Alert from "./components/Alert";

import store from "./redux/store";

import "./styles/index.css"

export const defaultPath = "/app/structures"

function App() {
  function MissingRoute() {
    return < Navigate to={{ pathname: defaultPath }} />
  }

  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route exact path={defaultPath} element={<StructuresPage />} />
          <Route exact path={`${defaultPath}/add`} element={<StructureAddPage />} />
          <Route exact path={`${defaultPath}/:structureId/edit`} element={<StructureEditPage />} />
          <Route exact path={`${defaultPath}/:structureId/records`} element={<RecordsPage />} />
          <Route exact path={`${defaultPath}/:structureId/records/add`} element={<RecordAddPage />} />
          <Route exact path={`${defaultPath}/:structureId/records/:recordId/edit`} element={<RecordEditPage />} />
          <Route path="*" element={<MissingRoute />} />
        </Routes>
        <Alert />
      </Provider>
    </Router>
  );
}

export default App;