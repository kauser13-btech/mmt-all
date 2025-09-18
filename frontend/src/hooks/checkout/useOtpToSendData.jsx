import ApiCall from '@/lib/util/ApiCall';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const useOtpToSendData = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { performPost } = ApiCall();

  const handleRequestForOTP = async (data) => {
    const formData = {
      email: Cookies.get("email"),
      status: 1,
      otp: data.otp,
    };

    const id = toast.loading("Please wait...");
    const status = Cookies.get("status");
    try {
      const response = await performPost("api/v1/create-dummy-user", formData);
      if (response.success && response.data && status == "checkout complete") {
        toast.success(response.message, {
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: true,
        });
        router.push("/checkout/register/password");
        Cookies.set("status", "otp complete");

        setError("otp", {
          type: "manual",
          message: "",
        });
      } else {
        toast.error(response.message, {
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: true,
        });
        setError("otp", {
          type: "manual",
          message: "Otp is not valid. Please check the code.",
        });
      }
      toast.dismiss(id);
    } catch (error) {
      toast.dismiss(id);
      console.error("Error while handling OTP request:", error);
    }
  };


  return (
    setError, handleRequestForOTP, handleSubmit
  )
}

export default useOtpToSendData