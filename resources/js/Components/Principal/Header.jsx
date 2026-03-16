import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect, useMemo } from "react";
import NavLink from "./Header/Navlink";
import LoginButton from "./Header/LoginButton";
import { NAV_LINKS } from "./Header/nav-config";
import { LogOut, User } from "lucide-react"; // <-- IMPORTANTE

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Clases dinámicas memorizadas para evitar re-cálculos innecesarios
    const headerClasses = useMemo(() => {
        const base =
            "w-full fixed top-0 z-50 transition-all duration-500 ease-in-out";
        if (mobileMenuOpen) return `${base} bg-black/90 backdrop-blur-xl py-4`;
        if (isScrolled)
            return `${base} bg-blue-900/30 py-3 shadow-2xl backdrop-blur-md border-b border-white/20`;
        return `${base} bg-transparent py-6 shadow-2xl backdrop-blur-md border-b border-white/10`;
    }, [isScrolled, mobileMenuOpen]);

    return (
        <header className={headerClasses}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* --- SECCIÓN LOGO --- */}
                <Link
                    href="/"
                    className="relative z-50 hover:opacity-80 transition-opacity"
                >
                    <img
                        src="https://res.cloudinary.com/dcyx3nqj5/image/upload/v1769825946/Clinica2-removebg-preview_hci5hj.png"
                        alt="InnoClinica Logo"
                        className={`transition-all duration-500 object-contain ${isScrolled ? "h-10 w-28" : "h-14 w-36"
                            }`}
                    />
                </Link>

                {/* --- NAVEGACIÓN DESKTOP --- */}
                <div className="flex items-center gap-8">
                    <nav className="hidden lg:flex items-center gap-10">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.href}
                                href={link.href}
                                active={window.location.pathname === link.href} // O la lógica de tu router
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Acciones Globales (Login siempre visible en desktop) */}
                    <div className="hidden lg:flex items-center border-l border-white/10 pl-8">
                        <LoginButton isScrolled={isScrolled} />
                    </div>

                    {/* Botón Hamburguesa (Mobile) */}
                    <button
                        className="lg:hidden relative z-50 p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menu"
                    >
                        <MenuIcon isOpen={mobileMenuOpen} />
                    </button>
                </div>
            </div>

            {/* --- MENÚ MÓVIL (Overlay) --- */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                isScrolled={isScrolled}
                onClose={() => setMobileMenuOpen(false)}
            />
        </header>
    );
}

/** * Sub-componentes internos para limpieza visual
 */

function MenuIcon({ isOpen }) {
    return (
        <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            {isOpen ? (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                />
            ) : (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                />
            )}
        </svg>
    );
}

function MobileMenu({ isOpen, onClose, isScrolled }) {
    const { auth } = usePage().props;
    const user = auth.user;

    return (
        <div className="lg:hidden">
            <div className={`fixed inset-0 backdrop-blur-sm z-[80] transition-opacity duration-600 ${isOpen ? "opacity-0" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />

            <div
                className={`
          fixed left-0 w-full z-[90] bg-[#080e1a] 
          transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          border-b border-white/10 shadow-2xl
          ${isScrolled ? "top-[65px]" : "top-[88px]"} 
          ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}
        `}
            >
                <nav className="flex flex-col py-4">
                    {NAV_LINKS.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className={`
                group flex items-center justify-between px-8 py-3
                text-[12px] font-bold tracking-[0.1em] uppercase
                text-white/90 
                transition-all duration-500
                hover:bg-white/[0.03] hover:text-yellow-500
                ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
              `}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <span>{link.label}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 opacity-0 group-hover:opacity-100 transition-all transform scale-0 group-hover:scale-100" />
                        </Link>
                    ))}

                    {/* Sección de Cuenta en Responsive */}
                    <div className="mt-1 pt-2 border-t border-white/5 flex flex-col gap-4">

                        {user ? (
                            /* MODO: USUARIO AUTENTICADO */
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col text-center">
                                    <p className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                                        Cuenta Activa
                                    </p>
                                    <p className="text-white text-lg font-bold">{user.name}</p>
                                    <p className="text-white text-sm font-normal">{user.email}</p>
                                </div>

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    onClick={onClose}
                                    className="flex items-center justify-center gap-2 w-full py-3
                   mx-auto w-full max-w-[200px] 
                   bg-red-500/10 border border-red-500/20 rounded-xl
                    text-red-500 text-[14px] font-black uppercase
                     tracking-widest hover:bg-red-500/20 transition-all"
                                >
                                    <LogOut className="w-5 h-5" />
                                    Cerrar Sesión
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/login"
                                    onClick={onClose}
                                    className="flex items-center justify-center gap-2 
    mx-auto w-full max-w-[200px] 
    py-3 bg-yellow-500 rounded-xl 
    text-black text-[15px] font-black uppercase tracking-widest 
    hover:bg-yellow-400 transition-all active:scale-95"
                                >
                                    <User className="w-5 h-5" />
                                    Iniciar Sesión
                                </Link>

                                <Link
                                    href="/register"
                                    onClick={onClose}
                                    className="flex items-center justify-center gap-2 
  mx-auto w-full max-w-[200px] 
  py-3 bg-yellow-500 rounded-xl 
  text-black text-[15px] font-black uppercase tracking-widest 
  hover:bg-yellow-400 transition-all active:scale-95"                >
                                    Registrarse
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
}
