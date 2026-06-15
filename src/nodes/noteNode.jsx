// noteNode.jsx

import { useState } from "react";
import BaseNode from "./BaseNode";

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || "");

  const fields = [
    {
      type: "textarea",
      label: "Note",
      name: "note",
      value: note,
      onChange: (e) => setNote(e.target.value),
    },
  ];

  // notes need no handles
  const handles = [];

  return <BaseNode title="Note" fields={fields} handles={handles} />;
};
