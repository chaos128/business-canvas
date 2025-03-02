import { Button, ButtonProps } from "antd";
import { PropsWithChildren } from "react";

function ConditionalButton({
  className,
  disabled,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <Button
      {...props}
      disabled={disabled}
      className={`${className} ${
        disabled
          ? ""
          : `!text-white
       !bg-primary !border-primary
       hover:!bg-primary-hover hover:!border-primary-hover
      active:!bg-primary-active active:!border-primary-active`
      }
      `}
    >
      {children}
    </Button>
  );
}

export default ConditionalButton;
