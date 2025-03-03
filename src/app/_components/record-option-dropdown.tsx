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
      label: <a onClick={() => handleEdit(record)}>수정</a>,
      key: "edit",
    },
    {
      label: (
        <a onClick={() => handleDelete(record.key)}>
          <span className="text-error">삭제</span>
        </a>
      ),
      key: "delete",
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  );
}

export default RecordOptionDropdown;
