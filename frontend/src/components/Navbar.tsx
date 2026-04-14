import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
            {/* Logo Section */}
            <div className="flex items-center">
                <h3 className="text-2xl font-bold tracking-tighter text-blue-600 cursor-pointer">
                    LOGO
                </h3>
            </div>

            {/* Navigation Links */}
            <ul className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-600">
                <Link to="/" className="hover:text-blue-600 transition-colors cursor-pointer">Home</Link>
                <Link to="/assets" className="hover:text-blue-600 transition-colors cursor-pointer">Assets</Link>
                <Link to="/my-list" className="hover:text-blue-600 transition-colors cursor-pointer">My List</Link>
                <Link to="/history" className="hover:text-blue-600 transition-colors cursor-pointer">History</Link>
            </ul>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
                <button className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md shadow-blue-200 transition-all active:scale-95">
                    Get Started
                </button>
            </div>
        </nav>
    );
}

export default Navbar;