"use client";

import FormItem from "@/ui/form-item";
import { CloseOutlined } from "@ant-design/icons";
import type { FormInstance, FormProps } from "antd";
import { Button, Form, Modal } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { JobType, recordFields } from "./record.constant";
import {
  IRecordData,
  TRecordDataIndex,
  useRecordDataStore,
} from "./useRecordDataStore";

function RecordModal({
  isModalOpen,
  recordData,
  onClose: handleClose,
}: {
  recordData?: IRecordData;
  isModalOpen: boolean;
  onClose: () => void;
}) {
  const [form] = Form.useForm();

  const addRecord = useRecordDataStore((state) => state.addRecord);
  const editRecord = useRecordDataStore((state) => state.editRecord);

  const handleCloseAndReset = () => {
    handleClose();
    form.resetFields();
  };

  const onFinish: FormProps<IRecordData>["onFinish"] = (values) => {
    const newRecord = {
      ...values,
      createdAt: (values.createdAt as unknown as Dayjs).toDate(),
    };

    if (recordData) {
      editRecord({ ...newRecord, key: recordData.key });
    } else {
      addRecord(newRecord);
    }

    handleCloseAndReset();
  };

  const onFinishFailed: FormProps<IRecordData>["onFinishFailed"] = (
    errorInfo
  ) => {
    alert(errorInfo);
  };

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue(
        recordData
          ? { ...recordData, createdAt: dayjs(recordData.createdAt) }
          : { job: "개발자", isContentedToReceiveEmail: false }
      );
    }
  }, [isModalOpen, form, recordData]);

  return (
    <Modal
      rootClassName="record-modal"
      title={
        <div className="flex items-center justify-between  px-[1.6rem] py-[1.2rem] border-b-[1px] border-b-border-secondary">
          <h1 className=" text-base ">회원 추가</h1>
          <Button
            className="!w-[2.2rem] !h-[2.2rem] "
            onClick={handleCloseAndReset}
            type="text"
            icon={<CloseOutlined className="!text-[#000000]/45" />}
          />
        </div>
      }
      open={isModalOpen}
      closeIcon={null}
      onCancel={handleCloseAndReset}
      footer={null}
    >
      <Form<IRecordData>
        form={form}
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="py-[1.8rem] px-[2.4rem]">
          {recordFields.map((recordField) => {
            return (
              <FormItem<TRecordDataIndex, JobType>
                key={recordField.dataIndex}
                recordField={recordField}
              />
            );
          })}
        </div>
        <div className="py-[1.2rem] px-[1.6rem] items-center flex-row-reverse flex gap-x-[0.8rem] bg-[#000000]/[2%] border-t-[1px] border-t-[#000000]/[6%]">
          <SubmitButton form={form} fieldList={["name", "createdAt"]}>
            {recordData ? "수정" : "추가"}
          </SubmitButton>
          <Button onClick={handleCloseAndReset}>취소</Button>
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

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields(fieldList, { validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values, fieldList]);

  return (
    <Button htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};
