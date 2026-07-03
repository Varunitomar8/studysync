type CardProps = {
  title: string;
  subject: string;
  completed: boolean;
};

export default function Card({
  title,
  subject,
  completed,
}: CardProps) {
  return (
  <div className="rounded-xl border border-gray-600 bg-gray-700 shadow-lg p-6">
    <h3 className="text-2xl font-bold text-white">
      {title}
    </h3>

    <p className="mt-3 text-white">
      <span className="font-semibold">Subject:</span> {subject}
    </p>

    <p className="mt-2 text-white">
      <span className="font-semibold">Completed:</span>{" "}
      {completed ? "✅ Yes" : "❌ No"}
    </p>
  </div>
);
}