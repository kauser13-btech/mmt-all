// import Input from "@/app/components/ui/Input";
// import React from "react";
// import { useForm } from "react-hook-form";
// import styles from "@/app/styles/user/address/modalForm.module.scss";
// import { toast } from "react-toastify";
// import useGetCurrentUserSession from "@/app/hooks/useGetCurrentUserSession";

// const AddNewAddress = ({ addressType }) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm({
//     defaultValues: {
//       address_type: addressType,
//       street_address: "",
//       apartment_suit_unit: "",
//       city: "",
//       state: "",
//       country: "",
//       postal_code: "",
//       status: 'active',
//     },
//   });
//   const userToken = useGetCurrentUserSession();
//   const handleAddAddress = async () => {
//     const addAddressToastId = toast.loading("Please wait...");
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/user-address`,
//         {
//           method: "POST",
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${userToken}`,
//           },
//           body: JSON.stringify(watch()),
//         }
//       );
//       if (response.ok) {
//         const result = await response.json();
//         toast.update(addAddressToastId, {
//           render: result.message,
//           type: "success",
//           isLoading: false,
//         });
//         setTimeout(() => {
//           window.location.reload();
//         }, 2000);
//       }
//     } catch (error) {
//       toast.update(addAddressToastId, {
//         render: error.stack,
//         type: "success",
//         isLoading: false,
//       });
//     }
//   };
//   return (
//     <form
//       onSubmit={handleSubmit(handleAddAddress)}
//       className={styles.formContainer}
//     >
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

// export default AddNewAddress;

import React from 'react'

const AddNewAddress = () => {
  return (
    <div>AddNewAddress</div>
  )
}

export default AddNewAddress
