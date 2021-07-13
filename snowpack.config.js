module.exports = {
    mount: {
      public: { url: '/', static: true },
      src: { url: '/dist' },
    },
    extends: "@snowpack/app-scripts-react",
    alias: {
      functions: './src/functions',
      lessons: './src/lessons',
      pages: './src/pages',
    },
    routes: [
      {
        match: "routes", 
        src: ".*", 
        dest: "/index.html"
      },
    ],
    plugins: [
      "@snowpack/plugin-webpack",
      'snowpack-plugin-mdx'
    ],
    devOptions: {
      port: 3000,
      src: "src",
      bundle: true,
      open: 'firefox'
    },
    packageOptions: {
      rollup: {
        plugins: [
          require('@rollup/plugin-typescript')(),
        ],
      },
    },
  }