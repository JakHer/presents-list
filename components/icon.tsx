import type { CSSProperties, ReactNode } from "react";

const paths = {
  gift: (
    <>
      <path d="M3 8h18v4H3zM5 12v9h14v-9M12 8v13" />
      <path d="M12 8H8a3 3 0 1 1 3-3l1 3Zm0 0h4a3 3 0 1 0-3-3l-1 3Z" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  arrow: <path d="M5 19 19 5M5 5h14v14" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  pencil: <path d="m16 3 5 5-12 12-6 1 1-6L16 3ZM13 6l5 5" />,
  trash: <path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7" />,
  check: <path d="m5 12 4 4L19 6" />,
  sparkle: (
    <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" />
  ),
  book: (
    <path d="M4 4h6l2 2 2-2h6v15h-6l-2 2-2-2H4V4ZM12 6v15M7 8h2M7 12h2M15 8h2M15 12h2" />
  ),
  coffee: (
    <path d="M4 8h13v8a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8ZM17 9h2a3 3 0 1 1 0 6h-2M7 2v2M11 1v3M15 2v2" />
  ),
  headphones: (
    <path d="M4 14v-3a8 8 0 0 1 16 0v3M4 12H3v8h5v-8H4ZM20 12h1v8h-5v-8h4Z" />
  ),
  leaf: (
    <path d="M5 11c0-5 5-7 14-7 0 9-2 14-7 14a7 7 0 0 1-7-7ZM5 21l10-11M5 21H3" />
  ),
  ticket: (
    <path d="M3 5h18v5a2 2 0 0 0 0 4v5H3v-5a2 2 0 0 0 0-4V5ZM15 5v2M15 10v4M15 17v2" />
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className = "",
  style,
}: {
  name: IconName;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
    >
      {paths[name]}
    </svg>
  );
}
