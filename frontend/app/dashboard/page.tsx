"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Navbar />

      <main className="p-8 min-h-screen">
        <h1 className="text-4xl font-bold mb-4">
          Dashboard
        </h1>

        <p>Welcome to your StudySync Dashboard!</p>
      </main>

      <Footer />
    </>
  );
}