/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [//Caution with the optimization, this not is recomended
    //bg button status => maintenance (ObservationSection.tsx)
    'bg-green-400', 'bg-green-600',
    'bg-yellow-400', 'bg-yellow-600',
    'bg-red-400', 'bg-red-600',
    //ring button status => maintenance (ObservationSection.tsx)
    'focus:ring-green-500',
    'focus:ring-yellow-500',
    'focus:ring-red-500',
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },

      /*--------------------------------------------------tools--------------------------------------------------*/
      // Permite a Tailwind generar las clases de utilidad para las fuentes,
      // ayuda a integrar las fuentes con el sistema de Tailwind, permitiendo su uso en variantes.
      // asegura que estas clases estén disponibles en toda la aplicación sin definirlas manualmente en CSS.
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'roboto-slab': ['Roboto Slab', 'serif']
      },

      //animations (disable)
      // animation: {
      //   'gradient-shift': 'gradient-shift 15s ease infinite',
      // },
      // keyframes: {
      //   'gradient-shift': {
      //     '0%, 100%': { backgroundPosition: '0% 50%' },
      //     '50%': { backgroundPosition: '100% 50%' },
      //   },
      // },
      // gradient: {
      //   'middle1': '#faf5ff', // purple-50
      //   'middle2': '#f3e8ff', // purple-100
      //   'middle3': '#e9d5ff', // purple-200
      // },
    }
  },
  plugins: [require("tailwindcss-animate")],
}