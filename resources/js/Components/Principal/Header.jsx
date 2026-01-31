import { useState } from "react";
import { usePage, Link } from "@inertiajs/react"; // ← ✅ Agregamos usePage aquí
import { FaTiktok, FaInstagram, FaFacebookF } from "react-icons/fa"; // importamos los íconos
import HamburgerButton from "./HamburgerButton";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { auth } = usePage().props; // 👈 accedemos al usuario autenticado

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    const menuItems = [
        { name: "Inicio", link: "/" },
        {
            name: "Categorías",
            link: "#",
            submenu: [
                { name: "Quienes Somos", link: "/quienes-somos" },
                { name: "Equipo Directivo", link: "/equipo-directivo" },
                { name: "Nuestra Historia", link: "/Historia" },
                { name: "Politicas", link: "/Politicas" },
            ],
        },
        {
            name: "Historial",
            link: "#",
            submenu: [{ name: "Casos De Exito", link: "/CasosDeExito" }],
        },
        {
            name: "Ayuda",
            link: "#",
            submenu: [
                { name: "INGENIERÍA & CONSULTORÍA", link: "#" },
                { name: "PLANTAS & EQUIPOS", link: "#" },
            ],
        },
        // 🔐 Bloque de Login / Usuario dinámico
        !auth.user
            ? {
                  name: "Cuenta",
                  submenu: [
                      {
                          name: "Iniciar sesión",
                          link: "/login",
                      },
                      {
                          name: "Registrarse",
                          link: "/register",
                      },
                  ],
              }
            : {
                  name: auth.user.name,
                  avatar: auth.user.avatar || "/default-avatar.png",
                  submenu: [
                      {
                          name: "Perfil",
                          link: "/perfil",
                      },
                      {
                          name: "Cerrar sesión",
                          link: "/logout",
                          method: "post",
                          as: "button",
                      },
                  ],
              },
        {
            name: "Mis Compras",
            link: "#",
            submenu: [{ name: "Casos De Exito", link: "/CasosDeExito" }],
        },
    ];

    return (
        <header className="w-full bg-white shadow-sm border-b border-gray-200">
            <nav className="w-full flex justify-between items-center px-6 md:px-10 py-4 relative">
                {/* Logo clickeable con animación */}
                <a
                    href="/"
                    className="flex items-center transform transition duration-300 hover:scale-105 hover:brightness-110"
                >
                    <img
                        src="https://res.cloudinary.com/dcyx3nqj5/image/upload/v1769825946/Clinica2-removebg-preview_hci5hj.png"
                        alt="InnoClinica Logo"
                        className="h-14 md:h-20 object-contain w-auto"
                    />
                </a>

                {/* Menú + Redes sociales */}
                <div className="flex items-center space-x-16">
                    <DesktopMenu menuItems={menuItems} />

                    {/* Redes sociales (solo desktop) */}
                    <div className="hidden md:flex items-center space-x-3">
                        {/* TikTok */}
                        <a
                            href="https://www.tiktok.com/@aquahealthbo?_t=8fpmMbmSosg&_r=1 "
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-black text-white p-3 rounded-full transform transition duration-300 hover:scale-125"
                        >
                            <FaTiktok size={20} />
                        </a>

                        {/* Instagram */}
                        <a
                            href="https://instagram.com/aqua_healthbolivia?igshid=MzMyNGUyNmU2YQ=="
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white p-3 rounded-full transform transition duration-300 hover:scale-125"
                        >
                            <FaInstagram size={20} />
                        </a>

                        {/* Facebook */}
                        <a
                            href="https://www.facebook.com/WWF?mibextid=9R9pXO"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white p-3 rounded-full transform transition duration-300 hover:scale-125"
                        >
                            <FaFacebookF size={20} />
                        </a>
                    </div>

                    {/* Botón hamburguesa (solo mobile) */}
                    <HamburgerButton isOpen={menuOpen} toggle={toggleMenu} />
                </div>

                <MobileMenu isOpen={menuOpen} menuItems={menuItems} />
            </nav>
        </header>
    );
}
