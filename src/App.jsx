import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useEffect, useState } from "react";
import TaskPage from "./pages/TaskPage";

const App = () => {
    const [currUser, setCurrUser] = useState(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn) {
            return {
                isLoggedIn: true,
                fullName: "Guest",
            };
        } else {
            return {
                isLoggedIn: false,
                fullName: "Guest",
            };
        }
    });

    const afterLogin = (respObj) => {
        const newStateUser = { isLoggedIn: true, fullName: respObj.data.user.fullName };
        localStorage.setItem("isLoggedIn", true);
        setCurrUser(newStateUser);
    };

    const getLoggedInUserInfo = async () => {
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/me", {
            credentials: "include",
        });
        const respObj = await resp.json();
        console.log(respObj);
        setCurrUser({
            isLoggedIn: true,
            fullName: respObj.data.user.fullName,
            email: respObj.data.user.email,
        });
    };

    useEffect(() => {
        if (currUser.isLoggedIn) {
            getLoggedInUserInfo();
        }
    }, []);

    const handleLogout = async () => {
        localStorage.removeItem("isLoggedIn");
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/logout", {
            credentials: "include",
        });
        const respObj = await resp.json();
        if (respObj.status === "success") {
            setCurrUser({
                isLoggedIn: false,
                fullName: "Guest",
            });
        } else {
            alert("Error in Logout! " + respObj.message);
        }
    };

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignUpPage />} />
                    <Route path="/login" element={currUser.isLoggedIn ? <Navigate to="/tasks" /> : <LoginPage afterLogin={afterLogin} />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/tasks" element={currUser.isLoggedIn ? <TaskPage /> : <Navigate to="/login" />} />
                    <Route path="/home" element={currUser.isLoggedIn ? <HomePage currUser={currUser} handleLogout={handleLogout} /> : <Navigate to="/login" />} />
                    <Route
                        path="*"
                        element={
                            <div>
                                Page not found <Link to="/">Home</Link>
                            </div>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;