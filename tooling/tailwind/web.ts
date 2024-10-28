import type { Config } from "tailwindcss";
import TailwindAnimate from "tailwindcss-animate";
import Typography from "@tailwindcss/typography"

import base from "./base";

export default {
  content: base.content,
  presets: [base],
  theme: {
    extend: {
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: "100ch",
          },
        },
      }),
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    TailwindAnimate,
    Typography,
  ],
} satisfies Config;
