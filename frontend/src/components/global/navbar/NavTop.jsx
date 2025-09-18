import { toast } from "react-toastify"; // Importing toast package

const NavTop = () => {
  // Function to handle copy
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      toast.success(`Copied: ${code}`, {
        position: "top-center",
        autoClose: 2000,
      });
    }).catch(err => {
      toast.error('Failed to copy', {
        position: "top-center",
        autoClose: 2000,
      });
    });
  };

  return (
    <div className="w-full bg-gradient-to-r from-[#00a8ae] via-purple-500 to-[#ff9100] text-center">
      <div className="text-white font-bold p-2 text-base flex flex-col sm:flex-row justify-center">
        <span 
          className="px-3 cursor-pointer" 
          onClick={() => handleCopy('MT15')}
        >
          Buy 2 Get 15% Off Code: MT15
        </span>
        <span className="hidden sm:block px-3">
          <div className="border-l-[3px] border-orange-400 h-full"></div>
        </span>
        <span 
          className="px-3 cursor-pointer" 
          onClick={() => handleCopy('B3G1')}
        >
          Buy 3 Get 1 Free Code: B3G1
        </span>
      </div>
    </div>
  );
};

export default NavTop;
