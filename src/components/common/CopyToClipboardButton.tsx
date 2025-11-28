import { Copy } from 'lucide-react';
import React from 'react';

import { CopyButton } from './CopyToClipboardButton.styled';

interface CopyToClipboardButtonProps {
  textToCopy: string;
  color: string;
  backgroundColor: string;
}

export const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = (props) => {
  const { textToCopy, color, backgroundColor } = props;

  const handleCopyClick = async () => {
    try {
      await window.navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Unable to copy to clipboard.', err);
    }
  };

  return (
    <CopyButton type="button" onClick={handleCopyClick} $backgroundColor={backgroundColor}>
      <Copy color={color} />
    </CopyButton>
  );
};
