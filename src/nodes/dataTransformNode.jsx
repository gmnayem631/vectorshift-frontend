// dataTransformNode.jsx
import { useState } from "react";
import BaseNode from "./BaseNode";

export const DataTransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(
    data?.transformType || "JSON to Text",
  );
  const [field, setField] = useState(data?.field || "");

  const fields = [
    {
      type: "select",
      label: "Transform Type",
      name: "transformType",
      value: transformType,
      onChange: (e) => setTransformType(e.target.value),
      options: [
        "JSON to Text",
        "Text to JSON",
        "Uppercase",
        "Lowercase",
        "Trim Whitespace",
      ],
    },
    {
      type: "text",
      label: "Target Field",
      name: "field",
      value: field,
      onChange: (e) => setField(e.target.value),
    },
  ];

  const handles = [
    {
      type: "target",
      position: "left",
      id: `${id}-input`,
    },
    {
      type: "source",
      position: "right",
      id: `${id}-output`,
    },
  ];

  return <BaseNode title="Data Transform" fields={fields} handles={handles} />;
};
