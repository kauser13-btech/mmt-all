// import Input from "@/app/components/ui/Input";
// import React from "react";
// import { set, useForm } from "react-hook-form";
// import styles from "@/app/styles/user/address/modalForm.module.scss";
// import useGetCurrentUserId from "@/app/hooks/useGetCurrentUserId";
// import useGetCurrentUserSession from "@/app/hooks/useGetCurrentUserSession";
// import { toast } from "react-toastify";

// const EditAdressForm = ({ handleModal, addressId, addressData }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm({
//     defaultValues: {
//       address_type: 2,
//       street_address: addressData.streetAddress,
//       apartment_suit_unit: addressData.ApartmentDetail,
//       city: addressData.TownCity,
//       state: addressData.State,
//       country: addressData.Country,
//       postal_code: addressData.PostalCode,
//     },
//   });
//   const userToken = useGetCurrentUserSession();

//   const onSubmit = async (data) => {
//     try {
//       const id = toast.loading("Please wait...");
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-address/${addressId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${userToken}`,
//           },
//           body: JSON.stringify(data),
//         }
//       );
//       if (response.ok) {
//         const result = await response.json();

//         toast.update(id, {
//           render: result.message,
//           type: "success",
//           isLoading: false,
//         });
//         handleModal();
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       } else {
//         toast.update(id, {
//           render: "Something went wrong",
//           type: "error",
//           isLoading: false,
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
//       <div className={styles.container}>
//         <div className={styles.inputContainer}>
//           <label>Street Address</label>
//           <Input
//             type="text"
//             name="street_address"
//             placeholder="Street Address"
//             register={register}
//             error={errors.street_address}
//           />
//         </div>
//         <div className={styles.inputContainer}>
//           <label>Apartment Suite, unit, Etc</label>
//           <Input
//             type="text"
//             name="apartment_suit_unit"
//             placeholder="Apartment Suite, unit, Etc"
//             register={register}
//             error={errors.apartment_suit_unit}
//           />
//         </div>
//         <div className={styles.inputContainer}>
//           <label>City</label>
//           <Input
//             type="text"
//             name="city"
//             placeholder="City"
//             register={register}
//             error={errors.city}
//           />
//         </div>
//         <div className={styles.inputContainer}>
//           <label>State</label>
//           <Input
//             type="text"
//             name="state"
//             placeholder="State"
//             register={register}
//             error={errors.state}
//           />
//         </div>
//         <div className={styles.inputContainer}>
//           <label>Postal Code</label>
//           <Input
//             type="text"
//             name="postal_code"
//             placeholder="Postal Code"
//             register={register}
//             error={errors.postal_code}
//           />
//         </div>
//         <div className={styles.inputContainer}>
//           <label>Country</label>
//           <Input
//             type="text"
//             name="country"
//             placeholder="Country"
//             register={register}
//             error={errors.country}
//           />
//         </div>
//         <div className={styles.inputContainer}>
//           <label>Phone</label>
//           <Input
//             type="text"
//             name="phone"
//             placeholder="Phone"
//             register={register}
//             error={errors.phone}
//           />
//         </div>
//       </div>
//       <input type="submit" value="Update Adress" />
//     </form>
//   );
// };

// export default EditAdressForm;

import React from 'react'

const EditAdressForm = () => {
  return (
    <div>EditAdressForm</div>
  )
}

export default EditAdressForm