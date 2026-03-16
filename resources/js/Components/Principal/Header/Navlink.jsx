import { Link } from '@inertiajs/react';

export default function NavLink({ href, children, onClick, className = '' }) {
  return (
    <Link
      href={href}
      // Quitamos hover:text-black y bg-black para que no estorben
      className={`relative transition-colors duration-300 group ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      
    </Link>
  );
}