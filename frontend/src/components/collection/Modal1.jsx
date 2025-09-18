
const Modal = ({ title, handleModal, modalRef, children }) => {
  return (
    <div className="">
      <div ref={modalRef} className="">
        <div className="">
          <div></div>
          <h3>{title}</h3>
          <svg
            onClick={handleModal}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
