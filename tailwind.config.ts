import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'theme-light/50': 'rgb(229 229 229 / 0.5)',
        'nav-dropdown': 'rgb(254 96 25 / 0.05)',
        'theme-light': 'rgb(229 229 229 / 1)',
        'btn-featured-post': '#E1FAF8',
        chat: '#FAFAFA',
        postbanner: "#F9F9FF"
      },
      backgroundImage: {
        'equipo': "url('/images/nosotros/equipo.png')"
      },
      backgroundSize: {
        '1-5': '1.5rem 1.5rem',
      },
      colors: {
        primary: "#092C4C",
        secondary: "#01816E",
        terciary: "#DBE64C",
        lightgreen: "#75C568",
        gray5: "#F6F8ED",
        gray2: "#333333",
        gray3: "#9696B3",
        gray4: "#F3F4F5",
        button3: "#BDBDBD",
        button2: "#1A9C51",
        button: "#10439C",
        whatsapp: '#0df053',
        start: '#d4ecef',
        end: '#00a5be',
        web: "#FBFBFF",
        banner1: "#0A232C",
        banner2: "#D3A23A",
        texto: "#0B1B77",
        concepto: "#43436A",
        sidebarback: "#3737529C",
        balotario:"#AAAAB9",
        timeexpired:"#2F80ED",
        borderProgreso: "#008b8b",
      },
      fontFamily: {
        poppins: ["Roboto", "sans-serif"],
        primaSans: ["sans-serif"],
      },
      borderColor: {
        'primary/50': "rgb(254 96 25 / 0.5)"
      },
      fontWeight: {
        boldCustomer: '400',
      },
      padding: {
        a: "19.2px 34.4px 40px 34px",
      },
      boxShadow: {
        // x y opacidad tamaño de profundidad color, borde-> x y opacidad tamaño color
        shadowPilares: "-5px 20px 25px 10px rgb(223 36 36 / 0.1), 0 4px 6px -4px rgb(223 36 36 / 0.1)",
      },
      animation: {
        'animate-spin': 'spin 4s linear infinite',
        'animate-spin-reverse': 'spin-reverse 6s linear infinite',
      },
      keyframes: {
        "spin-reverse": {
          'to': { transform: 'rotate(-1turn)' },
        }
      },
      lineHeight: {
        '1': '1',
      },
    },
    screens: {
      "xxs": "280px",
      "xs": "320px",
      "ss": "480px",
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "x": "1216px",
      "xl": "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide') // npm install tailwind-scrollbar-hide
  ],
}
export default config
