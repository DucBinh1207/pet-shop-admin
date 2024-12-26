"use client";

import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

type FormValues = {
  groups: {
    selectValue: string;
    text1: string;
    text2: string;
    text3: string;
  }[];
};

const Page = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      groups: [
        { selectValue: "", text1: "", text2: "", text3: "" }, // Nhóm mặc định
      ],
    },
  });

  // Sử dụng useFieldArray để quản lý danh sách nhóm input
  const { fields, append, remove } = useFieldArray({
    control,
    name: "groups",
  });

  // Xử lý submit
  const onSubmit = (data: FormValues) => {
    console.log(data); // In dữ liệu form
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Dynamic Groups with Select and Text Inputs</h1>

      {fields.map((field, index) => (
        <div key={field.id} style={{ marginBottom: "20px" }}>
          {/* Input Select */}
          <Controller
            name={`groups.${index}.selectValue` as const}
            control={control}
            render={({ field }) => (
              <select {...field} style={{ marginRight: "10px" }}>
                <option value="">Select an option</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
              </select>
            )}
          />

          {/* Input Text 1 */}
          <Controller
            name={`groups.${index}.text1` as const}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Text 1"
                style={{ marginRight: "10px" }}
              />
            )}
          />

          {/* Input Text 2 */}
          <Controller
            name={`groups.${index}.text2` as const}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Text 2"
                style={{ marginRight: "10px" }}
              />
            )}
          />

          {/* Input Text 3 */}
          <Controller
            name={`groups.${index}.text3` as const}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Text 3"
                style={{ marginRight: "10px" }}
              />
            )}
          />

          {/* Nút xóa nhóm */}
          <button type="button" onClick={() => remove(index)}>
            Remove Group
          </button>
        </div>
      ))}

      {/* Nút thêm nhóm */}
      <button
        type="button"
        onClick={() =>
          append({ selectValue: "", text1: "", text2: "", text3: "" })
        }
        style={{ marginTop: "10px", marginRight: "10px" }}
      >
        Add Group
      </button>

      {/* Nút submit */}
      <button type="submit" style={{ marginTop: "10px" }}>
        Submit
      </button>
    </form>
  );
};

export default Page;
