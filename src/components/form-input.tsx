import { ComponentProps, forwardRef } from "react";
import Input from "./common/input";

type FormInputProps = ComponentProps<"input"> & {
  error?: string;
  inputSize?: "large" | "medium" | "small";
  variant?: "primary" | "secondary" | "third";
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ error, inputSize, variant, ...rest }, ref) => {
    return (
      <>
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
