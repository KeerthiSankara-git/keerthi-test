import { useEffect, useState } from "react";

const FLAG_URL = "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/616d69"; // replace with your URL

export default function App() {
  const [loading, setLoading] = useState(true);
  const [shownChars, setShownChars] = useState([]);
  const [error, setError] = useState("");
  

  useEffect(() => {
  let cancelled = false;
  let timers = [];

  const fetchFlag = async () => {
    const res = await fetch(`${FLAG_URL}?t=${Date.now()}`, { cache: "no-store" });
    const flag = (await res.text()).trim();
    printChar(flag);
  };

  const printChar = (flag) => {
    setLoading(false);
    for (let i = 0; i < flag.length; i++) {
      const id = setTimeout(() => {
        if (!cancelled) {
          setShownChars((prev) => [...prev, flag[i]]);
        }
      }, i * 500);
      timers.push(id);
    }
  };

  fetchFlag();

  return () => {
    cancelled = true;
    timers.forEach(clearTimeout);
  };
}, []);



  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ul>
      {shownChars?.map((ch, idx) => (
        <li key={idx}>{ch}</li>
      ))}
    </ul>
  );
}

// script to extract Flag from the url
//--------------------------------------------
// import fetch from "node-fetch";
// import { JSDOM } from "jsdom";

// const url = "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge";

// const html = await (await fetch(url)).text();
// const dom = new JSDOM(html);
// const doc = dom.window.document;

// let chars = [];
// doc.querySelectorAll('section[data-id^="92"]')
//     .forEach(section => {
//         const article = section.querySelector('article[data-class$="45"]');
//         if (!article) return;
//         const div = article.querySelector('div[data-tag*="78"]');
//         if (!div) return;
//         const bTag = div.querySelector('b.ref[value]');
//         if (bTag) chars.push(bTag.getAttribute('value'));
//     });

// console.log(chars.join(""));