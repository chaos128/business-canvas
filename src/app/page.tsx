"use client";

import { Button } from "antd";
import { useEffect, useState } from "react";
import RecordAddButton from "./_components/record-add-button";
import RecordModal from "./_components/record-modal";
import RecordTable from "./_components/record-table";
import { useRecordDataStore } from "./_components/useRecordDataStore";

export default function Home() {
  const init = useRecordDataStore((state) => state.init);

  useEffect(() => {
    init();
  }, [init]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

        <RecordTable />
        <Button type="primary">123</Button>
        <RecordModal
          recordData={undefined}
          isModalOpen={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
          }}
          onOk={() => {
            setIsModalOpen(false);
          }}
        />
      </main>
    </div>
  );
}
