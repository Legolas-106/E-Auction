import React, { useState, useRef, useEffect } from 'react';
import { authService } from '../../services/authServices';

const OTPVerification = ({ onVerify, setOtpVerified, data }) => {
  const [otpValues, setOTPValues] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);
  const [otpError, setOtpError] = useState(null);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedValue = (event.clipboardData || window.clipboardData).getData('text').trim();
    
    if (!/^\d{1,6}$/.test(pastedValue)) {
      setOtpError('Invalid OTP format');
      return;
    }

    const newOTPValues = pastedValue.split('').concat(Array(6).fill('')).slice(0, 6);
    setOTPValues(newOTPValues);
  };

  const handleKeyUp = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && !otpValues[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleInputChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOTPValues = [...otpValues];
    newOTPValues[index] = value;
    setOTPValues(newOTPValues);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const isVerifyButtonActive = otpValues.every(value => value !== '');

  const handleVerify = async () => {
    if (isVerifyButtonActive) {
      console.log('Verifying OTP:', otpValues.join(''));
      console.log("Verifying the otp");
      const Otp = otpValues.join('');
      try{
        const response = await authService.verifyOtp({"email":data["email"],"otp":Otp});
        if(response && !response.success){
          if(response.message.includes("Expired")){
            console.log("Otp is expired");
            setOtpError("Otp is expired, kindly resend it");
          }
          else{
            console.log("INvalid OTP");
            setOtpError("Invalide OTP");
          }
        }
        else{
          console.log("Otp verified Succesfully ",response.message);
          setOtpVerified(true);
          onVerify();
        }
      }catch(err){
        console.log("Error received while validating the otp");
      }
      
    } else {
      setOtpError('Please enter all OTP digits');
    }
  };

  const handleResendOtp = async () => {
    try {

      const response = await authService.requestOtp(data);
      if (response?.otpValue !== "Error") {
        setOtpError('OTP resent successfully.');
      } else {
        setOtpError('Error while resending OTP.');
      }
    } catch {
      setOtpError('Error while resending OTP.');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h4 className="text-center text-xl font-semibold mb-4">Verify</h4>
          <p className="text-center text-gray-600 mb-4">Your code was sent to you via email</p>

          {otpError && <div className="text-red-500 text-center mb-3">{otpError}</div>}

          <div className="flex justify-center space-x-2 mb-4">
            {otpValues.map((value, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                ref={(el) => (inputRefs.current[index] = el)}
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyUp={(e) => handleKeyUp(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                maxLength={1}
                className="w-10 h-12 text-center text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={index !== 0 && otpValues[index - 1] === ''}
              />
            ))}
          </div>

          <button
            ref={buttonRef}
            onClick={handleVerify}
            disabled={!isVerifyButtonActive}
            className={`w-full py-2 rounded-md text-white ${
              isVerifyButtonActive ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Verify
          </button>

          <p className="text-center text-gray-500 text-sm mt-4">
            Didn't receive code?{' '}
            <button onClick={handleResendOtp} className="text-blue-500 hover:underline">
              Request again
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
