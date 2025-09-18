import React from "react";
import DetailContainer from "./DetailContainer";
const ShippingDetail = ({ userAddressData }) => {
  return (
    <DetailContainer
      id={userAddressData.id}
      title={userAddressData.address_type}
      streetAddress={userAddressData.street_address}
      ApartmentDetail={userAddressData.apartment_suit_unit}
      State={userAddressData.state}
      TownCity={userAddressData.street_address + ", " + userAddressData.city}
      PostalCode={userAddressData.postal_code}
      Country={userAddressData.country}
      Phone={userAddressData.phone}
      url={userAddressData.apartment_suit_unit}
    />
  );
};

export default ShippingDetail;
