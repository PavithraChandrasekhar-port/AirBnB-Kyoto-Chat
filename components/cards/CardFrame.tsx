import type { CSSProperties, ReactNode } from "react";

// Shared card shell for Stay, Experience and Eat: same radius, shadow and centred text.
export function CardFrame({ style, children }: { style?: CSSProperties; children: ReactNode }) {
  return (
    <article
      style={style}
      className="animate-rise overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-md"
    >
      {children}
    </article>
  );
}

export function CardBody({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="block px-5 pt-4 pb-5 text-center">
      {children}
    </a>
  );
}

export function CardLabel({ className, children }: { className: string; children: ReactNode }) {
  return <p className={`text-[11px] font-bold uppercase tracking-wider ${className}`}>{children}</p>;
}

export const cardTitle = "mt-1 text-xl leading-tight font-bold";
export const cardSub = "mt-1 text-neutral-500";
