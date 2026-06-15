// fileUploadNode.jsx
import { useState } from "react";
import BaseNode from "./BaseNode";

export const FileUploadNode = ({ id, data }) => {
  const [fileType, setFileType] = useState(data?.fileType || "Any");
  const [fileName, setFileName] = useState(data?.fileName || "");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const fields = [
    {
      type: "select",
      label: "Accepted File Type",
      name: "fileType",
      value: fileType,
      onChange: (e) => setFileType(e.target.value),
      options: ["Any", "PDF", "CSV", "Image", "JSON"],
    },
    {
      type: "static",
      label: "Selected File",
      name: "fileName",
      value: fileName || "No file selected",
    },
    {
      type: "fileupload",
      label: "Upload",
      name: "fileupload",
      onChange: handleFileChange,
    },
  ];

  const handles = [
    {
      type: "source",
      position: "right",
      id: `${id}-file`,
    },
  ];

  return <BaseNode title="File Upload" fields={fields} handles={handles} />;
};
