import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,md,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,md,mdx}',
    './mdx-components.tsx',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // typography: () => ({
      //   DEFAULT: {
      //     css: {
      //       pre: {
      //         paddingTop: 0,
      //         paddingInlineEnd: 0,
      //         paddingBottom: 0,
      //         paddingInlineStart: 0,
      //       },
      //     },
      //   },
      //   xl: {
      //     css: {
      //       pre: {
      //         paddingTop: 0,
      //         paddingInlineEnd: 0,
      //         paddingBottom: 0,
      //         paddingInlineStart: 0,
      //       },
      //     },
      //   },
      // }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
export default config
