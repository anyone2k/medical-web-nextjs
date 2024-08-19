import Link from "next/link";
import { ReactNode, AnchorHTMLAttributes } from 'react';

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
}

const NavLink = ({ children, href, ...props }:CustomLinkProps) => (
    <Link href={href} {...props} className={`py-2.5 px-4 text-center rounded-full duration-150 ${props?.className || ""}`}>
        {children}
    </Link>
)

export default NavLink