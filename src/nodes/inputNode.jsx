// inputNode.js

import { useState } from "react";
import BaseNode from "./BaseNode";

export const InputNode = ({ id, data }) => {
  // states for this component
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  // handlers for this component
  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  // fields and handles array to send to BaseNode as props
  const fields = [
    {
      type: "text",
      label: "Name",
      name: "inputName",
      value: currName,
      onChange: handleNameChange,
    },
    {
      type: "select",
      label: "Type",
      name: "inputType",
      value: inputType,
      onChange: handleTypeChange,
      options: ["Text", "File"],
    },
  ];

  const handles = [
    {
      type: "source",
      position: "right",
      id: `${id}-value`,
    },
  ];

  return <BaseNode title="Input" fields={fields} handles={handles} />;
};
