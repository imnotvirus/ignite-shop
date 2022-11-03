import Link from "next/link";
import { styled } from "..";

export const HomeContainer = styled("main", {
  display: "flex",
  width: "100%",
  marginLeft: "auto",
  // maxWidth: "calc(100vw - ((100vw - 1180px) /2 ))",
  minHeight: 656,
});

export const Product = styled(Link, {
  background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
  borderRadius: 8,
  //padding: "0.25rem",
  cursor: "pointer",
  position: "relative",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  figure: {
    maxWidth: "50%",
    width: "100%",
    height: "76%",
    overflow: " hidden",
    /* border: none; */
    position: "relative",
    img: {
      objectFit: "cover",
    },
  },
  footer: {
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    padding: "2rem",

    borderRadius: 6,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "rgba(0,0,0,0.6)",

    transform: "translateY(110%)",
    opacity: 0,
    transition: "all 0.2s ease-in-out",

    strong: {
      fontSize: "$lg",
      color: "$gray100",
    },
    span: {
      fontSize: "$xl",
      fontWeight: "bold",
      color: "$green300",
    },
  },
  "&:hover": {
    footer: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },

  "@mobile": {
    figure: {
      maxWidth: "100%",
    },
    footer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
      gap: "1rem",
    },
  },
  variants: {
    showing: {
      true: {
        footer: {
          opacity: 1,
          transform: "translateY(0)",
        },
      },
    },
  },
});

export const Navigator = styled("button", {
  position: "absolute",
  cursor: "pointer",
  zIndex: 9999,
  height: "100%",
  width: "24%",
  border: "none",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  variants: {
    orientation: {
      left: {
        left: 0,
        background:
          "linear-gradient(270deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)",
      },
      right: {
        right: 0,
        background:
          "linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)",
      },
    },
  },
});
