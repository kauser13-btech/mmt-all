// import useGetCurrentUserSession from "@/app/hooks/useGetCurrentUserSession";
// import useOutsideClick from "@/app/hooks/useOutsideClick";
// import { useRef, useState } from "react";
// import { createPortal } from "react-dom";
// import { toast } from "react-toastify";
// import styles from "../../../styles/admin/user/address/detailContainer.module.scss";
// import Modal from "../../collection/Modal";
// import EditAdressForm from "./EditAddressForm/EditAdressForm";

// const DetailContainer = ({
//   id,
//   title,
//   streetAddress,
//   ApartmentDetail,
//   State,
//   TownCity,
//   PostalCode,
//   Country,
//   Phone,
//   url,
// }) => {
//   const [showEditModal, setShowEditModal] = useState(false);
//   const modalRef = useRef(null);
//   const addressData = {
//     id,
//     title,
//     streetAddress,
//     ApartmentDetail,
//     State,
//     TownCity,
//     PostalCode,
//     Country,
//     Phone,
//     url,
//   };
//   useOutsideClick(modalRef, () => {
//     setShowEditModal(false);
//   });

//   const userToken = useGetCurrentUserSession();

//   const handleDelete = async (addressId) => {
//     try {
//       const deleteToastId = toast.loading("Please wait...");
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-address/${addressId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${userToken}`,
//           },
//         }
//       );
//       if (response.ok) {
//         const result = await response.json();
//         toast.update(deleteToastId, {
//           render: result.message,
//           type: "success",
//           isLoading: false,
//         });
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       }
//     } catch (error) {
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.addressContainer}>
//         <p className={styles.title}>{title}</p>
//         <div className={styles.titleBtnContainer}>
//           <button onClick={() => handleDelete(id)} className={styles.editLink}>
//             Delete
//           </button>
//           <button
//             onClick={() => setShowEditModal(true)}
//             className={styles.editLink}
//           >
//             Edit
//           </button>
//         </div>
//         {showEditModal &&
//           createPortal(
//             <Modal
//               title={`Edit ${addressData.title}`}
//               handleModal={() => setShowEditModal(false)}
//               modalRef={modalRef}
//             >
//               <EditAdressForm
//                 addressData={addressData}
//                 handleModal={() => setShowEditModal(false)}
//                 addressId={id}
//               />
//             </Modal>,
//             document.getElementById("modal-container")
//           )}
//       </div>

//       <ul>
//         <li>
//           <p>
//             Street Address : <span>{streetAddress}</span>
//           </p>
//         </li>
//         <li>
//           <p>
//             Apartment Suite, unit, Etc : <span>{ApartmentDetail}</span>
//           </p>
//         </li>
//         <li>
//           <p>
//             State : <span>{State}</span>
//           </p>
//         </li>
//         <li>
//           <p>
//             Town city : <span>{TownCity}</span>
//           </p>
//         </li>
//         <li>
//           <p>
//             Postal Code : <span>{PostalCode} </span>
//           </p>
//         </li>
//         <li>
//           <p>
//             Country : <span>{Country}</span>
//           </p>
//         </li>
//         <li>
//           <p>
//             Phone : <span>{Phone}</span>
//           </p>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default DetailContainer;

import React from 'react'

const DetailContainer = () => {
  return (
    <div>DetailContainer</div>
  )
}

export default DetailContainer