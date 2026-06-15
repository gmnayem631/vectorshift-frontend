// outputNode.js

import { useState } from "react";
import BaseNode from "./BaseNode";

export const OutputNode = ({ id, data }) => {
  // states for this component
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_"),
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  // handlers for this component
  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  // fields and handles array to send to BaseNode as props
  const fields = [
    {
      type: "text",
      label: "Name",
      name: "outputName",
      value: currName,
      onChange: handleNameChange,
    },
    {
      type: "select",
      label: "Type",
      name: "outputType",
      value: outputType,
      onChange: handleTypeChange,
      options: ["Text", "Image"],
    },
  ];

  const handles = [
    {
      type: "target", // target receives data
      position: "left",
      id: `${id}-value`,
    },
  ];

  return <BaseNode title="Output" fields={fields} handles={handles} />;
};
