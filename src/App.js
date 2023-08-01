import './App.css';
import About from './Pages/About';
import AddEditBlog from './Pages/AddEditBlog';
import Details from './Pages/Details';
import Home from './Pages/Home';
import {Routes,Route, Navigate, useLocation} from 'react-router-dom';
import NoteFound from './Pages/NoteFound';
import NavBar from './components/NavBar';
import Auth from './Pages/Auth';
import { ToastContainer } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import { UserState } from './context/UserContext';
import { ToastError } from './Utility/ErrorHandler';
import { useEffect } from 'react';
function App() {
const {User}=UserState();
const location=useLocation();
useEffect(()=>{
  if (
    (location.pathname !=='/' ) &&
    !User
  ) {
    if (location.pathname !== "/auth") ToastError("Please login!");
  }
})
  return (
    <>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route
          path="/detail/:id"
          element={User ? <Details /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/create"
          element={
            User ? (
              <AddEditBlog />
            ) : (
              <>
                <Navigate to="/" />
              </>
            )
          }
        ></Route>
        <Route
          path="/update/:id"
          element={User ? <AddEditBlog /> : <Navigate to="/" />}
        ></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/*" element={<NoteFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
