const paths = {
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c.6-3.4 2.8-5 5.5-5s4.9 1.6 5.5 5" />
      <path d="M16 5.2a3 3 0 0 1 0 5.6M17.5 15.2c1.7.8 2.8 2.4 3.2 4.8" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M19 15.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6z" />
    </>
  ),
  brain: (
    <>
      <path d="M9.5 4.5a3 3 0 0 0-5.7 1.4A3.5 3.5 0 0 0 5 13v1.5a3.5 3.5 0 0 0 4 3.5" />
      <path d="M14.5 4.5a3 3 0 0 1 5.7 1.4A3.5 3.5 0 0 1 19 13v1.5a3.5 3.5 0 0 1-4 3.5" />
      <path d="M12 4v16M12 6a2.5 2.5 0 0 1 0 3.6M12 10a2.5 2.5 0 0 1 0 3.6M12 14a2.5 2.5 0 0 1 0 3" />
    </>
  ),
  chat: (
    <>
      <path d="M21 11.5a8.5 8.5 0 0 1-9 8.5c-1 0-2-.16-2.9-.46L3 21l1.5-4.2A8.5 8.5 0 1 1 21 11.5z" />
      <path d="M8.5 10.5h7M8.5 13.5h4.5" />
    </>
  ),
  radar: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" />
      <path d="M12 12l5.5-5.5" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="2" />
      <path d="M2.5 6h19v3h-19zM12 6v14M12 6s-4-.5-4-3c0-1.7 2.2-2 3-1 .6.8 1 3 1 4z" />
      <path d="M12 6s4-.5 4-3c0-1.7-2.2-2-3-1-.6.8-1 3-1 4z" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 5h8v5a4 4 0 0 1-8 0V5z" />
      <path d="M8 6H5v1a3 3 0 0 0 3 3M16 6h3v1a3 3 0 0 1-3 3" />
      <path d="M12 14v3M9 20h6M10 17h4v3h-4z" />
    </>
  ),
  check: <path d="M4.5 12.5l5 5 10-11" />,
};

export default function Icon({ name, size = 22, strokeWidth = 1.7 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] ?? null}
    </svg>
  );
}