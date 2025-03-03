"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Key, useCallback, useEffect, useState } from "react";
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

  const handleEdit = useCallback((record: IRecordData) => {
    setRecordForEdit(record);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    (key: Key) => {
      removeRecord(key);
    },
    [removeRecord]
  );

  const handleClose = () => {
    setRecordForEdit(undefined);
    setIsModalOpen(false);
  };

  return (
    <div>
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

        <RecordTable onEdit={handleEdit} onDelete={handleDelete} />
        <RecordModal
          recordData={recordForEdit}
          isModalOpen={isModalOpen}
          onClose={handleClose}
        />
      </main>
    </div>
  );
}
