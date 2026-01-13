import { useState } from "react";

type BrainDumpFormData = {
  url: string;
  title: string;
  category: string;
  type: string;
  notes: string;
  addedBy: string;
};

const colors = {
    deepForest: '#1a3d2e',
    darkGreen: '#2d5942',
    mediumGreen: '#4a7c59',
    mysticalGlow: '#6dd5a8',
    darkBg: '#0f1e16'
  };

export const AddBrainDumpForm = ({
  onSubmit,
}: {
  onSubmit: (data: BrainDumpFormData) => void;
}) => {
  const [form, setForm] = useState<BrainDumpFormData>({
    url: "",
    title: "",
    category: "",
    type: "",
    notes: "",
    addedBy: "",
  });

  return (
    <>
      <h3 style={{ fontSize: "20px", marginBottom: "16px" }}>
        Add to Brain Dump
      </h3>

      {[
        ["url", "Link *"],
        ["title", "Title"],
        ["category", "Category"],
        ["type", "Type"],
        ["notes", "Notes"],
        ["addedBy", "Added by"],
      ].map(([key, label]) => (
        <input
          key={key}
          placeholder={label}
          value={form[key as keyof BrainDumpFormData]}
          onChange={(e) =>
            setForm({ ...form, [key as keyof BrainDumpFormData]: e.target.value })
          }
          required={key === "url"}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px 12px",
            borderRadius: "6px",
            border: `1px solid rgba(255,255,255,0.2)`,
            background: "transparent",
            color: "white",
            fontSize: "14px",
          }}
        />
      ))}

      <button
        onClick={() => onSubmit(form)}
        style={{
          marginTop: "12px",
          width: "100%",
          padding: "12px",
          borderRadius: "6px",
          background: colors.mysticalGlow,
          color: colors.darkBg,
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
        }}
      >
        Send it 🌌
      </button>
    </>
  );
};
