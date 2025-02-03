module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'teal-custom': '#006a6a',
        'teal-light': '#00b9b9', // Variación más clara
        'teal-dark': '#004f4f', // Variación más oscura
      },
      borderRadius: {
        'xl': '1rem', // Tamaño adicional para bordes redondeados
      },
      boxShadow: {
        'custom': '0 4px 10px rgba(0, 0, 0, 0.25)', // Sombra personalizada
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
