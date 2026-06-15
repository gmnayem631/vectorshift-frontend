// llmNode.js

import BaseNode from "./BaseNode";

export const LLMNode = ({ id, data }) => {
  // fields and handles array to send to BaseNode as props
  const fields = [
    {
      type: "static",
      label: "",
      name: "description",
      value: "Processes your prompt using a large language model.",
    },
  ];

  const handles = [
    {
      type: "target",
      position: "left",
      id: `${id}-system`,
      style: { top: "33%" },
    },
    {
      type: "target",
      position: "left",
      id: `${id}-prompt`,
      style: { top: "66%" },
    },
    {
      type: "source",
      position: "right",
      id: `${id}-response`,
    },
  ];

  return <BaseNode title="LLM" fields={fields} handles={handles} />;
};
