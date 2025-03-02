"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

function RecordAddButton({
  className = "",
  disabled = false,
}: {
  className?: string;
  disabled?: boolean;
}) {
  return (
    <Button
      icon={<PlusOutlined />}
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
      추가
    </Button>
  );
}

export default RecordAddButton;
