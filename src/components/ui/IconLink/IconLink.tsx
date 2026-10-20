import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import "./IconLink.css";

type IconLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
  href: string;
  icon: LucideIcon;
  children: ReactNode;
};

/** Text link followed by an icon. Absolute http(s) URLs open in a new tab. */
export function IconLink({ href, icon: Icon, children, className, ...props }: IconLinkProps) {
  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      className={`ui-control icon-link${className ? ` ${className}` : ""}`}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
    >
      {children}
      <Icon aria-hidden="true" />
      {external && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
    </a>
  );
}
