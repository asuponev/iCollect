export const themeSettings = (mode) => {
  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
          primary: {
            main: "#1E70EB",
          },
          background: {
            default: "#121F33",
            header: "#142339",
            card: "#192B45",
            tags: "#2F4059",
            footer: "#142339",
            tableheader: "#192B45",
            alt: "#495D7A"
          },
          hover: {
            tablerow: "#2F4059",
            tags: "#495D7A"
          },
          text: {
            main: "#FFFFFF",
            tags: "#7E97BB"
          },
          borders: {
            comment: "#192B45",
          }
        }
        : {
          primary: {
            main: "#1E70EB",
          },
          background: {
            default: "#FFFFFF",
            header: "#142339",
            card: "#FFFFFF",
            tags: "#EEEFF0",
            footer: "#F0F3F6",
            tableheader: "#FAFAFA",
            alt: "#F9F9F9"
          },
          hover: {
            tablerow: "#EEEFF0",
            tags: "#DEDFE1"
          },
          text: {
            main: "#142339",
            tags: "#797E85"
          },
          borders: {
            comment: "#DEDFE1",
          }
        }),
    }
  };
};