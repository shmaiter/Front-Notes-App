import { orange } from "@mui/material/colors";

const colors = [
    "#66bb6a", //green
    "#f48fb1", //pink
    "#64b5f6", //blue
    "#ba68c8",
    orange,
];

const Public = () => {
    const content = (
        <section className="public">
            <div className="note">
                <h1>
                    Welcome to <span className="nowrap">Pin-It!</span>
                </h1>
                <br />
                <p>Keep track of all your notes in a single place.</p>
            </div>
            <div className="note" style={{ backgroundColor: "#66bb6a" }}>
                <h1>Accessiblity with Pin-It</h1>
                <br />
                <p>Access from multiple devices</p>
            </div>
            <div className="note" style={{ backgroundColor: "#f48fb1" }}>
                <h1>Keep track of your ideas</h1>
                <br />
                <p>Don't loose the track.</p>
            </div>
            <div className="note" style={{ backgroundColor: "#64b5f6" }}>
                <h1>Save your notes in the cloud</h1>
                <br />
                <p>Save or delete any of your notes.</p>
            </div>
            <div className="note" style={{ backgroundColor: "#ba68c8" }}>
                <h1>Title and Description with Pin-It</h1>
                <br />
                <p>Stand out your notes by titles</p>
            </div>
            <div className="note" style={{ backgroundColor: "#ff9800" }}>
                <h1>Keep track of time</h1>
                <br />
                <p>Every note keeps the datetime of creation. </p>
            </div>
        </section>
    );

    return content;
};

export default Public;
