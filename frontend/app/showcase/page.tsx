"use client";

import { useState } from "react";
import toast from "react-hot-toast";

import {
  Button,
  Input,
  Modal,
  Toast,
  Loader,
} from "@/components/ui";

export default function ShowcasePage() {
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 space-y-8">
      <Toast />

      <h1 className="text-3xl font-bold">
        UI Component Showcase
      </h1>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Buttons</h2>

        <div className="flex gap-4 flex-wrap">
          <Button>Primary</Button>

          <Button variant="secondary">
            Secondary
          </Button>

          <Button variant="outline">
            Outline
          </Button>

          <Button disabled>
            Disabled
          </Button>
        </div>
      </section>

      {/* Input */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Input
        </h2>

        <Input
          label="Name"
          placeholder="Enter your name"
          value={inputValue}
          onChange={(e) =>
            setInputValue(e.target.value)
          }
        />
      </section>

      {/* Modal */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Modal
        </h2>

        <Button
          onClick={() => setIsModalOpen(true)}
        >
          Open Modal
        </Button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Demo Modal"
        >
          <p>
            This is a sample modal window.
          </p>
        </Modal>
      </section>

      {/* Toast */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Toast
        </h2>

        <Button
          onClick={() =>
            toast.success("Toast works!")
          }
        >
          Show Toast
        </Button>
      </section>

      {/* Loader */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Loader
        </h2>

        <Loader />
      </section>
    </div>
  );
}