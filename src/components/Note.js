import React from "react";
import Card from "react-bootstrap/Card";

const Note = ({ note, onDelete }) => {
    function handleClick() {
        onDelete(note._id);
    }

    const created = new Date(note.createdAt).toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric" });

    return (
        <Card className="note" text="black">
            <div className="header">
                <h1>
                    {note.title}
                    <span className="datetime">{created}</span>
                </h1>

                <span onClick={handleClick} className="closeBtn">
                    &times;
                </span>
            </div>
            <p>{note.content}</p>
        </Card>
    );
};

export default Note;
