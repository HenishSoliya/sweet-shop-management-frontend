import { useState } from "react";
import loginimage from "../assets/login.png"
import { API_ENDPOINTS } from "../config/api";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const togglePassword = () => setShowPassword((p) => !p);
  const togglePassword2 = () => setShowPassword2((p) => !p);
  const togglePassword3 = () => setShowPassword3((p) => !p);

  const [registerUserName, setRegisterUserName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    let ok = true;
    if (!registerUserName) { alert("Please Enter Username."); ok = false; }
    else if (!registerPassword || registerPassword.length < 6) { alert("Create a password with at least 6 characters."); ok = false; }
    else if (!registerConfirmPassword || registerConfirmPassword !== registerPassword) { alert("Password and Confirm Password does not match."); ok = false; }

    if (ok) {
      let newData = {
        "id": 0,
        "userName": registerUserName,
        "password": registerPassword,
      }
      await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      }).then(async response => {
        alert(await response.text());
        setActiveTab("login");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }).catch(error => {
        console.error('Error:', error);
      });
    }
  }

  const signin = async (e) => {
    e.preventDefault();
    let ok = true;
    if (!userName) { alert("Please Enter Username."); ok = false; }
    else if (!password || password.length < 6) { alert("Password length must be at least 6 characters."); ok = false; }

    if (ok) {
      let newData = {
        "id": 0,
        "userName": userName,
        "password": password,
      }
      await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      }).then(response => {
        if (response.status === 401) {
          alert("Incorrect Username or Password.");
          return null;
        }
        else if (!response.ok) {
          alert(`Error occurred with error code: ${response.status}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      }).then(data => {
        if (data != null) {
          login(data);
          navigate("/dashboard");
        }
      }).catch(error => {
        console.error('Error:', error);
      });
    }
  }

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center px-4 py-12">
      <main className="w-full max-w-sm">
        <section className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-200">
          <img
            src={loginimage}
            alt=""
            className="rounded-2xl mt-4 mb-10 shadow-md w-full object-cover"
          />

          {/* Tabs */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex rounded-full bg-gray-100 p-1 gap-1">
              <button
                onClick={() => setActiveTab("login")}
                className={`px-4 py-1 rounded-full text-sm font-medium transition ${activeTab === "login"
                  ? "bg-white shadow text-gray-700"
                  : "text-gray-600"
                  }`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`px-4 py-1 rounded-full text-sm font-medium transition ${activeTab === "register"
                  ? "bg-white shadow text-gray-700"
                  : "text-gray-600"
                  }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Login Panel */}
          {activeTab === "login" && (
            <form onSubmit={signin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Name
                </label>
                <input
                  className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-300 px-3 py-2"
                  placeholder="Henish Patel"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-300 px-3 py-2 pr-10"
                    placeholder="••••••"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button type="submit" className="w-full py-2 rounded-lg bg-rose-400 text-white font-semibold shadow hover:bg-rose-500">
                Sign in
              </button>
            </form>
          )}

          {/* Register Panel */}
          {activeTab === "register" && (
            <form className="space-y-4" onSubmit={register}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Name
                </label>
                <input
                  className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-300 px-3 py-2"
                  placeholder="Henish Patel"
                  onChange={(e) => setRegisterUserName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword2 ? "text" : "password"}
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-300 px-3 py-2"
                    placeholder="••••••"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePassword2}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                  >
                    {showPassword2 ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword3 ? "text" : "password"}
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-300 px-3 py-2"
                    placeholder="••••••"
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePassword3}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                  >
                    {showPassword3 ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button type="submit" className="w-full py-2 rounded-lg bg-rose-400 text-white font-semibold shadow hover:bg-rose-500">
                Create account
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}

export default Auth;