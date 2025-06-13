
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
				// Mid-Century Modern/Boho Color Palette
				'terracotta': 'hsl(var(--terracotta))',
				'burnt-orange': 'hsl(var(--burnt-orange))',
				'warm-brown': 'hsl(var(--warm-brown))',
				'sandy-beige': 'hsl(var(--sandy-beige))',
				'cream': 'hsl(var(--cream))',
				'sage-green': 'hsl(var(--sage-green))',
				'dusty-rose': 'hsl(var(--dusty-rose))',
				'golden-yellow': 'hsl(var(--golden-yellow))',
				'deep-teal': 'hsl(var(--deep-teal))',
				'mushroom': 'hsl(var(--mushroom))',
				'paprika': 'hsl(var(--paprika))',
				'caramel': 'hsl(var(--caramel))',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'organic': '20px 8px 20px 8px',
			},
			fontFamily: {
				'display': ['Crimson Text', 'serif'],
				'body': ['Space Grotesk', 'sans-serif'],
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
				'warm-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 0 2px hsl(var(--burnt-orange)), 0 0 20px hsl(var(--terracotta) / 0.3)'
					},
					'50%': { 
						boxShadow: '0 0 0 2px hsl(var(--terracotta)), 0 0 30px hsl(var(--burnt-orange) / 0.4)'
					}
				},
				'gentle-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-6px)' }
				},
				'subtle-shake': {
					'0%, 100%': { transform: 'translateX(0)' },
					'25%': { transform: 'translateX(-1px)' },
					'75%': { transform: 'translateX(1px)' }
				},
				'organic-pulse': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.02)' },
					'100%': { transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'warm-glow': 'warm-glow 0.3s ease-in-out',
				'gentle-bounce': 'gentle-bounce 0.6s ease-in-out infinite',
				'subtle-shake': 'subtle-shake 0.2s ease-in-out',
				'organic-pulse': 'organic-pulse 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
