import { Link } from "react-router-dom";

const DeletedAccount = () => {
    return (
        <section className="public">
            <main className="note" style={{ backgroundColor: "#64b5f6" }}>
                <h1>Your account has been successfully deleted.</h1>

                <br />
                <p>
                    <span className="line">
                        <Link to={"/"}>Go to Home</Link>
                    </span>
                </p>
            </main>
        </section>
    );
};

export default DeletedAccount;
