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
            test: /fs/,
            use: "null-loader",
          },
        ],
      },
    },
  },
};
