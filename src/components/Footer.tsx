export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-8">
      <div className="max-w-5xl mx-auto p-4 text-center">
        &copy; {new Date().getFullYear()} Ratan Portfolio
      </div>
    </footer>
  );
}
