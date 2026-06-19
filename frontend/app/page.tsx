import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";

export default function Home() {
  return (
    <div>
      <Navbar />

      <Hero />

      <div className="flex justify-center py-6">
        <ThemeToggle />
      </div>

      <main className="grid md:grid-cols-2 gap-4 p-6">
        <Card
          title="Study Planner"
          description="Organize your daily study schedule efficiently."
        />

        <Card
          title="Task Manager"
          description="Track assignments, deadlines, and progress."
        />
      </main>

      <Footer />
    </div>
  );
}