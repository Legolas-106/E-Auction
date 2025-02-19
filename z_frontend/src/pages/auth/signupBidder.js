import React, { useState, useRef,useEffect } from "react";
import CaptchaValidation from "../../features/auth/captcha";
import { authService } from "../../services/authServices";
import OTPVerification from "../../features/auth/otpVerification";

function SignUpPageTailwind() {
	const [isFormValid, setIsFormValid] = useState(false);
	const [currentStep, setCurrentStep] = useState(2);
	const [otpVerified,setOtpVerified] = useState(false);
	const [confirmPassword,setConfirmPassword] = useState("");
	const [password,setPassword] = useState("");
	const [passwordError,setPasswordError] = useState("");
	const [formData, setFormData] = useState({
		loginId: "",
		correspondenceEmail: "",
		countryCode: "",
		mobileNumber: "",
		title: "",
		contactName: "",
		designation: "",
		dateOfBirth: "",
		password: "",
	});

	// State for validation errors
	const [errors, setErrors] = useState({
		loginId: "",
		correspondenceEmail: "",
		mobileNumber: "",
		contactName: "",
		designation: "",
		dateOfBirth: "",
		password: "",
	});
	//Company Details Validation
	const [companyFormValid, setCompanyFormValid] = useState(false);
	const [companyData, setCompanyData] = useState({
		companyName: "",
		cin: "",
		preferentialBidder: "",
		registeredAddress: "",
		partnersDirectors: "",
		// foreignCompany: "",
		city: "",
		state: "",
		postalCode: "",
		panNumber: "",
		establishmentYear: "",
		natureOfBusiness: "",
		legalStatus: "",
		companyCategory: "",
	});

	// Add these to the existing errors state
	const [companyErrors, setCompanyErrors] = useState({
		companyName: "",
		cin: "",
		registeredAddress: "",
		partnersDirectors: "",
		city: "",
		state: "",
		postalCode: "",
		panNumber: "",
		establishmentYear: "",
		natureOfBusiness: "",
		legalStatus: "",
		companyCategory: "",
	});
	const [otpValue,setOtpValue] = useState(null);
	const [isEmailVerified, setIsEmailVerified] = useState(false);

	const goToNextStepOfForm = async (e) =>{
		e.preventDefault();

		console.log(isEmailVerified,isFormValid,companyFormValid);

		if(isEmailVerified,isFormValid,companyFormValid){
			console.log("Inside email verification");
			//Send the email to the user 
			try{
				const response = await authService.requestOtp({"loginId":formData.loginId,"email":formData.correspondenceEmail});
				console.log("Response for OTP Email Verification");
				if(response && response.otpValue == "Error"){
					if(response.expiryTime.includes("Wait")){
						console.log("Wait a minute beofre sending the otp request again");
						alert("Kindly wait a minute before sending the request again");
						return false;
					}
					else if(response.expiryTime.includes("Maximum")){
						console.log("Maximum OTP request is reached for the Email ID");
						alert("Maximum OTP request is reached for the requested Email");
						return false;
					}
					else{
						console.log("Error is : ",response.expiryTime);
						alert("Error  : ",response.expiryTime);
						return false;
					}
				}
				setCurrentStep(2);
			}catch(err){
				alert(err.message);
				return false;
			}
		}
		else{
			console.log(isEmailVerified,isFormValid,companyFormValid);
			console.log("Getting into else block");
			alert("Kindly fill the form correctly");
			return false;
		}

	}
	


  //used to show currentStep page on SignUp Form


	// Email validation regex
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Mobile number validation regex (assuming 10 digits)
	const mobileRegex = /^\d{10}$/;

	// Validation functions
	const validateEmail = (email) => {
		if (!email) {setIsEmailVerified(false);return "Email is required"};
		if (!emailRegex.test(email)) {setIsEmailVerified(false);return "Invalid email format"};
		setIsEmailVerified(true)
		return "";
	};

	const validateMobile = (mobile) => {
		if (!mobile) return "Mobile number is required";
		if (!mobileRegex.test(mobile)) return "Mobile number must be 10 digits";
		return "";
	};

	const handlePasswordChange = (e) =>{
		if(confirmPassword && confirmPassword!=(e.target.value)){
			setPasswordError("Password do not match the confirm Password");
		}
		else{
			setPasswordError("");
		}
		let val = e.target.value;
		setPassword(e.target.value);
		console.log("Setting up the password");
		setFormData((prev)=>({
			...prev,
			["password"] : val
		}));
	}

	const handleConfirmPasswordChange = (e) =>{
		setConfirmPassword(e.target.value);
		if(password && password != (e.target.value)){
			setPasswordError("Confirm Password doesnt match the password");
		}
		else{
			setPasswordError("");
		}
	}

	const validateRequired = (value, fieldName) => {
		if (!value) return `${fieldName} is required`;
		return "";
	};

	// Handle input changes
	
	const handleInputChange = (e) => {
		const {name,value} = e.target;
		console.log("Name is : ",name," Value is : ",value);
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));

		// Validate on change
		let error = "";
		switch (name) {
			case "loginId":
			case "correspondenceEmail":
				error = validateEmail(value);
				break;
			case "mobileNumber":
				error = validateMobile(value);
				break;
			case "contactName":
				error = validateRequired(value, "Contact name");
				break;
			case "designation":
				error = validateRequired(value, "Designation");
				break;
			case "dateOfBirth":
				error = validateRequired(value, "Date of birth");
				break;
			case "password":
				error = validateRequired(value, "Password");
				break;
			default:
				break;
		}

		setErrors((prev) => ({
			...prev,
			[name]: error,
		}));
	};

	// Form validation function
	const formValidation = () => {
		const newErrors = {
			loginId: validateEmail(formData.loginId),
			correspondenceEmail: validateEmail(formData.correspondenceEmail),
			mobileNumber: validateMobile(formData.mobileNumber),
			contactName: validateRequired(formData.contactName, "Contact name"),
			designation: validateRequired(formData.designation, "Designation"),
			dateOfBirth: validateRequired(formData.dateOfBirth, "Date of birth"),
			password: validateRequired(formData.password, "Password"),
		};
		setErrors(newErrors);

		// Check if there are any errors
		return !Object.values(newErrors).some((error) => error !== "");
	};



	// Validation patterns
	const cinRegex =
		/^([L|U]{1})([0-9]{5})([A-Z]{2})([0-9]{4})([A-Z]{3})([0-9]{6})$/;
	const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
	const postalCodeRegex = /^[0-9]{6}$/;

	// Validation functions
	const validateCompanyField = (name, value) => {
		switch (name) {
			case "companyName":
				return value.trim() ? "" : "Company name is required";

			case "cin":
				if (!value) return "CIN is required";
				return cinRegex.test(value) ? "" : "Invalid CIN format";

			case "registeredAddress":
				return value.trim() ? "" : "Registered address is required";

			case "partnersDirectors":
				return value.trim() ? "" : "Partners/Directors information is required";

			case "city":
				return value.trim() ? "" : "City is required";

			case "state":
				return value.trim() ? "" : "State is required";

			case "postalCode":
				if (!value) return "Postal code is required";
				return postalCodeRegex.test(value) ? "" : "Invalid postal code format";

			case "panNumber":
				if (!value) return "PAN/TAN number is required";
				return panRegex.test(value) ? "" : "Invalid PAN/TAN format";

			case "establishmentYear":
				if (!value) return "Establishment year is required";
				const year = parseInt(value);
				return year >= 1800 && year <= new Date().getFullYear()
					? ""
					: "Invalid year";

			case "natureOfBusiness":
				return value.trim() ? "" : "Nature of business is required";

			case "legalStatus":
				return value === "0" ? "Please select legal status" : "";

			case "companyCategory":
				return value === "0" ? "Please select company category" : "";

			default:
				return "";
		}
	};

	// Handle company information input changes
	const handleCompanyInputChange = (e) => {
		const { name, value } = e.target;

		setCompanyData((prev) => ({
			...prev,
			[name]: value,
		}));

		const error = validateCompanyField(name, value);
		setCompanyErrors((prev) => ({
			...prev,
			[name]: error,
		}));
	};

	// Validate all company fields
	const validateCompanyForm = () => {
		const newErrors = {};
		Object.keys(companyData).forEach((key) => {
			newErrors[key] = validateCompanyField(key, companyData[key]);
		});

		setCompanyErrors(newErrors);
		return !Object.values(newErrors).some((error) => error !== "");
	};

	//Hnadline edit the form from Verifying the email
	const handleBackToEditForm =() => {
		setIsFormValid(false);
		setCompanyFormValid(false);
		setCurrentStep(1);

	}

	const submitBidderDetails = async() =>{
		console.log("Bidder Details and OTP is verified");
		console.log("Now processign for the registration of the Bidder");
	    const generalInfoValid = formValidation();
    	const companyInfoValid = validateCompanyForm();
		console.log(companyInfoValid,generalInfoValid,otpVerified);
		if(companyInfoValid && generalInfoValid && otpVerified){
			console.log("Company, general and otp is verified according to the flags");
			const data = {
				generalInformation : {
					...formData
				},
				companyDetails : {
					...companyData
				}
			}
			console.log("Submission Data is : ",data);
			try{
				const response = await authService.bidderRegister(data);
				if(response.token){
				  localStorage.setItem('authToken',response.token);
				  alert("Successfully Registered as bidder");
				  window.location.href = "/";
				}
				else{
					setIsEmailVerified(false);
					setIsFormValid(false);
					setCompanyFormValid(false);
					throw new Error("Login ID Already Exist");

				}
			}catch(err){
				console.log("Error occured while registering user ",err.message);
				setErrors(prev=>({
					...prev,
					submit:err.message
				}));
				setIsEmailVerified(false);
				setIsFormValid(false);
				setCompanyFormValid(false);
				setCurrentStep(1);
			}
		}
	}
	console.log("Form Data is ",formData);
	const captchaRef = useRef();
  	const handleSubmit = async(e) => {
		console.log("FormData is ",formData);
		console.log("Comapny Data is ",companyData);
    // First validate both form sections
    // const generalInfoValid = formValidation();
    // const companyInfoValid = validateCompanyForm();
		const generalInfoValid = formValidation();
		const companyInfoValid = validateCompanyForm();
		
		// Update form validity state
		setIsFormValid(generalInfoValid);
		setCompanyFormValid(companyInfoValid);
		setIsEmailVerified(generalInfoValid);
	
		if (!generalInfoValid) {
		console.log(errors);
		alert('Please check General Information section for errors');
		return;
		}
	
		if (!companyInfoValid) {
		alert('Please check Company Information section for errors');
		return;
		}

		if(password!=confirmPassword){
			alert("Password and Confirm Password do not match");
			return;
		}
		
		// If form is valid, trigger the captcha validation
		if (generalInfoValid && companyInfoValid) {
		// This will trigger the existing handleCaptchaSubmit
			console.log("Data is valid, sending to next step");
			console.log(captchaRef);
			if(captchaRef.current){
				// let captchaValidation = captchaRef.current.handleCaptchaSubmit();
				if(true){
					const res = await authService.bidderRegister({generalInformation:{...formData},companyDetails:{...companyData}});
				}
				else{
					console.log("Captcha Is wrong");
				}
			}
		}
		else{
			alert("Form data is not valid");
			return false;
		}
    }

	useEffect(()=>{
		console.log("Otp verified State has been changed ",otpVerified);
	},[otpVerified]);
	return (
		<div className="flex justify-center items-center w-full min-h-full py-4 bg-gray-100">
			<div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-7xl w-full">
				{currentStep === 1 &&
				<div className="flex flex-wrap">
					<h2 className="w-full pt-3">Register as Bidder with Auction Hai</h2>

					{/* General Information Section */}
					<div className="w-full p-8 ml-4">
						<h2
							className="text-xl text-left font-semibold text-indigo-600"
							style={{ borderBottom: "5px double red" }}>
							General Information
						</h2>
						<div
							id="div-general-information"
							className="flex flex-col w-full h-full">
							<div className="flex w-full h-full">
								<div className="mb-2 mr-2 w-full">
									<label className="form-label">
										Login ID
									</label>
									<input
										type="email"
										name="loginId"
										value={formData.loginId}
										onChange={handleInputChange}
										className={`mt-1 block w-full border ${
											errors.loginId ? "border-red-500" : "border-gray-300"
										} rounded-md shadow-sm text-md p-2 focus:ring-indigo-500 focus:border-indigo-500`}
										placeholder="abc@nic.com"
									/>
									{errors.loginId && (
										<small className="text-red-500">{errors.loginId}</small>
									)}
									<small className="text-gray-500">
										Enter a valid email. This cannot be changed later.
									</small>
								</div>

								<div className="mb-2 mx-2 w-full">
									<label className="form-label">
										Correspondence Email
									</label>
									<input
										type="email"
										name="correspondenceEmail"
										value={formData.correspondenceEmail}
										onChange={handleInputChange}
										className={`mt-1 block w-full border ${
											errors.correspondenceEmail
												? "border-red-500"
												: "border-gray-300"
										} rounded-md shadow-sm text-md p-2 focus:ring-indigo-500 focus:border-indigo-500`}
										placeholder="abc@nic.com"
									/>
									{errors.correspondenceEmail && (
										<small className="text-red-500">
											{errors.correspondenceEmail}
										</small>
									)}
								</div>

								<div className="mb-2 mx-2 w-full">
									<div className="flex flex-col">
										<div id="div-mobile-number-label">
											<label className="form-label">
												Mobile No
											</label>
										</div>
										<div id="div-mobile-number" className="flex flex-row">
											<div
												id="div-mobile-number-country-code"
												className="w-1/3 pr-3">
												<select
													name="countryCode"
													value={formData.countryCode}
													onChange={handleInputChange}
													className="w-full h-[42px] bg-white mt-1 block border border-gray-300 rounded-md shadow-sm text-md p-2 focus:ring-indigo-500 focus:border-indigo-500">
													<option value="">-Select-</option>
													<option value="297">ABW (297)</option>
													<option value="93">AFG (93)</option>
													<option value="244">AGO (244)</option>
													<option value="355">ALB (355)</option>
													<option value="376">AND (376)</option>
													<option value="599">ANT (599)</option>
													<option value="54">ARG (54)</option>
													<option value="374">ARM (374)</option>
													<option value="672">ATA (672)</option>
													<option value="61">AUS (61)</option>
													<option value="43">AUT (43)</option>
													<option value="994">AZE (994)</option>
													<option value="257">BDI (257)</option>
													<option value="32">BEL (32)</option>
													<option value="229">BEN (229)</option>
													<option value="226">BFA (226)</option>
													<option value="880">BGD (880)</option>
													<option value="359">BGR (359)</option>
													<option value="973">BHR (973)</option>
													<option value="387">BIH (387)</option>
													<option value="375">BLR (375)</option>
													<option value="501">BLZ (501)</option>
													<option value="591">BOL (591)</option>
													<option value="55">BRA (55)</option>
													<option value="673">BRN (673)</option>
													<option value="975">BTN (975)</option>
													<option value="267">BWA (267)</option>
													<option value="236">CAF (236)</option>
													<option value="1">CAN (1)</option>
													<option value="672">CCK (672)</option>
													<option value="56">CHL (56)</option>
													<option value="86">CHN (86)</option>
													<option value="225">CIV (225)</option>
													<option value="237">CMR (237)</option>
													<option value="242">COG (242)</option>
													<option value="682">COK (682)</option>
													<option value="57">COL (57)</option>
													<option value="269">COM (269)</option>
													<option value="238">CPV (238)</option>
													<option value="506">CRI (506)</option>
													<option value="53">CUB (53)</option>
													<option value="61">CXR (61)</option>
													<option value="357">CYP (357)</option>
													<option value="420">CZE (420)</option>
													<option value="49">DEU (49)</option>
													<option value="253">DJI (253)</option>
													<option value="45">DNK (45)</option>
													<option value="213">DZA (213)</option>
													<option value="593">ECU (593)</option>
													<option value="20">EGY (20)</option>
													<option value="291">ERI (291)</option>
													<option value="372">EST (372)</option>
													<option value="251">ETH (251)</option>
													<option value="358">FIN (358)</option>
													<option value="679">FJI (679)</option>
													<option value="500">FLK (500)</option>
													<option value="33">FRA (33)</option>
													<option value="298">FRO (298)</option>
													<option value="241">GAB (241)</option>
													<option value="995">GEO (995)</option>
													<option value="233">GHA (233)</option>
													<option value="350">GIB (350)</option>
													<option value="224">GIN (224)</option>
													<option value="590">GLP (590)</option>
													<option value="220">GMB (220)</option>
													<option value="245">GNB (245)</option>
													<option value="240">GNQ (240)</option>
													<option value="30">GRC (30)</option>
													<option value="299">GRL (299)</option>
													<option value="502">GTM (502)</option>
													<option value="592">GUY (592)</option>
													<option value="852">HKG (852)</option>
													<option value="504">HND (504)</option>
													<option value="385">HRV (385)</option>
													<option value="509">HTI (509)</option>
													<option value="36">HUN (36)</option>
													<option value="62">IDN (62)</option>
													<option value="91">IND (91)</option>
													<option value="246">IOT (246)</option>
													<option value="353">IRL (353)</option>
													<option value="98">IRN (98)</option>
													<option value="964">IRQ (964)</option>
													<option value="354">ISL (354)</option>
													<option value="972">ISR (972)</option>
													<option value="39">ITA (39)</option>
													<option value="962">JOR (962)</option>
													<option value="81">JPN (81)</option>
													<option value="7">KAZ (7)</option>
													<option value="254">KEN (254)</option>
													<option value="996">KGZ (996)</option>
													<option value="855">KHM (855)</option>
													<option value="686">KIR (686)</option>
													<option value="82">KOR (82)</option>
													<option value="965">KWT (965)</option>
													<option value="961">LBN (961)</option>
													<option value="231">LBR (231)</option>
													<option value="218">LBY (218)</option>
													<option value="423">LIE (423)</option>
													<option value="266">LSO (266)</option>
													<option value="370">LTU (370)</option>
													<option value="352">LUX (352)</option>
													<option value="371">LVA (371)</option>
													<option value="853">MAC (853)</option>
													<option value="212">MAR (212)</option>
													<option value="377">MCO (377)</option>
													<option value="261">MDG (261)</option>
													<option value="960">MDV (960)</option>
													<option value="52">MEX (52)</option>
													<option value="692">MHL (692)</option>
													<option value="389">MKD (389)</option>
													<option value="223">MLI (223)</option>
													<option value="356">MLT (356)</option>
													<option value="95">MMR (95)</option>
													<option value="382">MNE (382)</option>
													<option value="976">MNG (976)</option>
													<option value="258">MOZ (258)</option>
													<option value="222">MRT (222)</option>
													<option value="1">USA (1)</option>
												</select>
											</div>
											<div id="div-id-mobile-number">
												<input
													type="text"
													name="mobileNumber"
													value={formData.mobileNumber}
													onChange={handleInputChange}
													placeholder="9876543210"
													className={`mt-1 block border ${
														errors.mobileNumber
															? "border-red-500"
															: "border-gray-300"
													} rounded-md shadow-md focus:ring-indigo-500 focus:border-indigo-500 p-2`}
												/>
												{errors.mobileNumber && (
													<small className="text-red-500">
														{errors.mobileNumber}
													</small>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="flex w-full h-full">
								<div className="flex mr-2 w-2/5">
									<div className="w-1/6">
										<label className="form-label">
											Title
										</label>
										<select
											name="title"
											value={formData.title}
											onChange={handleInputChange}
											className="mt-1 h-[42px] bg-white block w-full border border-gray-300 rounded-md shadow-sm text-md p-2 focus:ring-indigo-500 focus:border-indigo-500">
											<option value="">Select..</option>
											<option value="Mr">Mr</option>
											<option value="Mrs">Mrs</option>
											<option value="Ms">Ms</option>
											<option value="Dr">Dr</option>
											<option value="Shri">Shri</option>
										</select>
									</div>
									<div className="w-5/6 flex flex-col mx-2">
										<label className="form-label">
											Contact Name
										</label>
										<input
											type="text"
											name="contactName"
											value={formData.contactName}
											onChange={handleInputChange}
											placeholder="Anurag Mehar"
											className={`block w-full mt-1 p-2 text-md border ${
												errors.contactName
													? "border-red-500"
													: "border-gray-300"
											} rounded-md focus:ring-indigo-500 focus:border-indigo-500`}
										/>
										{errors.contactName && (
											<small className="text-red-500">
												{errors.contactName}
											</small>
										)}
									</div>
								</div>

								<div className="mx-2 w-2/5">
									<label className="form-label">
										Designation
									</label>
									<input
										type="text"
										name="designation"
										value={formData.designation}
										onChange={handleInputChange}
										className={`mt-1 block w-full border ${
											errors.designation ? "border-red-500" : "border-gray-300"
										} rounded-md shadow-sm text-md p-2 focus:ring-indigo-500 focus:border-indigo-500`}
										placeholder="Chief Technical Officer"
									/>
									{errors.designation && (
										<small className="text-red-500">{errors.designation}</small>
									)}
								</div>

								<div className="mx-2 w-1/5">
									<label className="form-label">
										Date of Birth
									</label>
									<input
										type="date"
										name="dateOfBirth"
										value={formData.dateOfBirth}
										onChange={handleInputChange}
										className={`mt-1 block w-full border ${
											errors.dateOfBirth ? "border-red-500" : "border-gray-300"
										} rounded-md shadow-sm text-md p-2 focus:ring-indigo-500 focus:border-indigo-500`}
									/>
								</div>
							</div>
						</div>
					</div>
					<div id="div-company-information" className="w-full px-8 pb-8 ml-4">
						<h2
							className="text-xl text-left font-semibold text-indigo-600"
							style={{ borderBottom: "5px double red" }}>
							Company Information
						</h2>
						<div
							id="div-company-information-card"
							className="flex flex-col w-full">
							<div className="flex w-full h-full">
								<div className="mx-2 w-2/5">
									<label className="form-label">
										Company Name
									</label>
									<input
										type="text"
										name="companyName"
										value={companyData.companyName}
										onChange={handleCompanyInputChange}
										className={`mt-1 block w-full border ${
											companyErrors.companyName
												? "border-red-500"
												: "border-gray-300"
										} rounded-md shadow-sm text-md p-2 focus:ring-indigo-500 focus:border-indigo-500`}
										placeholder="Enter company name"
									/>
									{companyErrors.companyName && (
										<small className="text-red-500">
											{companyErrors.companyName}
										</small>
									)}
								</div>

								<div className="mx-2 w-2/5">
									<label className="form-label">
										CIN
									</label>
									<input
										type="text"
										name="cin"
										value={companyData.cin}
										onChange={handleCompanyInputChange}
										className={`mt-1 block w-full border ${
											companyErrors.cin ? "border-red-500" : "border-gray-300"
										} rounded-md shadow-sm text-md p-2 focus:ring-indigo-500 focus:border-indigo-500`}
										placeholder="Enter CIN"
									/>
									{companyErrors.cin && (
										<small className="text-red-500">{companyErrors.cin}</small>
									)}
								</div>
								<div className="mx-2 w-1/5">
									<label className="block text-lg text-center font-medium text-gray-700">
										Preferential Bidder
									</label>
									<div className="flex flex-row justify-center">
										<div className="flex p-2">
											<label className="text-md">Yes</label>
											<input
												type="radio"
												name="preferentialBidder"
												value="yes"
												checked={companyData.preferentialBidder === "yes"}
												onChange={handleCompanyInputChange}
												className="mt-1 w-full m-1"
											/>
										</div>
										<div className="flex p-2">
											<label>No</label>
											<input
												type="radio"
												name="preferentialBidder"
												value="no"
												checked={companyData.preferentialBidder === "no"}
												onChange={handleCompanyInputChange}
												className="mt-1 w-full m-1"
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="flex w-full h-full pt-3">
								<div className="mx-2 w-2/5">
									<label className="text-lg font-medium text-left block text-gray-700">
										Registered Address
									</label>
									<textarea
										name="registeredAddress"
										value={companyData.registeredAddress}
										onChange={handleCompanyInputChange}
										className={`form-input text-md ${
											companyErrors.registeredAddress ? "border-red-500" : ""
										}`}></textarea>
									{companyErrors.registeredAddress && (
										<small className="text-red-500">
											{companyErrors.registeredAddress}
										</small>
									)}
								</div>
								<div className="mx-2 w-2/5">
									<label className="text-lg font-medium text-left block text-gray-700">
										Name Of Partners/Directors
									</label>
									<textarea
										name="partnersDirectors"
										value={companyData.partnersDirectors}
										onChange={handleCompanyInputChange}
										className={`form-input text-md ${
											companyErrors.partnersDirectors ? "border-red-500" : ""
										}`}></textarea>
									{companyErrors.partnersDirectors && (
										<small className="text-red-500">
											{companyErrors.partnersDirectors}
										</small>
									)}
								</div>
								{/* <div className="mx-2 w-1/5 h-full flex flex-col pt-4">
									<label className="block text-lg text-center font-medium text-gray-700">
										Foreign Company
									</label>
									<div className="flex flex-row h-full justify-center">
										<div className="flex p-2">
											<label className="text-md">Yes</label>
											<input
												type="radio"
												name="foreignCompany"
												value="yes"
												checked={companyData.foreignCompany === "yes"}
												onChange={handleCompanyInputChange}
												className="mt-1 w-full m-1"
											/>
										</div>
										<div className="flex p-2">
											<label>No</label>
											<input
												type="radio"
												name="foreignCompany"
												value="no"
												checked={companyData.foreignCompany === "no"}
												onChange={handleCompanyInputChange}
												className="mt-1 w-full m-1"
											/>
										</div>
									</div>
								</div> */}
							</div>
							<div className="flex w-full h-full pt-3">
								<div id="div-id-company-city" className="mx-2 w-1/3">
									<label className="form-label text-left">City</label>
									<input
										type="text"
										name="city"
										value={companyData.city}
										onChange={handleCompanyInputChange}
										className={`form-input text-md ${
											companyErrors.city ? "border-red-500" : ""
										}`}
									/>
									{companyErrors.city && (
										<small className="text-red-500">{companyErrors.city}</small>
									)}
								</div>
								<div id="div-id-company-state" className="mx-2 w-1/3">
									<label className="form-label text-left">State</label>
									<input
										type="text"
										name="state"
										value={companyData.state}
										onChange={handleCompanyInputChange}
										className={`form-input text-md ${
											companyErrors.state ? "border-red-500" : ""
										}`}
									/>
									{companyErrors.state && (
										<small className="text-red-500">
											{companyErrors.state}
										</small>
									)}
								</div>
								<div id="div-id-company-postal-code" className="mx-2 w-1/3">
									<label className="form-label text-left">Postal Code</label>
									<input
										type="text"
										name="postalCode"
										value={companyData.postalCode}
										onChange={handleCompanyInputChange}
										className={`form-input text-md ${
											companyErrors.postalCode ? "border-red-500" : ""
										}`}
										maxLength="6"
									/>
									{companyErrors.postalCode && (
										<small className="text-red-500">
											{companyErrors.postalCode}
										</small>
									)}
								</div>
							</div>
							<div className="flex w-full h-full pt-3">
								<div id="div-id-company-pan" className="mx-2 w-1/3">
									<label className="form-label text-left">
										PAN/TAN or Temporary Number
									</label>
									<input
										type="text"
										name="panNumber"
										value={companyData.panNumber}
										onChange={handleCompanyInputChange}
										className={`form-input text-md ${
											companyErrors.panNumber ? "border-red-500" : ""
										}`}
										maxLength="10"
									/>
									{companyErrors.panNumber && (
										<small className="text-red-500">
											{companyErrors.panNumber}
										</small>
									)}
								</div>
								<div id="div-id-company-starting_year" className="mx-2 w-1/3">
									<label className="form-label text-left">
										Establishment Year
									</label>
									<select
										name="establishmentYear"
										value={companyData.establishmentYear}
										onChange={handleCompanyInputChange}
										className={`form-input text-md bg-white ${
											companyErrors.establishmentYear ? "border-red-500" : ""
										}`}>
										<option value="">-Select Year-</option>
										{Array.from({ length: 226 }, (_, i) => 1800 + i).map(
											(year) => (
												<option key={year} value={year}>
													{year}
												</option>
											)
										)}
									</select>
									{companyErrors.establishmentYear && (
										<small className="text-red-500">
											{companyErrors.establishmentYear}
										</small>
									)}
								</div>
								<div
									id="div-id-company-nature_of_buisness"
									className="mx-2 w-1/3">
									<label className="form-label text-left">
										Nature of Business
									</label>
									<input
										type="text"
										name="natureOfBusiness"
										value={companyData.natureOfBusiness}
										onChange={handleCompanyInputChange}
										className={`form-input text-md ${
											companyErrors.natureOfBusiness ? "border-red-500" : ""
										}`}
									/>
									{companyErrors.natureOfBusiness && (
										<small className="text-red-500">
											{companyErrors.natureOfBusiness}
										</small>
									)}
								</div>
							</div>
							<div className="flex w-full h-full pt-3">
								<div id="div-id-company-legal_status" className="mx-2 w-1/3">
									<label className="form-label text-left">Legal Status</label>
									<select
										name="legalStatus"
										value={companyData.legalStatus}
										onChange={handleCompanyInputChange}
										className={`form-input text-md bg-white ${
											companyErrors.legalStatus ? "border-red-500" : ""
										}`}>
										<option value="0">-Select-</option>
										<option value="1">Limited Company</option>
										<option value="2">Undertaking</option>
										<option value="3">Jointventure</option>
										<option value="4">Partnership</option>
										<option value="5">Others</option>
									</select>
									{companyErrors.legalStatus && (
										<small className="text-red-500">
											{companyErrors.legalStatus}
										</small>
									)}
								</div>
								<div id="div-id-company-category" className="mx-2 w-1/3">
									<label className="form-label text-left">
										Company Category
									</label>
									<select
										name="companyCategory"
										value={companyData.companyCategory}
										onChange={handleCompanyInputChange}
										className={`form-input text-md bg-white ${
											companyErrors.companyCategory ? "border-red-500" : ""
										}`}>
										<option value="0">-Select-</option>
										<option value="1">Micro Unit as per MSME</option>
										<option value="2">Small Unit as per MSME</option>
										<option value="3">Medium Unit as per MSME</option>
										<option value="4">Ancillary Unit</option>
										<option value="5">
											Project Affected Person of this Company
										</option>
										<option value="6">SSI</option>
										<option value="7">Others</option>
									</select>
									{companyErrors.companyCategory && (
										<small className="text-red-500">
											{companyErrors.companyCategory}
										</small>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				}
				{currentStep === 1 &&
				<div id="div-captcha-validation" className="flex w-full pt-1 px-8">
					<div className="flex flex-row w-full">
						<CaptchaValidation ref={captchaRef} />
						<div className="flex flex-col w-1/2 items-center">
							<div className="w-2/3">
								<label className="form-label text-left">Password</label>
								<input
								type="password"
								className="form-input text-md"
								name="password"
								value={formData.password}
								onChange={handlePasswordChange}
								/>
							</div>

							<div className="w-2/3 pt-2">
								<label className="form-label text-left">Confirm Password</label>
								<input
								type="password"
								className="form-input text-md"
								name="confirmPassword"
								value={confirmPassword}
								onChange={handleConfirmPasswordChange}
								/>
							</div>
							{passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
						</div>
					</div>
				</div>
				}
				{currentStep === 1 &&
				<div className="w-full items-end">
					<button
						className="py-2 px-6 my-4 border border-solid border-black hover:bg-gray-600 transition-colors duration-300"
						onClick={handleSubmit}>
						Submit
					</button>
				</div>
				}
				
				{/* Heer is the Email authentication Page */}
				{currentStep === 2 && 	
					<div className="w-full h-full flex flex-col items-center">
						<h2 className="text-2xl p-2">Verify Your Email</h2>
						<div className="px-4">
							<div>
								<p>Kindly enter the OTP send on the Correspondence Email submit on Registration Form</p>
								<div className="flex-row">

									< OTPVerification onVerify={submitBidderDetails} setOtpVerified={setOtpVerified} data={{"email":formData.correspondenceEmail,"loginId":formData.loginId}}/>
									<div>
										<button className="m-3 p-2 right-0 border border-solid rounded-xl bg-gray-200 hover:bg-gray-500" onClick={handleBackToEditForm}>
											Edit Data. Go Back
										</button>
									</div>
								</div>
							</div>

						</div>

					</div>
				}
				
			</div>
		</div>
	);
}

export default SignUpPageTailwind;
