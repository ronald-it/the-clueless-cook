"use client";

import { useEffect } from "react";
import FontFaceObserver from "fontfaceobserver";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const fonts = [
  {
    name: "Austein",
    url: `${basePath}/fonts/Austein.ttf`,
    weight: "400",
    style: "normal",
  },
  {
    name: "Poppins",
    url: `${basePath}/fonts/Poppins-Light.ttf`,
    weight: "300",
    style: "normal",
  },
  {
    name: "Poppins",
    url: `${basePath}/fonts/Poppins-LightItalic.ttf`,
    weight: "300",
    style: "italic",
  },
  {
    name: "Poppins",
    url: `${basePath}/fonts/Poppins-Regular.ttf`,
    weight: "400",
    style: "normal",
  },
  {
    name: "Poppins",
    url: `${basePath}/fonts/Poppins-Italic.ttf`,
    weight: "400",
    style: "italic",
  },
  {
    name: "Poppins",
    url: `${basePath}/fonts/Poppins-Medium.ttf`,
    weight: "500",
    style: "normal",
  },
  {
    name: "Poppins",
    url: `${basePath}/fonts/Poppins-MediumItalic.ttf`,
    weight: "500",
    style: "italic",
  },
  {
    name: "Poppins",
    url: `${basePath}/fonts/Poppins-SemiBold.ttf`,
    weight: "600",
    style: "normal",
  },
  {
    name: "Poppins",
    url: `${basePath}/fonts/Poppins-SemiBoldItalic.ttf`,
    weight: "600",
    style: "italic",
  },
  {
    name: "Poppins",
    url: `${basePath}/fonts/Poppins-Bold.ttf`,
    weight: "700",
    style: "normal",
  },
  {
    name: "Poppins",
    url: `${basePath}/fonts/Poppins-BoldItalic.ttf`,
    weight: "700",
    style: "italic",
  },
  {
    name: "Poppins",
    url: `${basePath}/fonts/Poppins-Black.ttf`,
    weight: "900",
    style: "normal",
  },
  {
    name: "Poppins",
    url: `${basePath}/fonts/Poppins-BlackItalic.ttf`,
    weight: "900",
    style: "italic",
  },
];

export default function FontLoader() {
  useEffect(() => {
    const loadFonts = async () => {
      try {
        const styles = fonts.map(({ name, url, weight, style }) => {
          const styleElement = document.createElement("style");
          styleElement.textContent = `
            @font-face {
              font-family: '${name}';
              src: url('${url}') format('truetype');
              font-weight: ${weight};
              font-style: ${style};
            }
          `;
          document.head.appendChild(styleElement);
          return styleElement;
        });

        await Promise.all(
          fonts.map(({ name, weight, style }) =>
            new FontFaceObserver(name, { weight, style }).load()
          )
        );

        document.body.style.fontFamily = `"Poppins", sans-serif`;

        return () => {
          styles.forEach((style) => document.head.removeChild(style));
        };
      } catch (error) {
        console.error("One or more fonts failed to load:", error);
      }
    };

    loadFonts();
  }, []);

  return null;
}
