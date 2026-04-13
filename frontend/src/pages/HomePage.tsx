import toast from "react-hot-toast"
import { Link } from "react-router-dom"

function HomePage() {
    return (
        <>
            <div>HomePage</div>
            <button onClick={() => toast.error("TEST")}>TOAST ME</button>
            <div className="flex flex-col gap-2">
                <Link to="/assets">ASSETS PAGE</Link>
                <Link to="/suppliers">SUPPLIERS PAGE</Link>
            </div>
        </>
    )
}

export default HomePage