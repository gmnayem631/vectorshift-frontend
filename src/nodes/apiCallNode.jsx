// apiCallNode.jsx;
import { useState } from "react";
import BaseNode from "./BaseNode";

export const APICallNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || "https://api.example.com");
  const [method, setMethod] = useState(data?.method || "GET");

  const fields = [
    {
      type: "text",
      label: "URL",
      name: "url",
      value: url,
      onChange: (e) => setUrl(e.target.value),
    },
    {
      type: "select",
      label: "Method",
      name: "method",
      value: method,
      onChange: (e) => setMethod(e.target.value),
      options: ["GET", "POST", "PUT", "DELETE"],
    },
  ];

  const handles = [
    {
      type: "target",
      position: "left",
      id: `${id}-body`,
      style: { top: "33%" },
    },
    {
      type: "target",
      position: "left",
      id: `${id}-headers`,
      style: { top: "66%" },
    },
    {
      type: "source",
      position: "right",
      id: `${id}-response`,
    },
  ];

  return <BaseNode title="API Call" fields={fields} handles={handles} />;
};
