/**
 * Stroke icons, 24x24, weight 1.5. Paths from Lucide (ISC licence).
 * One set across the whole interface: the current portal mixes line icons with
 * others inherited from PeopleSoft, and that mixture is part of what this fixes.
 */
import type { SVGProps } from 'react'

const paths = {
  home: ['M3 10.5 12 3l9 7.5', 'M5.5 9.5V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.5', 'M9.5 21v-6h5v6'],
  graduation: ['m12 3 10 5-10 5L2 8z', 'M6 11v4.5c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5V11', 'M22 8v6'],
  wallet: ['M3 7.5A1.5 1.5 0 0 1 4.5 6H19a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 18H4.5A1.5 1.5 0 0 1 3 16.5z', 'M3 10h18'],
  file: ['M14 3H7a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 7 21h10a1.5 1.5 0 0 0 1.5-1.5V7.5z', 'M14 3v4.5h4.5'],
  clipboard: ['M9 4.5H7.5A1.5 1.5 0 0 0 6 6v13.5A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H15', 'M9 3.5A1.5 1.5 0 0 1 10.5 2h3A1.5 1.5 0 0 1 15 3.5V5H9z'],
  search: ['M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z', 'm21 21-4.35-4.35'],
  chevronDown: ['m6 9 6 6 6-6'],
  arrowRight: ['M4 12h15', 'm13 6 6 6-6 6'],
  book: ['M4 4.5A1.5 1.5 0 0 1 5.5 3H11v17H5.5A1.5 1.5 0 0 1 4 18.5z', 'M20 4.5A1.5 1.5 0 0 0 18.5 3H13v17h5.5a1.5 1.5 0 0 0 1.5-1.5z'],
  calendar: ['M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5z', 'M8 3v4', 'M16 3v4', 'M4 10h16'],
  pin: ['M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z', 'M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'],
  check: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'm8.5 12 2.5 2.5 4.5-5'],
  award: ['M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z', 'm8.5 14-1.5 7 5-2.5 5 2.5-1.5-7'],
  clip: ['M20 11.5 12 19.5a5 5 0 0 1-7-7l8.5-8.5a3.4 3.4 0 0 1 4.8 4.8L9.7 17.4a1.8 1.8 0 0 1-2.5-2.5l7.8-7.8'],
  calendarCheck: ['M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5z', 'M8 3v4', 'M16 3v4', 'M4 10h16', 'm9.5 15 2 2 3.5-4'],
  history: ['M3 12a9 9 0 1 0 3-6.7', 'M3 4v4h4', 'M12 8v4.5l3 1.5'],
  bank: ['M3 10h18', 'm12 3 9 5H3z', 'M6 10v7', 'M10 10v7', 'M14 10v7', 'M18 10v7', 'M3 20h18'],
  languages: ['M4 6h9', 'M8.5 4v2c0 4-2 7-4.5 8.5', 'M7 10.5c1 2.5 3 4.5 5.5 5.5', 'm12.5 21 4-9 4 9', 'M14 18h5'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['M6 6l12 12', 'M18 6 6 18'],
  pinned: ['M9 3.5h6', 'M10 3.5v5.2L7.5 13h9L14 8.7V3.5', 'M12 13v7.5'],
  plus: ['M12 5v14', 'M5 12h14'],
} as const

export type IconName = keyof typeof paths

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
