"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Registration Successful!");

      router.push("/login");
    } catch (err) {
      console.error(err);
      alert("Server Error");
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex justify-center items-center">
        <div className="w-[400px] border rounded-lg p-8 shadow-lg">

          <h1 className="text-3xl font-bold mb-6 text-center">
            Register
          </h1>

          <Input
            label="Email"
            placeholder="Enter Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-6 flex justify-center">
            <Button onClick={handleRegister}>
              Register
            </Button>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}