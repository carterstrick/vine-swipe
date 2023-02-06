import React, { useEffect, useState } from "react";
import Head from "next/head";

const Meta = (props) => {
  const title = props.title ?? "Vine Swipe - Mad Realities";
  const description =
    props.description ??
    `We're making a "Where Are They Now" of old Vine stars. Tell us who you'd like to see.`;
  const image =
    props.image ??
    "https://uploads-ssl.webflow.com/622fc4f6b3844822387e06d6/63e193e21b378b4af3401b37_vineSwipeForGraph.png";
  const url = props.url ?? "https://vine-swipe.vercel.app";

  const [faviconHref, setFaviconHref] = useState("/favicon.ico");

  useEffect(() => {
    // Get current color scheme.
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    // Set favicon initially.
    setFaviconHref(getFaviconPath(matcher.matches));
    // Change favicon if the color scheme changes.
    matcher.onchange = () => setFaviconHref(getFaviconPath(matcher.matches));
  }, [faviconHref]);

  const getFaviconPath = (isDarkMode = false) => {
    return isDarkMode ? "/favicon-dark.ico" : "/favicon.ico";
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} key="title" />
        <meta name="og:title" content={title} key="og:title" />
        <meta property="og:site_name" content={title} />
        <meta name="description" content={description} key="description" />
        <meta
          name="og:description"
          content={description}
          key="og:description"
        />
        <meta property="og:url" content={url} key="url" />
        <meta property="og:image" content={image} key="image" />
        <meta
          property="twitter:card"
          content="summary_large_image"
          key="card"
        />
        <meta property="twitter:title" content={title} key="twitter:title" />
        <meta property="twitter:image" content={image} key="twitter:image" />
        <meta
          property="twitter:description"
          content={description}
          key="twitter:description"
        />
        <meta
          property="twitter:creator"
          content="@Carterstrick96"
          key="twitter:creator"
        />

        <link rel="icon" href={faviconHref} />
      </Head>
      {props.children}
    </>
  );
};

export default Meta;
