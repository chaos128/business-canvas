import DropdownEditOptions from "../../ui/dropdown-edit-options";
import { useTableColumns } from "../hooks/useTableColumns";
import { JobType, recordFields } from "./record.constant";
import {
  IRecordData,
  IRecordFilterMap,
  TRecordDataIndex,
} from "./useRecordDataStore";

export function useRecordTableColumns({
  filterMap,
  onEdit: handleEdit,
  onDelete: handleDelete,
}: {
  filterMap: IRecordFilterMap;
  onEdit: (record: IRecordData) => void;
  onDelete: (record: IRecordData) => void;
}) {
  const { columns, setFilteredInfo } = useTableColumns<
    TRecordDataIndex,
    JobType,
    IRecordData
  >({
    filterMap,
    additionalColumns: [
      {
        width: "4.8rem",
        render: (data) => {
          return (
            <DropdownEditOptions<IRecordData>
              record={data}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          );
        },
      },
    ],
    fields: recordFields,
  });

  return { columns, setFilteredInfo };
}
