'use client';
import { useAppSelector } from '@/app/redux/hooks';
import Modal from './Modal';

const ModalWrapper = () => {
  const { modalDetails } = useAppSelector((state) => state.modal);

  return <div>{modalDetails.isAlertModalOpen ? <Modal /> : <></>}</div>;
};

export default ModalWrapper;
