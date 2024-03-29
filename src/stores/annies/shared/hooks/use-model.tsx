import React, { useState } from 'react';

interface UseModelReturnType {
  isOpen: boolean;
  onRequestClose: () => void;
  openModel: () => void;
}

const useModel = (initialOpen = false): UseModelReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
  const onRequestClose = (): void => setIsOpen(false);
  const openModel = (): void => setIsOpen(true);
  return { isOpen, onRequestClose, openModel };
};

export default useModel;
