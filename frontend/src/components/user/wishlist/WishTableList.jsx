// "use client";
// import React, { useState } from "react";
// import styles from "../../../styles/admin/user/wishlist/table.module.scss";
// import Link from "next/link";

// const WishTableList = () => {
//   const MAX_TITLE_LENGTH = 50;
//   const [expandedTitle, setExpandedTitle] = useState(null);
//   const toggleTitle = (id) => {
//     if (expandedTitle === id) {
//       setExpandedTitle(null);
//     } else {
//       setExpandedTitle(id);
//     }
//   };
//   const wishList = [
//     {
//       id: 1,
//       image: "/images/user/wishlist/workharddreambig.png",
//       productName:
//         "T-Shirt - Nike Dunk Low Chlorophyll - Sneaker-Matching T-Shirt (STAY FOCUSED)",
//       item: "1 Item",
//       addedDate: "2022/12/03 at 10 PM",
//       price: "$100.00",
//       color: "Red",
//     },
//     {
//       id: 2,
//       image: "/images/user/wishlist/workharddreambig.png",
//       productName:
//         "T-Shirt - Nike Dunk Low Chlorophyll - Sneaker-Matching T-Shirt (STAY FOCUSED)",
//       item: "1 Item",
//       addedDate: "2022/12/03 at 10 PM",
//       price: "$100.00",
//       color: "Red",
//     },
//     {
//       id: 3,
//       image: "/images/user/wishlist/workharddreambig.png",
//       productName:
//         "T-Shirt - Nike Dunk Low Chlorophyll - Sneaker-Matching T-Shirt (STAY FOCUSED)",
//       item: "1 Item",
//       addedDate: "2022/12/03 at 10 PM",
//       price: "$100.00",
//       color: "Red",
//     },

//     // Add more order items as needed...
//   ];
//   return (
//     <div>
//       <div className={styles.container}>
//         <table className={styles.tableContent}>
//           <thead>
//             <tr>
//               <th>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="13"
//                   height="12"
//                   viewBox="0 0 13 12"
//                   fill="none"
//                 >
//                   <path
//                     d="M11.5026 1.33333V10.6667H2.16927V1.33333H11.5026ZM11.5026 0H2.16927C1.43594 0 0.835938 0.6 0.835938 1.33333V10.6667C0.835938 11.4 1.43594 12 2.16927 12H11.5026C12.2359 12 12.8359 11.4 12.8359 10.6667V1.33333C12.8359 0.6 12.2359 0 11.5026 0Z"
//                     fill="#838697"
//                   />
//                 </svg>
//               </th>
//               <th>Product</th>
//               <th className={styles.titleCol}>Title</th>
//               <th className={styles.dateCol}>Added Date</th>
//               <th>Price</th>
//               <th>Item</th>
//               <th>Color</th>
//               <th className={styles.actionCol}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {wishList.map((wish) => (
//               <tr key={wish.id} className={styles.tableRow}>
//                 <td className={styles.checkMarkContainer}>
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="12"
//                     height="12"
//                     viewBox="0 0 12 12"
//                     fill="none"
//                   >
//                     <path
//                       d="M10.6667 1.33333V10.6667H1.33333V1.33333H10.6667ZM10.6667 0H1.33333C0.6 0 0 0.6 0 1.33333V10.6667C0 11.4 0.6 12 1.33333 12H10.6667C11.4 12 12 11.4 12 10.6667V1.33333C12 0.6 11.4 0 10.6667 0Z"
//                       fill="#838697"
//                     />
//                   </svg>
//                 </td>
//                 <td>
//                   <img src={wish.image} alt={wish.productName} />
//                 </td>
//                 <td>
//                   <p>{wish.productName.substring(0, MAX_TITLE_LENGTH)}...</p>
//                 </td>
//                 <td>
//                   <p>{wish.addedDate}</p>
//                 </td>
//                 <td>
//                   <p>{wish.price}</p>
//                 </td>
//                 <td>
//                   <p>{wish.item}</p>
//                 </td>

//                 <td>
//                   <p>{wish.color}</p>
//                 </td>

//                 <td>
//                   <Link href="#" className={styles.addToCart}>
//                     Add to Cart
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default WishTableList;


import React from 'react'

const WishTableList = () => {
  return (
    <div>WishTableList</div>
  )
}

export default WishTableList