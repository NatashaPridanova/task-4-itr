import "./App.css";
import * as React from "react";
import BasicModal from "./Modal";
import "@fontsource/roboto/300.css";
import Users from "./Users";
const baseUrl = "https://users-auth-app1.herokuapp.com";

function App() {
  return (
    <div className="App">
      <BasicModal></BasicModal>
      <h2>Users table</h2>
      <Users></Users>
    </div>
  );
}

export default App;
export { baseUrl };
