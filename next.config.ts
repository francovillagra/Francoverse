export default {
  // 1. Desactiva temporalmente las optimizaciones problemáticas
  experimental: {
    turbo: {
      resolveAlias: {
        "tailwindcss": require.resolve("tailwindcss"),
        "postcss": require.resolve("postcss")
      }
    },
    optimizeCss: false, // ¡Importante! Previene conflictos con Tailwind
  },

  // 2. Configuración del compilador (ajustada para React 19)
  compiler: {
    reactStrictMode: true,
    styledComponents: false, // Desactívalo si no usas esta librería
  },

  // 3. Forzar transpilación de Tailwind (solución a errores SSR)
  transpilePackages: ['tailwindcss'],
}