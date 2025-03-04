import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";

function DropdownEditOptions<T>({
  record,
  onEdit: handleEdit,
  onDelete: handleDelete,
}: {
  record: T;
  onEdit: (record: T) => void;
  onDelete: (record: T) => void;
}) {
  const items: MenuProps["items"] = [
    {
      label: <a onClick={() => handleEdit(record)}>수정</a>,
      key: "edit",
    },
    {
      type: "divider",
    },
    {
      label: (
        <a onClick={() => handleDelete(record)}>
          <span className="text-error">삭제</span>
        </a>
      ),
      key: "delete",
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      overlayClassName="w-[18.5rem]"
    >
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  );
}

export default DropdownEditOptions;
