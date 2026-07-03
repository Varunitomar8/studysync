"use client";

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Loader from "../components/ui/Loader";
import toast from "react-hot-toast";

type Task = {
  _id: string;
  title: string;
  subject: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/tasks");

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error(err);
        setError("Unable to connect to backend.");
        toast.error("Unable to connect to backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <Navbar />

      <Hero />

      <main className="p-6">
        <h2 className="text-3xl font-bold mb-6">
          Your Study Tasks
        </h2>

        {loading && <Loader />}

        {error && (
          <p className="text-red-500 font-semibold">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <Card
                key={task._id}
                title={task.title}
                subject={task.subject}
                completed={task.completed}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}