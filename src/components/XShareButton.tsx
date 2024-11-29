"use client";

import { useEffect } from "react";

type XShareButtonProps = {
  text: string;
};

export const XShareButton = ({ text }: XShareButtonProps) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.x.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <a
      href={`https://twitter.com/share?ref_src=twsrc%5Etfw&text=${encodeURIComponent(
        text
      )}`}
      className="twitter-share-button"
      data-show-count="false"
    >
      Post
    </a>
  );
};
