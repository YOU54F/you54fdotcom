module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    configure: {
      devtool: "eval-source-map",
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
