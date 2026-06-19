import { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white text-black rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-black">
          {title}
        </h2>

        <div className="text-black">
          {children}
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 border border-gray-400 rounded text-black"
        >
          Close
        </button>
      </div>
    </div>
  );
}