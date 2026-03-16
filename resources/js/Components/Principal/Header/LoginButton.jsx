import { Link } from "@inertiajs/react";

export default function LoginButton({ isScrolled, className = "" }) {
  return (
    <Link
      href="/login"
      className={`group relative flex items-center justify-center p-2 rounded-full transition-all duration-300 
        ${isScrolled 
          ? "bg-white/10 hover:bg-[#33CCCC] text-white" 
          : "bg-black/20 hover:bg-[#33CCCC] text-white"} 
        ${className}`}
      aria-label="Iniciar sesión"
    >
      {/* Icono SVG */}
      <svg
        className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>

      {/* Tooltip opcional que aparece al hacer hover */}
      <span className="absolute -bottom-10 scale-0 group-hover:scale-100 transition-all bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
        Mi Cuenta
      </span>
    </Link>
  );
}