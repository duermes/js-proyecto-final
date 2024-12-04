export default function Footer() {
  return (
    <footer className="from-gray-900 to-black text-white py-8">
      <div className="container mx-auto px-4 text-center  text-sm  text-gray-400">
        © {new Date().getFullYear()} My Secret Diary. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
