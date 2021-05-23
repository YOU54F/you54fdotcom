module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    configure: {
      devtool: "eval-source-map",
      // entry: ["@babel/polyfill", "./src/index.tsx"],
      module: {
        rules: [
          {
            test: /\.md$/,
            use: "src/components/terminalFiles/blogs",
          },
        ],
      },
    },
  },
};
