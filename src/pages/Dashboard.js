import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import axios from "../api/axios";
const NOTES_URL = "/notes";

const Dashboard = () => {
    window.addEventListener("click", outsideClick);
    const navigate = useNavigate();
    const [notes, setNote] = useState([]);
    const token = localStorage.getItem("token");

    const outsideClick = (e) => {
        // setIsExpanded(false);
        console.log(e.target);
    };

    useEffect(() => {
        if (token == null) {
            navigate("/");
        } else {
            getAllNotes();
        }
    }, []);

    const getAllNotes = async () => {
        try {
            const response = await axios.get(NOTES_URL, {
                headers: { authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            setNote(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const addNote = () => {
        getAllNotes();
    };

    const deleteNote = async (id) => {
        try {
            // on DELETE method pass the data or payload inside de config curly backets, under "data:" tag
            const res = await axios.delete(NOTES_URL, {
                data: { _id: id },
                headers: { "Content-Type": "application/json", authorization: `Bearer ${token}` },
                withCredentials: true,
            });

            if (res.status == 200) {
                console.log("NOte deleted");
                const newNotes = notes.filter((note) => note._id !== id);
                setNote(newNotes);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div id="dashboard">
            <CreateArea onAdd={addNote} />

            {!notes || notes.length == 0 ? (
                <h2 className="notFound">You don't have any notes.</h2>
            ) : (
                <div className="notes-container">
                    {notes.map((noteItem, index) => {
                        return <Note key={index} note={noteItem} onDelete={deleteNote} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
