/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary:"hsl(253.1, 80.56%, 57.65%)",
        secondry:{
          100:"hsl(0, 0%, 50%)",
          300:"hsl(0, 0%, 40%)",
          600:"hsl(0, 0%, 30%)",
          700:"hsl(0, 0%, 25%)",
          800:"hsl(0, 0%, 20%)",
          1000:"hsl(0, 0%, 10%)",
        },
        danger:{
          100:"hsl(360 ,100%, 90%)",
          300:"hsl(360 ,100%,70%)",
          400:"hsl(360 ,100%, 60%)",
          500:"hsl(360 ,100%, 50%)",
          600:"hsl(360 ,100%, 40%)",
          700:"hsl(360 ,100%, 30%)",
          800:"hsl(360 ,100%, 20%)",
          900:"hsl(360 ,100%, 10%)",
        }

      }
    },
  },
  plugins: [],
}