import "./LoginPage.css";

const LoginPage = ({ afterLogin }) => {
    const handleLogin = async (e) => {
        e.preventDefault();
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/login", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value,
            }),
            headers: {
                "content-type": "application/json",
            },
        });
        const respObj = await resp.json();
        console.log(resp);
        console.log(respObj);
        if (respObj.status === "success") {
            afterLogin(respObj);
        } else {
            alert(respObj.message);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                <input type="email" placeholder="Email" name="email" required className="login-input" />
                <input type="password" placeholder="Password" name="password" required className="login-input" />
                <button className="login-button">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;

