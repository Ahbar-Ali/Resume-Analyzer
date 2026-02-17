import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import { resumes } from "../constants";
import ResumeCard from "~/components/ResumeCard";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";
import { usePuterStore } from "~/lib/puter";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Analyzer" },
    { name: "description", content: "Smart Feedback for your Dream Job!!" },
  ];
}

export default function Home() {
  const { auth, isLoading } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return; // wait for auth to initialize

    if (!auth.isAuthenticated) {
      navigate("/auth?next=/", { replace: true });
    }
  }, [isLoading, auth.isAuthenticated, navigate]);


  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-4"></div>
        <div className="page-heading">
          <h1>Track Your Applications and Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedback</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}