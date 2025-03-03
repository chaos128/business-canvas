"use client";

import { Key, useEffect, useState } from "react";
import RecordAddButton from "./_components/record-add-button";
import RecordModal from "./_components/record-modal";
import RecordTable from "./_components/record-table";
import {
  IRecordData,
  useRecordDataStore,
} from "./_components/useRecordDataStore";

export default function Home() {
  const init = useRecordDataStore((state) => state.init);
  const removeRecord = useRecordDataStore((state) => state.removeRecord);

  const [recordForEdit, setRecordForEdit] = useState<IRecordData>();
  useEffect(() => {
    init();
  }, [init]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleEdit = (record: IRecordData) => {
    setRecordForEdit(record);
    setIsModalOpen(true);
  };

  const handleDelete = (key: Key) => {
    removeRecord(key);
  };

  return (
    <div>
      <main>
        <div className="flex justify-between my-[1.2rem] mx-[1.4rem]">
          <h1 className="text-heading">회원 목록</h1>
          <RecordAddButton
            onClick={() => {
              setIsModalOpen(true);
            }}
          />
        </div>

        <RecordTable onEdit={handleEdit} onDelete={handleDelete} />
        <RecordModal
          recordData={recordForEdit}
          isModalOpen={isModalOpen}
          onCancel={() => {
            setRecordForEdit(undefined);
            setIsModalOpen(false);
          }}
          onOk={() => {
            setRecordForEdit(undefined);
            setIsModalOpen(false);
          }}
        />
      </main>
    </div>
  );
}
