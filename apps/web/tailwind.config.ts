import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';
import animate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', 'class'],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#E6F7F0',
  				'100': '#B3E8D1',
  				'200': '#80D9B2',
  				'300': '#4DCA93',
  				'400': '#26BC7C',
  				'500': '#009E60',
  				'600': '#008A54',
  				'700': '#007548',
  				'800': '#00613C',
  				'900': '#004D30',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#FFF3E6',
  				'100': '#FFE0B3',
  				'200': '#FFCC80',
  				'300': '#FFB84D',
  				'400': '#FFA726',
  				'500': '#F77F00',
  				'600': '#E67300',
  				'700': '#CC6600',
  				'800': '#B35900',
  				'900': '#994D00',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			dark: {
  				'50': '#1A1A24',
  				'100': '#14141C',
  				'200': '#0F0F16',
  				'300': '#0A0A0F',
  				'400': '#050508',
  				DEFAULT: '#0A0A0F'
  			},
  			glass: {
  				light: 'rgba(255, 255, 255, 0.1)',
  				medium: 'rgba(255, 255, 255, 0.15)',
  				dark: 'rgba(0, 0, 0, 0.3)'
  			},
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
  		fontFamily: {
  			sans: [
  				'var(--font-outfit)',
  				'system-ui',
  				'sans-serif'
  			],
  			display: [
  				'var(--font-outfit)',
  				'system-ui',
  				'sans-serif'
  			],
  			body: [
  				'var(--font-outfit)',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'2xs': [
  				'0.625rem',
  				{
  					lineHeight: '0.75rem'
  				}
  			],
  			'7xl': [
  				'4.5rem',
  				{
  					lineHeight: '1.1'
  				}
  			],
  			'8xl': [
  				'6rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'9xl': [
  				'8rem',
  				{
  					lineHeight: '1'
  				}
  			]
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'mesh-gradient': 'linear-gradient(135deg, #009E60 0%, #0A0A0F 50%, #F77F00 100%)',
  			'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 158, 96, 0.3), transparent)'
  		},
  		boxShadow: {
  			'glow-sm': '0 0 15px rgba(0, 158, 96, 0.3)',
  			'glow-md': '0 0 30px rgba(0, 158, 96, 0.4)',
  			'glow-lg': '0 0 60px rgba(0, 158, 96, 0.5)',
  			'glow-orange': '0 0 30px rgba(247, 127, 0, 0.4)',
  			glass: '0 8px 32px 0 rgba(0, 0, 0, 0.36)'
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-out forwards',
  			'fade-up': 'fadeUp 0.6s ease-out forwards',
  			'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
  			'slide-in-right': 'slideInRight 0.5s ease-out forwards',
  			'scale-in': 'scaleIn 0.3s ease-out forwards',
  			float: 'float 6s ease-in-out infinite',
  			'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
  			'gradient-x': 'gradientX 15s ease infinite',
  			shimmer: 'shimmer 2s linear infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			fadeUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideInLeft: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(-30px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			slideInRight: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(30px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.95)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			pulseGlow: {
  				'0%, 100%': {
  					boxShadow: '0 0 20px rgba(0, 158, 96, 0.3)'
  				},
  				'50%': {
  					boxShadow: '0 0 40px rgba(0, 158, 96, 0.6)'
  				}
  			},
  			gradientX: {
  				'0%, 100%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				}
  			},
  			shimmer: {
  				'0%': {
  					backgroundPosition: '-200% 0'
  				},
  				'100%': {
  					backgroundPosition: '200% 0'
  				}
  			}
  		},
  		transitionTimingFunction: {
  			'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)'
  		},
  		borderRadius: {
  			'4xl': '2rem',
  			'5xl': '2.5rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    daisyui,
    animate
],
};

export default config;
