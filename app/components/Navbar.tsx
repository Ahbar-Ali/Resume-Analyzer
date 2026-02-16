import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";

export default function Navbar() {
  const { auth } = usePuterStore();
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between p-4">
      <h1>Resumind</h1>

      {auth.isAuthenticated && (
        <button
          onClick={async () => {
            await auth.signOut();
            navigate("/auth", { replace: true });
          }}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Log Out
        </button>
      )}
    </nav>
  );
}

