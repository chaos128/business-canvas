"use client";

import ConditionalButton from "@/ui/conditonal-button";
import { PlusOutlined } from "@ant-design/icons";

function RecordAddButton({
  className = "",
  disabled = false,
}: {
  className?: string;
  disabled?: boolean;
}) {
  return (
    <ConditionalButton
      icon={<PlusOutlined />}
      disabled={disabled}
      className={className}
    >
      추가
    </ConditionalButton>
  );
}

export default RecordAddButton;
