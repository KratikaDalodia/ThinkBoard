import React, { useState, useContext } from "react";
import { Link } from "react-router";
import { PlusIcon, Menu, X } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-success font-mono tracking-tighter">
            ThinkBoard
          </h1>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/create" className="btn btn-primary flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              <span>New Note</span>
            </Link>

            <button onClick={logout} className="btn btn-secondary px-6">
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded hover:bg-base-200 transition"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-[#34A853]" />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="mt-4 flex flex-col gap-3 md:hidden">
            <Link
              to="/create"
              className="btn btn-primary flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <PlusIcon className="h-5 w-5" />
              <span>New Note</span>
            </Link>

            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="btn btn-secondary w-full"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
