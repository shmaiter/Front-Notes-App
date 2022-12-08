import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../api/axios";
const NOTES_URL = "/notes";

function CreateArea(props) {
    document.addEventListener("click", outsideClick);
    const [isExpanded, setIsExpanded] = useState(false);
    const token = localStorage.getItem("token");
    const [note, setNote] = useState({
        title: "",
        description: "",
    });

    const outsideClick = (e) => {
        // setIsExpanded(false);
        console.log(e.target);
    };

    function handleChange(event) {
        const { name, value } = event.target;

        setNote((prevNote) => {
            return {
                ...prevNote,
                [name]: value,
            };
        });
    }

    const submitNote = async (event) => {
        // onAdd is a fuction passed via props
        // it takes a note object as parameter
        // console.log("AuthData: ", auth);
        event.preventDefault();
        const title = note.title;
        const description = note.description;

        if (title === "" || description === "") {
            toast.warn("Don't leave empty spaces", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        } else {
            // call createNote API route
            try {
                await axios.post(NOTES_URL, JSON.stringify({ title: title, content: description }), {
                    headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                // const note = response?.data;

                props.onAdd();
                setNote({
                    title: "",
                    description: "",
                });
                setIsExpanded(false);
            } catch (err) {
                console.log(err);
            }
        }
    };

    function expand() {
        setIsExpanded(true);
    }

    return (
        <div className="container">
            <ToastContainer />
            <form className="create-note">
                {isExpanded && <input name="title" onChange={handleChange} value={note.title} placeholder="Title" />}

                <textarea name="description" onClick={expand} onChange={handleChange} value={note.description} placeholder="Take a note..." rows={isExpanded ? 3 : 1} />

                <Zoom in={isExpanded} style={{ transitionDelay: "400ms" }}>
                    <Fab onClick={submitNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>
        </div>
    );
}

export default CreateArea;
