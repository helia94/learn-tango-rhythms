
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			gridTemplateColumns: {
				'8': 'repeat(8, minmax(0, 1fr))',
				'16': 'repeat(16, minmax(0, 1fr))',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Berlin Pixelated Colors
				'berlin-pink': 'hsl(var(--berlin-pink))',
				'berlin-cyan': 'hsl(var(--berlin-cyan))',
				'berlin-lime': 'hsl(var(--berlin-lime))',
				'berlin-orange': 'hsl(var(--berlin-orange))',
				'berlin-purple': 'hsl(var(--berlin-purple))',
				'berlin-yellow': 'hsl(var(--berlin-yellow))',
				'berlin-red': 'hsl(var(--berlin-red))',
				'berlin-green': 'hsl(var(--berlin-green))',
				'berlin-blue': 'hsl(var(--berlin-blue))',
				'berlin-magenta': 'hsl(var(--berlin-magenta))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'pixel': '0px',
			},
			fontFamily: {
				'pixel': ['Press Start 2P', 'monospace'],
				'orbitron': ['Orbitron', 'monospace'],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pixel-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 0 2px hsl(var(--berlin-pink)), 0 0 0 4px hsl(var(--berlin-cyan)), 0 0 20px hsl(var(--berlin-pink))'
					},
					'50%': { 
						boxShadow: '0 0 0 2px hsl(var(--berlin-cyan)), 0 0 0 4px hsl(var(--berlin-pink)), 0 0 30px hsl(var(--berlin-cyan))'
					}
				},
				'pixel-bounce': {
					'0%, 100%': { transform: 'translateY(0) scale(1)' },
					'50%': { transform: 'translateY(-8px) scale(1.05)' }
				},
				'berlin-pulse': {
					'0%': { backgroundColor: 'hsl(var(--berlin-pink))' },
					'20%': { backgroundColor: 'hsl(var(--berlin-cyan))' },
					'40%': { backgroundColor: 'hsl(var(--berlin-lime))' },
					'60%': { backgroundColor: 'hsl(var(--berlin-orange))' },
					'80%': { backgroundColor: 'hsl(var(--berlin-purple))' },
					'100%': { backgroundColor: 'hsl(var(--berlin-pink))' }
				},
				'pixel-shake': {
					'0%, 100%': { transform: 'translateX(0)' },
					'25%': { transform: 'translateX(-2px)' },
					'75%': { transform: 'translateX(2px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pixel-glow': 'pixel-glow 0.5s ease-in-out',
				'pixel-bounce': 'pixel-bounce 0.5s ease-in-out infinite',
				'berlin-pulse': 'berlin-pulse 1s infinite',
				'pixel-shake': 'pixel-shake 0.2s ease-in-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
