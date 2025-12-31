/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0d9488', // Teal 600 - Calming & Focus
                primaryLight: '#ccfbf1', // Teal 100
                secondary: '#f97316', // Orange 500 - Warmth & Energy
                dark: '#111827', // Gray 900
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
