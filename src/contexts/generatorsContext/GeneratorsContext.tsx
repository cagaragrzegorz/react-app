import {
  createContext,
  SetStateAction,
} from 'react';

export type GenData = { libName: string; libId: string; }

export type GeneratorsContextType = {
  genData: GenData;
  setGenData: (value: SetStateAction<GenData>) => void;
};

export const GeneratorsContext = createContext<GeneratorsContextType>({
  genData: { libName: '', libId: '' },
  setGenData: () => [],
});
