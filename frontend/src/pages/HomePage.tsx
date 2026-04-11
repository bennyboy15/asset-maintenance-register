import toast from "react-hot-toast"
import { Link } from "react-router-dom"

function HomePage() {
    return (
        <>
            <div>HomePage</div>
            <button onClick={() => toast.error("TEST")}>TOAST ME</button>
            <Link to="/suppliers">SUPPLIERS PAGE</Link>
        </>
    )
}

export default HomePage