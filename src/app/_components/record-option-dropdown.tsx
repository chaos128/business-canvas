import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";

function RecordOptionDropdown() {
  const items: MenuProps["items"] = [
    {
      label: (
        <a
          href="https://www.antgroup.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          1st menu item
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a
          href="https://www.aliyun.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          2nd menu item
        </a>
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
