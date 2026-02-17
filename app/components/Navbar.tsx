import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import {Link} from 'react-router'

export default function Navbar() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center p-4">
    <h1>Resumind</h1>

    <div className="flex items-center gap-4">
      {auth.isAuthenticated && (
        <button
          onClick={async () => {
            await auth.signOut();
            navigate("/auth", { replace: true });
          }}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
          Log Out
        </button>
      )}

      <Link
        to="/upload"
        className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
        Upload Resume
      </Link>
    </div>
  </nav>

  );
}

