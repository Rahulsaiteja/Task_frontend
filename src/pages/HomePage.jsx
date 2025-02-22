// import Navbar from "../components/navbar";
// const HomePage = ({ currUser,handleLogout }) => {
//     return (
//         <div>
//             <Navbar currUser={currUser} handleLogout={handleLogout}/>
//             <h1>Home Page</h1>
//         </div>
//     );
// };
// export default HomePage;

import "./HomePage.css";
import Navbar from "../components/navbar";

const HomePage = ({ currUser, handleLogout }) => {
    return (
        <div className="home-container">
            <Navbar currUser={currUser} handleLogout={handleLogout} />
            <h1 className="home-title">Home Page</h1>
        </div>
    );
};

export default HomePage;
