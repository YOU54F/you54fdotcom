import React, { useEffect } from "react";

export const Twitter = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", "https://platform.twitter.com/widgets.js");
    document.getElementsByClassName("twitterContainer")[0].appendChild(script);
  }, []);

  return (
    <section className="twitterContainer">
      <div>
        <a
          className="twitter-timeline"
          data-width="240"
          data-height="480"
          data-theme="dark"
          href="https://twitter.com/YOU54F?ref_src=twsrc%5Etfw"
          title="twitter"
        >
          twitter
        </a>
      </div>
      <div>
        <a
          href="https://twitter.com/intent/tweet?screen_name=YOU54F&ref_src=twsrc%5Etfw"
          className="twitter-mention-button"
          data-show-count="false"
        >
          Tweet to @YOU54F
        </a>
      </div>
    </section>
  );
};
