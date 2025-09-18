import Image from 'next/image';
import SearchContent from "./SearchContent1";
const SneakerModal = ({ modalHandle, handleChangeSneaker, type, productModal, modalId }) => {
  return (
    <div className="flex gap-14 p-8 min-h-full lg:p-0">
      <div className="w-full h-[727px] max-lg:hidden">
        <Image className="w-auto h-[727px] object-cover" src="/images/sneakerModal.webp" alt="image" width={100} height={100} />
      </div>
      <SearchContent
        modalHandle={modalHandle}
        handleChangeSneaker={handleChangeSneaker}
        type={type}
        productModal={productModal}
        modalId={modalId}
      />
    </div>
  );
};

export default SneakerModal;
