import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
const LOGOUT_URL = "/logout";
const USERS_URL = "/users";

const PublicNavbar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isModal, setIsModal] = useState(false);
    let token;

    useEffect(() => {
        token = localStorage.getItem("token");
    }, [pathname]);

    const login = () => {
        navigate("/login");
    };

    const renderModal = () => {
        const modal = document.querySelector(".simpleModal");
        if (isModal) {
            setIsModal(false);
            modal.style.display = "none";
        } else {
            setIsModal(true);
            modal.style.display = "block";
        }
    };

    const deleteAccount = async () => {
        renderModal();
        token = localStorage.getItem("token");
        try {
            // on DELETE method pass the data or payload inside de config curly backets, under "data:" tag
            const res = await axios.delete(USERS_URL, {
                headers: { authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            console.log(JSON.stringify(res.data));

            if (res.status == 200) {
                navigate("/deleted");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const logout = async () => {
        try {
            const response = await axios.post(LOGOUT_URL, {
                headers: { authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            console.log(JSON.stringify(response.data));
            if (token) {
                localStorage.removeItem("token");
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    let content;
    if (pathname === "/") {
        content = (
            <button type="button" onClick={login}>
                Log In
            </button>
        );
    } else if (pathname === "/register" || pathname === "/login") {
        content = "";
    } else {
        content = (
            <>
                <button type="button" onClick={logout}>
                    Logout
                </button>
                <button className="deleteAccount" type="button" onClick={renderModal}>
                    Delete Account
                </button>
                <div className="simpleModal">
                    <div className="modal-content">
                        <p>
                            Are you sure do you want to delete the account? <b>(all your notes will be deleted)</b>
                        </p>
                        <div className="modalBtns">
                            <button className="modalBtn yes" onClick={deleteAccount}>
                                YES
                            </button>
                            <button className="modalBtn no" onClick={renderModal}>
                                NO
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <header>
            <Link to={"/"}>
                <h1>Pin-It</h1>
            </Link>

            <div>{content}</div>
        </header>
    );
};

export default PublicNavbar;
