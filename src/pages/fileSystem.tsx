export const initialFileSystem = {
  home: {
    type: "FOLDER",
    children: {
      user: {
        type: "FOLDER",
        children: {
          test: {
            type: "FOLDER",
            children: null,
          },
        },
      },
      videos: {
        type: "FOLDER",
        children: {
          file2: {
            type: "FILE",
            content: "Contents of file 2",
            extension: "txt",
          },
        },
      },
      github: {
        type: "FILE",
        content: "githubImg",
        extension: "png",
      },
    },
  },
};
