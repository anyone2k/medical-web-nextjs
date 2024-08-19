"use client";

import Link from "next/link";
import NavLink from "./ui/Navlink";
import { useEffect, useRef, useState } from "react";
import NavHeader from "./ui/Navheader/Navheader";
import { FaGoogle } from "react-icons/fa";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useScroll, motion, useMotionValueEvent } from "framer-motion";

const Navbar = () => {
  const [state, setState] = useState(false);
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Awaited<
    ReturnType<typeof getProviders>
  > | null>(null);
  const menuBtnEl = useRef<HTMLButtonElement>(null);
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Chat", href: "/chat" },
    { name: "Appointments", href: "/appointments" },
    { name: "Profile", href: "/profile" },
  ];

  const { scrollY } = useScroll(); // Track the scroll position
  const [show, setShow] = useState(true); // Track whether to show the navbar

  // Using Framer Motion's useMotionValueEvent to detect scroll changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;
    if (latest > previous) {
      setShow(false);
    } else {
      setShow(true);
    }
  });
  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();

    const handleClickOutside = (e: MouseEvent) => {
      if (menuBtnEl.current && !menuBtnEl.current.contains(e.target as Node)) {
        setState(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [session]);
  return (
    <header className="fixed w-[100%]">
      <motion.div
        animate={{ y: show ? 0 : -100 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="custom-screen md:hidden bg-[#28574E]"
      >
        <NavHeader
          menuBtnEl={menuBtnEl}
          state={state}
          onClick={() => setState(!state)}
        />
      </motion.div>
      <motion.nav
        animate={{ y: show ? 0 : -100 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`md:text-sm md:static md:block ${
          state
            ? " pb-5 sticky z-999 top-0 inset-x-4 shadow-lg rounded-xl border md:shadow-none md:border-none"
            : "hidden"
        } `}
        style={{ backgroundColor: "#28574E" }}
      >
        <div className="custom-screen gap-x-20 items-center md:flex">
          <NavHeader
            menuBtnEl={menuBtnEl}
            state={state}
            onClick={() => setState(!state)}
          />
          <div
            className={`flex-1 items-center mt-8 text-gray-600 md:font-medium md:mt-0 md:flex ${
              state ? "block" : "hidden"
            } `}
          >
            <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => {
                return (
                  (item.name !== "Appointments" && item.name !== "Profile" && (
                    <li key={idx} className="hover:text-gray-900 text-white">
                      <Link href={item.href} className="block" scroll={false}>
                        {item.name}
                      </Link>
                    </li>
                  )) ||
                  (session && (
                    <li key={idx} className="hover:text-gray-900 text-white">
                      <Link href={item.href} className="block" scroll={false}>
                        {item.name}
                      </Link>
                    </li>
                  ))
                );
              })}
            </ul>
            <div
              className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0"
              style={{ color: "#28574E" }}
            >
              {!session &&
                providers &&
                Object.values(providers).map((provider: any) => (
                  <NavLink
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    href="#"
                    className="flex items-center justify-center gap-x-1 text-sm  font-medium bg-white hover:bg-[#1E232F] hover:text-white active:bg-[#1E232F] md:inline-flex"
                  >
                    <FaGoogle />
                    Login or Register
                  </NavLink>
                ))}
              {session && (
                <NavLink
                  href="#"
                  onClick={() => signOut()}
                  className="flex items-center justify-center gap-x-1 text-sm  font-medium text-[#28574E] bg-[#FFFFFF] hover:bg-[#1E232F]  hover:text-white active:bg-[#1E232F] md:inline-flex"
                >
                  Sign Out
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;
