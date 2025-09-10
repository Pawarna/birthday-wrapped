/** @type {import('tailwindcss').Config} */
export default {
  // Beri tahu Tailwind file mana saja yang akan menggunakan class utility-nya
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts}", // Mencakup semua file Svelte dan JS/TS di dalam folder src
  ],
  theme: {
    extend: {
      fontFamily: {
        // Menambahkan font 'Inter' sebagai pilihan utama
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
