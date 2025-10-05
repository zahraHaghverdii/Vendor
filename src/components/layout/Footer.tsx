export default function Footer() {
  return (
    <footer className="flex justify-between mt-8">
      <p className="text-[var(--color-light--3)] mx-auto">
        &copy; {new Date().getFullYear()} شرکت اطلس
      </p>
    </footer>
  );
}
