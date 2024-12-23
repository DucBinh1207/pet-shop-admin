import { ComponentProps, forwardRef } from "react";
import Input from "../../../components/common/input";

type LoginInputProps = ComponentProps<"input"> & {
  error?: string;
  inputSize?: "large" | "medium" | "small";
  variant?: "primary" | "secondary" | "third";
};

const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(
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
LoginInput.displayName = "LoginInput";
export default LoginInput;
