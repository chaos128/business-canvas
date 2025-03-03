import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const LOCAL_STORAGE_RECORD_DATA_KEY = "record-data";

export interface IRecordData {
  key: React.Key;
  name: string;
  address?: string;
  memo?: string;
  createdAt: Date;
  job: string;
  isContentedToReceiveEmail: boolean;
}

interface IRecordDataStore {
  incrementingKey: number;
  recordDataList?: IRecordData[];
  isUsingLocalStorage: boolean;
  init(): void;
  addRecord(record: IRecordData): boolean;
  editRecord(record: IRecordData): boolean;
  removeRecord(key: React.Key): void;
  updateRecordInLocalStorage: (recordDataList: IRecordData[]) => void;
}

const initialState = {
  incrementingKey: 3,
  isUsingLocalStorage: false,
};

const INITIAL_RECORD_DATE_LIST: IRecordData[] = [
  {
    key: 1,
    name: "John Doe",
    address: "서울 강남구",
    memo: "외국인",
    createdAt: new Date("2024-10-02"),
    job: "개발자",
    isContentedToReceiveEmail: true,
  },
  {
    key: 2,
    name: "Foo Bar",
    address: "서울 서초구",
    memo: "한국인",
    createdAt: new Date("2024-10-01"),
    job: "PO",
    isContentedToReceiveEmail: false,
  },
];

export const useRecordDataStore = create<IRecordDataStore>()(
  immer((set) => ({
    ...initialState,
    init: () => {
      const isUsingLocalStorage =
        process.env.NEXT_PUBLIC_STORAGE === "local-storage";
      let recordDataList;

      if (isUsingLocalStorage) {
        const savedData = localStorage.getItem(LOCAL_STORAGE_RECORD_DATA_KEY);

        if (savedData) {
          recordDataList = JSON.parse(savedData).map((record: IRecordData) => ({
            ...record,
            createdAt: new Date(record.createdAt),
          }));
        } else {
          recordDataList = INITIAL_RECORD_DATE_LIST;
        }
      } else {
        recordDataList = INITIAL_RECORD_DATE_LIST;
      }

      set((state) => {
        state.recordDataList = recordDataList;
        state.isUsingLocalStorage = isUsingLocalStorage;
      });
    },
    addRecord: (record) => {
      set((state) => {
        if (state.recordDataList) {
          state.recordDataList.unshift({
            ...record,
            key: state.incrementingKey,
          });
          state.incrementingKey++;

          if (state.isUsingLocalStorage) {
            state.updateRecordInLocalStorage(state.recordDataList);
          }
        } else {
          return false;
        }
      });

      return true;
    },
    editRecord: (record) => {
      set((state) => {
        if (state.recordDataList) {
          const index = state.recordDataList.findIndex(
            ({ key }) => key === record.key
          );

          if (index !== -1) {
            state.recordDataList[index] = record;
          }

          if (state.isUsingLocalStorage) {
            state.updateRecordInLocalStorage(state.recordDataList);
          }
        } else {
          return false;
        }
      });

      return true;
    },

    removeRecord: (key) => {
      set((state) => {
        state.recordDataList = (state.recordDataList ?? []).filter(
          (record) => record.key !== key
        );

        if (state.isUsingLocalStorage) {
          state.updateRecordInLocalStorage(state.recordDataList);
        }
      });
    },
    updateRecordInLocalStorage: (recordDataList) => {
      localStorage.setItem(
        LOCAL_STORAGE_RECORD_DATA_KEY,
        JSON.stringify(recordDataList)
      );
    },
  }))
);
