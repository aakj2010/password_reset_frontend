import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { useEffect, useContext, useState } from "react";
import Context, { LoginContext } from "./components/ContextProvider/Context";


function App() {

  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);


  // const Navigate = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();
    // console.log(data)
    if (data.status === 401 || !data) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data)
      // Navigate("/dash");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true)
    }, 2000)

  }, [])

  return (
    <>
      {/* {
        data ? ( */}

      <BrowserRouter>
        <Context>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dash" element={<Dashboard />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Context>
      </BrowserRouter>

       {/* ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
        Loading... &nbsp;
          <CircularProgress />
         </Box>
       }  */}
    </>
  );
}

export default App;

