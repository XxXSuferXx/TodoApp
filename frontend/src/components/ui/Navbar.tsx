import { Link, NavLink } from "react-router-dom";

const defaultLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function NavBar({ links = defaultLinks, brand = "TodoApp" }) {
  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Link */}
          <Link
            to="/"
            className="text-slate-50 font-semibold text-lg tracking-tight"
          >
            {brand}
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {links.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                    isActive
                      ? "text-amber-300"
                      : "text-slate-400 hover:text-slate-100"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span className="absolute left-4 right-4 -bottom-[17px] h-[2px] bg-sky-400 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}