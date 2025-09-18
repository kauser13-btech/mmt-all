import React from "react";

const SecurityDetail = () => {
  return (
    <div className="w-full h-[460px] py-[42px] px-10 bg-white">
      <p className="text-xl font-bold text-[#535D72] pb-[10px] mb-[30px] border-b border-b-[#D9D9D9]">Security</p>

        <div className="flex flex-col mb-[10px]">
          <input className="text-md  text-[#838697] outline-none py-[10px] bg-none border-b border-b-[#d9d9d9] rounded-[0]" type="password" placeholder="Password" />
          <span className="flex justify-between mt-2 text-lg text-[#d9d9d9] ">You have never changed your password
            {/* <Link href="#" className={styles.link}>
              Password Change
            </Link> */}
          </span>
        </div>
        {/* <li className="flex flex-col">
          <input className="text-md  text-[#838697] outline-none py-[10px] bg-none border-b border-b-[#d9d9d9] rounded-[0]" type="email" placeholder="Secondary Email" />
          <span className="flex justify-between mt-2">
            <span className="text-lg text-[#d9d9d9] ">You do not have a secondary email</span>
            <Link href="#" className={styles.link}>
              Add secondary email
            </Link>
          </span>
          <p className="text-sm mt-3 text-[#d9d9d9] ">
            (A secondary email can be used to restore access to your account.
            Security notifications are also sent to this email.)
          </p>
        </li> */}

    </div>
  );
};

export default SecurityDetail;
