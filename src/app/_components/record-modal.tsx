"use client";

import ConditionalButton from "@/ui/conditonal-button";
import FormItem from "@/ui/form-item";
import { CloseOutlined } from "@ant-design/icons";
import type { FormInstance, FormProps } from "antd";
import { Button, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { recordFields } from "./data";
import { RecordDataType } from "./useRecordData";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

function RecordModal({
  isModalOpen,
  recordData,
  onCancel: handleCancel,
  onOk: handleOk,
}: {
  recordData?: RecordDataType;
  isModalOpen: boolean;
  onCancel: () => void;
  onOk: () => void;
}) {
  const { register, handleSubmit } = useForm<RecordDataType>();
  const onSubmit: SubmitHandler<RecordDataType> = (data) => console.log(data);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };
  const [form] = Form.useForm();

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      rootClassName="record-modal"
      title={
        <div className="flex items-center justify-between  px-[1.6rem] py-[1.2rem] border-b-[1px] border-b-border-secondary">
          <h1 className=" text-base ">회원 추가</h1>
          <Button
            className="!w-[2.2rem] !h-[2.2rem]"
            onClick={handleCancel}
            type="text"
            icon={<CloseOutlined className="text-tertiary" />}
          />
        </div>
      }
      open={isModalOpen}
      onOk={() => {
        handleOk();
      }}
      closeIcon={null}
      onCancel={handleCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="py-[1.8rem] px-[2.4rem]">
          {recordFields.map(({ type, label, dataIndex, required }) => {
            return (
              <FormItem
                key={dataIndex}
                required={required}
                type={type}
                label={label}
                name={dataIndex}
              />
            );
          })}
        </div>
        <div className="py-[1.2rem] px-[1.6rem] items-center flex-row-reverse flex gap-x-[0.8rem] bg-[#000000]/[2%] border-t-[1px] border-t-[#000000]/[6%]">
          <SubmitButton form={form} fieldList={["name"]}>
            추가
          </SubmitButton>
          <Button>취소</Button>
        </div>
      </Form>
    </Modal>
  );
}

export default RecordModal;

const SubmitButton: React.FC<
  React.PropsWithChildren<{ form: FormInstance; fieldList: string[] }>
> = ({ form, children, fieldList }) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch(fieldList, form);

  useEffect(() => {
    form
      .validateFields(fieldList, { validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values, fieldList]);

  return (
    <ConditionalButton htmlType="submit" disabled={!submittable}>
      {children}
    </ConditionalButton>
  );
};
