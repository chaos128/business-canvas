import { enableMapSet } from "immer";
import { Key } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { recordFields } from "./record.constant";

const LOCAL_STORAGE_RECORD_DATA_KEY = "record-data";
const LOCAL_STORAGE_INCREMENTING_KEY = "incrementing-key";
const LOCAL_STORAGE_KEY = "local-storage";

enableMapSet();
export interface IRecordData {
  key: Key;
  name: string;
  address?: string;
  memo?: string;
  createdAt: Date;
  job: string;
  isContentedToReceiveEmail: boolean;
}

export type TRecordDataIndex = keyof Omit<IRecordData, "key">;

export type IRecordFilterMap = Record<TRecordDataIndex, Set<string>>;

interface IRecordDataStore {
  incrementingKey: number;
  recordDataList?: IRecordData[];
  isUsingLocalStorage: boolean;
  filterMap: IRecordFilterMap;
  recordDataIndexList?: TRecordDataIndex[];
  init(): void;
  addRecord(record: IRecordData): void;
  editRecord(record: IRecordData): void;
  removeRecord(key: Key): void;
  updateRecordInLocalStorage: (
    recordDataList: IRecordData[],
    incrementingKey?: number
  ) => void;
  buildFilterMap: (
    recordDataList: IRecordData[],
    recordDataIndexList?: TRecordDataIndex[]
  ) => { filterMap: IRecordFilterMap; newRecordDataList: IRecordData[] };
}

const initialState = {
  incrementingKey: 3, // DB table 의 incrementing primary key 와 같이 사용
  isUsingLocalStorage: false,
  filterMap: {
    name: new Set<string>(),
    address: new Set<string>(),
    memo: new Set<string>(),
    createdAt: new Set<string>(),
    job: new Set<string>(),
    isContentedToReceiveEmail: new Set<string>(),
  },
};

const INITIAL_RECORD_DATA_LIST: IRecordData[] = [
  {
    key: "2",
    name: "John Doe",
    address: "서울 강남구",
    memo: "외국인",
    createdAt: new Date("2024-10-02"),
    job: "개발자",
    isContentedToReceiveEmail: true,
  },
  {
    key: "1",
    name: "Foo Bar",
    address: "서울 서초구",
    memo: "한국인",
    createdAt: new Date("2024-10-01"),
    job: "PO",
    isContentedToReceiveEmail: false,
  },
];

export const useRecordDataStore = create<IRecordDataStore>()(
  immer((set, get) => ({
    ...initialState,
    init: () => {
      const isUsingLocalStorage =
        process.env.NEXT_PUBLIC_STORAGE === LOCAL_STORAGE_KEY;
      let recordDataList;
      let incrementingKey: number = get().incrementingKey;

      if (isUsingLocalStorage) {
        const savedData = localStorage.getItem(LOCAL_STORAGE_RECORD_DATA_KEY);
        const savedIncrementingKey = localStorage.getItem(
          LOCAL_STORAGE_INCREMENTING_KEY
        );

        if (savedData && savedIncrementingKey !== null) {
          recordDataList = JSON.parse(savedData);
          incrementingKey = parseInt(savedIncrementingKey);
        } else {
          recordDataList = INITIAL_RECORD_DATA_LIST;
        }
      } else {
        recordDataList = INITIAL_RECORD_DATA_LIST;
      }

      const recordDataIndexList = recordFields.map(
        ({ dataIndex }) => dataIndex
      );

      const { filterMap, newRecordDataList } = get().buildFilterMap(
        recordDataList,
        recordDataIndexList
      );

      set((state) => {
        state.recordDataIndexList = recordDataIndexList;
        state.recordDataList = newRecordDataList;
        state.isUsingLocalStorage = isUsingLocalStorage;
        state.filterMap = filterMap;
        state.incrementingKey = incrementingKey;
      });
    },
    addRecord: (record) => {
      set((state) => {
        if (state.recordDataList && state.recordDataIndexList) {
          state.recordDataIndexList.forEach((recordDataIndex) => {
            const value = record[recordDataIndex];
            const set = state.filterMap[recordDataIndex];
            if (value !== undefined) {
              set.add(
                value instanceof Date ? value.toISOString() : value.toString()
              );
            }
          });

          state.recordDataList.unshift({
            ...record,
            key: state.incrementingKey.toString(),
          });
          state.incrementingKey++;

          if (state.isUsingLocalStorage) {
            state.updateRecordInLocalStorage(
              state.recordDataList,
              state.incrementingKey
            );
          }
        }
      });
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

          const { filterMap } = get().buildFilterMap(state.recordDataList);
          state.filterMap = filterMap;

          if (state.isUsingLocalStorage) {
            state.updateRecordInLocalStorage(state.recordDataList);
          }
        }
      });
    },
    removeRecord: (key) => {
      set((state) => {
        state.recordDataList = (state.recordDataList ?? []).filter(
          (record) => record.key !== key
        );

        const { filterMap } = get().buildFilterMap(state.recordDataList);
        state.filterMap = filterMap;

        if (state.isUsingLocalStorage) {
          state.updateRecordInLocalStorage(state.recordDataList);
        }
      });
    },
    updateRecordInLocalStorage: (recordDataList, incrementingKey) => {
      localStorage.setItem(
        LOCAL_STORAGE_RECORD_DATA_KEY,
        JSON.stringify(recordDataList)
      );

      if (incrementingKey !== undefined) {
        localStorage.setItem(
          LOCAL_STORAGE_INCREMENTING_KEY,
          JSON.stringify(incrementingKey)
        );
      }
    },
    buildFilterMap: (recordDataList, recordDataIndexList) => {
      const filterMap: IRecordFilterMap = {
        name: new Set<string>(),
        address: new Set<string>(),
        memo: new Set<string>(),
        createdAt: new Set<string>(),
        job: new Set<string>(),
        isContentedToReceiveEmail: new Set<string>(),
      };

      const newRecordDataList = recordDataList.map((record: IRecordData) => {
        const newCreatedAt =
          typeof record.createdAt === "string"
            ? new Date(record.createdAt)
            : record.createdAt;

        (recordDataIndexList ?? get().recordDataIndexList ?? []).forEach(
          (recordDataIndex) => {
            const value = record[recordDataIndex];
            const set = filterMap[recordDataIndex];
            if (value !== undefined) {
              set.add(
                value instanceof Date ? value.toISOString() : value.toString()
              );
            }
          }
        );

        return {
          ...record,
          createdAt: newCreatedAt,
        };
      });

      return { filterMap, newRecordDataList };
    },
  }))
);
