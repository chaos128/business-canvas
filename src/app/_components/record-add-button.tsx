"use client";

import ConditionalButton from "@/ui/conditonal-button";
import { PlusOutlined } from "@ant-design/icons";
import { ButtonProps } from "antd";

function RecordAddButton(props: ButtonProps) {
  return (
    <ConditionalButton {...props} icon={<PlusOutlined />}>
      추가
    </ConditionalButton>
  );
}

export default RecordAddButton;
