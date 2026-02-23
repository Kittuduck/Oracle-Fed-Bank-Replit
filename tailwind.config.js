/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./**/*.{js,ts,jsx,tsx}" // Includes components, App.tsx, etc if outside src
    ],
    theme: {
        extend: {
            colors: {
                federalblue: {
                    50: 'var(--federalblue-50)',
                    100: 'var(--federalblue-100)',
                    200: 'var(--federalblue-200)',
                    300: 'var(--federalblue-300)',
                    400: 'var(--federalblue-400)',
                    500: 'var(--federalblue-500)',
                    600: 'var(--federalblue-600)',
                    700: 'var(--federalblue-700)',
                    800: 'var(--federalblue-800)',
                    900: 'var(--federalblue-900)',
                },
                federalgold: {
                    50: 'var(--federalgold-50)',
                    100: 'var(--federalgold-100)',
                    200: 'var(--federalgold-200)',
                    300: 'var(--federalgold-300)',
                    400: 'var(--federalgold-400)',
                    500: 'var(--federalgold-500)',
                    600: 'var(--federalgold-600)',
                    700: 'var(--federalgold-700)',
                    800: 'var(--federalgold-800)',
                    900: 'var(--federalgold-900)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'Public Sans', 'sans-serif'],
            },
            boxShadow: {
                'federal': '0 1px 3px rgba(0,0,0,0.1)',
            }
        },
    },
    plugins: [],
}
