import './App.css';
import contextAPI from "./contextAPI"
import {useContext,useState} from "react"
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import UserPage from "./pages/userPage"
import AdminPage from "./pages/adminPage"
import UserReg from "./pages/UserReg"
import EventEdit from "./pages/EventEdit"
import Map from "./pages/Map"
function App() {
const [user,setUser]=useState({})
  return (
    <contextAPI.Provider value={{ user, setUser }}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" exact element={<HomePage />}></Route>
            <Route path="/user" exact element={<UserPage />}></Route>
            <Route path="/admin" exact element={<AdminPage />}></Route>
            <Route path="/admin/edit" exact element={<EventEdit />}></Route>
            <Route
              path="/user/userregister"
              exact
              element={<UserReg />}
            ></Route>
            <Route path="/user/map" exact element={<Map />}></Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </contextAPI.Provider>
  );
}

export default App;
