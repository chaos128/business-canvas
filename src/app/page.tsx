"use client";

import RecordAddButton from "./_components/record-add-button";
import RecordTable from "./_components/record-table";

export default function Home() {
  return (
    <div>
      <main>
        <div className="flex justify-between my-[1.2rem] mx-[1.4rem]">
          <h1 className="text-heading">회원 목록</h1>
          <RecordAddButton />
        </div>

        <RecordTable />
      </main>
    </div>
  );
}
