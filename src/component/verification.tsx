import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import toast from 'react-hot-toast';

interface verificationProps {
  placeholder: string;
  Element: string;
  buttonEle: string;
  check: boolean;
}

const Verification: React.FC<verificationProps> = ({
  placeholder,
  Element,
  buttonEle,
  check,
}) => {
  const [value, setValue] = useState<string>("");
  const router = useRouter();
  const { mutate: sendotp } = api.otp.sendOtp.useMutation({
    onError: async () => {
      toast.error("INVALID AADHAR");
      setValue("");
    },
    onSuccess:async()=>{
      toast.success("OTP sent");
      localStorage.setItem('Aadharnumber',`${value}`)
      router.push('/verifyAadhar/otp')
    }
  });
  const {mutate:verifyotp}=api.otp.verifyOtp.useMutation({
    onError:async()=>{
      toast.error("Wrong OTP");
      setValue("");
    },
    onSuccess:async()=>{
      toast.success("Aadhar verified");
      router.push('/main')
      localStorage.removeItem('Aadharnumber')
    }
  });
  const sendAadhar =() => {
    sendotp(value);
  };
  const verifyOtp=()=>{
    const Aadharnumber=localStorage.getItem('Aadharnumber');
    if(Aadharnumber){   
      verifyotp({Aadharnumber:Aadharnumber,otp:value});
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-yellow-400 to-yellow-600">
      <div className="bg-white rounded-lg p-8 shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">{Element}</h2>
        <input
          type="text"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-orange-300"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <button
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-md py-2 mt-4 w-full hover:from-yellow-600 hover:to-yellow-900 focus:outline-none transition duration-300 ease-in-out"
          onClick={check ? sendAadhar : verifyOtp}
        >
          {buttonEle}
        </button>
      </div>
    </div>
  );
};

export default Verification;
