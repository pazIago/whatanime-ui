import { globalCss } from "@whatanime/design-system";

export const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
    padding: 0,
    margin: 0,
  },
  body: {
    backgroundColor: "$gray900",
    color: "$gray50",
    fontFamily: "$default",
    "-webkit-font-smoothing": "antialiased",
    overflowX: "hidden",
  },
  button: {
    transition: "all 0.2s ease-in",
  },
});