import localFont from "@next/font/local";

export const ClashDisplay = localFont({
  src: [
    {
      path: "./ClashDisplay-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./ClashDisplay-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./ClashDisplay-Semibold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const JetBrains = localFont({
  src: [
    {
      path: "./JetBrainsMono-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./JetBrainsMono-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./JetBrainsMono-Regular.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});
