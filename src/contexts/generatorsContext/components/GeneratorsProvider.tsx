import React, { PropsWithChildren, useMemo, useState } from 'react';

import { GenData, GeneratorsContext } from '../GeneratorsContext';

const initialGenData = { libName: 'Scranton Library', libId: '1234567890', ean: '792728211' };

export const GeneratorsProvider = ({ children }: PropsWithChildren) => {

  const [genData, setGenData] = useState<GenData>(initialGenData);

  const context = useMemo(
    () => ({ genData, setGenData }),
    [genData],
  );
  return (
    <GeneratorsContext.Provider value={context}>
      {children}
    </GeneratorsContext.Provider>
  );
};
