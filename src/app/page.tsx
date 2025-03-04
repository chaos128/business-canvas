"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import RecordModal from "./_components/record-modal";
import RecordTable from "./_components/record-table";
import {
  IRecordData,
  useRecordDataStore,
} from "./_components/useRecordDataStore";

export default function Home() {
  const init = useRecordDataStore((state) => state.init);
  const removeRecord = useRecordDataStore((state) => state.removeRecord);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [recordForEdit, setRecordForEdit] = useState<IRecordData>();

  useEffect(() => {
    init();
  }, [init]);

  const handleRecordEdit = useCallback((record: IRecordData) => {
    setRecordForEdit(record);
    setIsModalOpen(true);
  }, []);

  const handleRecordDelete = useCallback(
    (record: IRecordData) => {
      removeRecord(record.key);
    },
    [removeRecord]
  );

  const handleModalClose = () => {
    setRecordForEdit(undefined);
    setIsModalOpen(false);
  };

  return (
    <main>
      <div className="flex justify-between my-[1.2rem] mx-[1.4rem]">
        <h1 className="text-heading">회원 목록</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          추가
        </Button>
      </div>

      <RecordTable onEdit={handleRecordEdit} onDelete={handleRecordDelete} />
      <RecordModal
        recordData={recordForEdit}
        isModalOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </main>
  );
}
