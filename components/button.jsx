
export default function Button({ label, onClick, color = "blue" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-${color}-600 text-white px-5 py-2 rounded-full hover:bg-${color}-700 transition`}
    >
      {label}
    </button>
  );
}
