import type { Route } from "./+types/auth";
import { usePuterStore } from "~/lib/puter";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

export const meta = () => [
  { title: "Resumind | Auth" },
  { name: "description", content: "Login to your account" },
];

export async function loader({ request }: Route.LoaderArgs) {
  return null;
}

export default function Auth() {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();

  const next = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("next") || "/";
  }, [location.search]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10 self-center">
          <div className="flex flex-col gap-2 items-center text-center">
            <h1 className="text-3xl font-bold">Welcome</h1>
            <h2 className="text-lg">Log in to continue to your job journey</h2>
          </div>

          <div>
            {auth.isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <button
                  className="auth-button"
                  onClick={() => navigate(next, { replace: true })}
                >
                  <p>Continue</p>
                </button>

                <button className="auth-button" onClick={auth.signOut}>
                  <p>Log Out</p>
                </button>
              </div>
            ) : (
              <button className="auth-button" onClick={auth.signIn}>
                <p>Log In</p>
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}