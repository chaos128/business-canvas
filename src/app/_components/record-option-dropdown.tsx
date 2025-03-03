import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { IRecordData } from "./useRecordDataStore";

function RecordOptionDropdown({
  record,
  onEdit: handleEdit,
  onDelete: handleDelete,
}: {
  record: IRecordData;
  onEdit: (record: IRecordData) => void;
  onDelete: (key: React.Key) => void;
}) {
  const items: MenuProps["items"] = [
    {
      label: <p onClick={() => handleEdit(record)}>수정</p>,
      key: "0",
    },
    {
      label: (
        <p className="text-error" onClick={() => handleDelete(record.key)}>
          삭제
        </p>
      ),
      key: "1",
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button icon={<MoreOutlined />} />
    </Dropdown>
  );
}

export default RecordOptionDropdown;
