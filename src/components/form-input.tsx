import { ComponentProps, forwardRef } from "react";
import Input from "./common/input";

type FormInputProps = ComponentProps<"input"> & {
  label: string;
  error?: string;
  inputSize?: "large" | "medium" | "small";
  variant?: "primary" | "secondary" | "third";
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error,id, inputSize, variant, ...rest }, ref) => {
    return (
      <>
        <label
          className="mb-3 block text-sm font-medium text-black dark:text-white"
          htmlFor={id}
        >
          {label}
        </label>
        <Input ref={ref} {...rest} inputSize={inputSize} variant={variant} />
        {error && (
          <span className="ml-[5px] mt-[5px] text-[13px] leading-[18px] text-red-500">
            {error}
          </span>
        )}
      </>
    );
  },
);
FormInput.displayName = "FormInput";
export default FormInput;
