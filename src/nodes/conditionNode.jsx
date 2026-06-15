// conditionNode.jsx
import { useState } from "react";
import BaseNode from "./BaseNode";

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || "");

  const fields = [
    {
      type: "text",
      label: "Condition",
      name: "condition",
      value: condition,
      onChange: (e) => setCondition(e.target.value),
    },
    {
      type: "static",
      label: "",
      name: "hint",
      value: "● True  ● False",
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
      id: `${id}-true`,
      style: { top: "33%" },
    },
    {
      type: "source",
      position: "right",
      id: `${id}-false`,
      style: { top: "66%" },
    },
  ];

  return <BaseNode title="Condition" fields={fields} handles={handles} />;
};
