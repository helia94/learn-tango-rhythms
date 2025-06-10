
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
				// Retro Berlin color palette
				'neon-pink': 'hsl(var(--neon-pink))',
				'electric-blue': 'hsl(var(--electric-blue))',
				'lime-green': 'hsl(var(--lime-green))',
				'sunshine-yellow': 'hsl(var(--sunshine-yellow))',
				'purple-haze': 'hsl(var(--purple-haze))',
				'orange-burst': 'hsl(var(--orange-burst))',
				'mint-fresh': 'hsl(var(--mint-fresh))',
				'techno-pink': 'hsl(var(--techno-pink))',
				'underground-purple': 'hsl(var(--underground-purple))',
				'strobe-cyan': 'hsl(var(--strobe-cyan))',
				'disco-gold': 'hsl(var(--disco-gold))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'retro': '1.5rem',
				'bubble': '2rem'
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
				'neon-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px hsl(var(--neon-pink)), 0 0 10px hsl(var(--neon-pink)), 0 0 15px hsl(var(--neon-pink))'
					},
					'50%': { 
						boxShadow: '0 0 10px hsl(var(--electric-blue)), 0 0 20px hsl(var(--electric-blue)), 0 0 30px hsl(var(--electric-blue))'
					}
				},
				'disco-rotate': {
					'0%': { transform: 'rotate(0deg) scale(1)' },
					'25%': { transform: 'rotate(90deg) scale(1.1)' },
					'50%': { transform: 'rotate(180deg) scale(1)' },
					'75%': { transform: 'rotate(270deg) scale(1.1)' },
					'100%': { transform: 'rotate(360deg) scale(1)' }
				},
				'pulse-rainbow': {
					'0%': { backgroundColor: 'hsl(var(--neon-pink))' },
					'16%': { backgroundColor: 'hsl(var(--electric-blue))' },
					'32%': { backgroundColor: 'hsl(var(--lime-green))' },
					'48%': { backgroundColor: 'hsl(var(--sunshine-yellow))' },
					'64%': { backgroundColor: 'hsl(var(--purple-haze))' },
					'80%': { backgroundColor: 'hsl(var(--orange-burst))' },
					'100%': { backgroundColor: 'hsl(var(--neon-pink))' }
				},
				'bounce-fun': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'50%': { transform: 'translateY(-20px) rotate(5deg)' }
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'neon-glow': 'neon-glow 1s infinite alternate',
				'disco-rotate': 'disco-rotate 4s infinite linear',
				'pulse-rainbow': 'pulse-rainbow 2s infinite',
				'bounce-fun': 'bounce-fun 2s ease-in-out infinite',
				'wiggle': 'wiggle 1s ease-in-out infinite'
			},
			backdropFilter: {
				'retro': 'blur(10px) saturate(150%) hue-rotate(30deg)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
