const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./index.html"
  ],
  theme: {
    extend: {
			transitionDuration: {
				DEFAULT: '300ms'
			},

			screens: {
				'xxs': '420px',
				'xs': '475px'
			},

			keyframes: {
				fadeSlideIn: {
					'0%': { transform: 'translateY(10px)', opacity: '0' },
					'100%': { transform: 'translateY(0px)', opacity: '1' }
				},
				fadeSlideOut: {
					'0%': { transform: 'translateY(0px)', opacity: '1' },
					'100%': { transform: 'translateY(10px)', opacity: '0' }
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				fadeOut: {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				}
			},

			animation: {
				'fadeSlideIn': 'fadeSlideIn forwards 0.5s',
				'fadeSlideOut': 'fadeSlideOut forwards 0.5s',
				'fadeIn': 'fadeIn forwards 0.5s',
				'fadeOut': 'fadeOut forwards 0.5s'
			},

			transitionTimingFunction: {
				"in-back": "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
				"out-back": "cubic-bezier(0.175,  0.885, 0.320, 1.625)",
				"in-out-back": "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
        DEFAULT: 'ease-out'
			},
      
      colors: {
        primary: colors.orange,
        secondary: colors.sky,
				tertiary: colors.fuchsia
      }
    },
  },
  plugins: [
		plugin(({ matchUtilities, theme }) => {
			matchUtilities({
				"animation-delay": (value) => {
					return { "animation-delay": value }
				}
			}, {
				values: theme('transitionDelay')
			});
		})
  ],
}

