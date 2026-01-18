//Long Txt

import { useState } from "react";

export function LongTxt({ text, maxLength = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleText = () => setIsExpanded(!isExpanded);

  if (text.length <= maxLength) return <p>{text}</p>;

  return (
    <p>
      {isExpanded ? text : text.substring(0, maxLength) + "..."}
      <button onClick={toggleText}>
        {isExpanded ? "קרא פחות" : "קרא עוד"}
      </button>
    </p>
  );
}
