import React, { useState } from "react";
import CaptchaValidation from "../../features/auth/captcha";

function SignUpPageTailwind() {
  const [isFormValid, setIsFormValid] = useState(false);
	const [formData, setFormData] = useState({
		loginId: "",
		correspondenceEmail: "",
		countryCode: "",
		mobileNumber: "",
		title: "",
		contactName: "",
		designation: "",
		dateOfBirth: "",
	});

	// State for validation errors
	const [errors, setErrors] = useState({
		loginId: "",
		correspondenceEmail: "",
		mobileNumber: "",
		contactName: "",
		designation: "",
		dateOfBirth: "",
	});

	// Email validation regex
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Mobile number validation regex (assuming 10 digits)
	const mobileRegex = /^\d{10}$/;

	// Validation functions
	const validateEmail = (email) => {
		if (!email) return "Email is required";
		if (!emailRegex.test(email)) return "Invalid email format";
		return "";
	};

	const validateMobile = (mobile) => {
		if (!mobile) return "Mobile number is required";
		if (!mobileRegex.test(mobile)) return "Mobile number must be 10 digits";
		return "";
	};

	const validateRequired = (value, fieldName) => {
		if (!value) return `${fieldName} is required`;
		return "";
	};

	// Handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
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
		};

		setErrors(newErrors);

		// Check if there are any errors
		return !Object.values(newErrors).some((error) => error !== "");
	};

	//Company Details Validation
	const [companyData, setCompanyData] = useState({
		companyName: "",
		cin: "",
		preferentialVendor: "",
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

  const handleSubmit = () => {
    // First validate both form sections
    const generalInfoValid = formValidation();
    const companyInfoValid = validateCompanyForm();
    
    // Update form validity state
    setIsFormValid(generalInfoValid && companyInfoValid);
  
    if (!generalInfoValid) {
      alert('Please check General Information section for errors');
      return;
    }
  
    if (!companyInfoValid) {
      alert('Please check Company Information section for errors');
      return;
    }
  
    // If form is valid, trigger the captcha validation
    if (generalInfoValid && companyInfoValid) {
      // This will trigger the existing handleCaptchaSubmit
      document.querySelector('[data-captcha-submit]')?.click();
	  
    }
  };

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl w-full">
				<div className="flex flex-wrap">
					<h2 className="w-full pt-3">Register As Vendor With Auction Hai</h2>

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
													<option value="0">-Select-</option>
													<option value="1">ABW (297)</option>
													<option value="2">AFG (93)</option>
													<option value="3">AGO (244)</option>
													<option value="4">ALB (355)</option>
													<option value="5">AND (376)</option>
													<option value="6">ANT (599)</option>
													<option value="7">ARG (54)</option>
													<option value="8">ARM (374)</option>
													<option value="9">ATA (672)</option>
													<option value="10">AUS (61)</option>
													<option value="11">AUT (43)</option>
													<option value="12">AZE (994)</option>
													<option value="13">BDI (257)</option>
													<option value="14">BEL (32)</option>
													<option value="15">BEN (229)</option>
													<option value="16">BFA (226)</option>
													<option value="17">BGD (880)</option>
													<option value="18">BGR (359)</option>
													<option value="19">BHR (973)</option>
													<option value="20">BIH (387)</option>
													<option value="21">BLR (375)</option>
													<option value="22">BLZ (501)</option>
													<option value="23">BOL (591)</option>
													<option value="24">BRA (55)</option>
													<option value="25">BRN (673)</option>
													<option value="26">BTN (975)</option>
													<option value="27">BWA (267)</option>
													<option value="28">CAF (236)</option>
													<option value="29">CAN (1)</option>
													<option value="30">CCK (672)</option>
													<option value="31">CHL (56)</option>
													<option value="32">CHN (86)</option>
													<option value="33">CIV (225)</option>
													<option value="34">CMR (237)</option>
													<option value="35">COG (242)</option>
													<option value="36">COK (682)</option>
													<option value="37">COL (57)</option>
													<option value="38">COM (269)</option>
													<option value="39">CPV (238)</option>
													<option value="40">CRI (506)</option>
													<option value="41">CUB (53)</option>
													<option value="42">CXR (61)</option>
													<option value="43">CYP (357)</option>
													<option value="44">CZE (420)</option>
													<option value="45">DEU (49)</option>
													<option value="46">DJI (253)</option>
													<option value="47">DNK (45)</option>
													<option value="48">DZA (213)</option>
													<option value="49">ECU (593)</option>
													<option value="50">EGY (20)</option>
													<option value="51">ERI (291)</option>
													<option value="52">EST (372)</option>
													<option value="53">ETH (251)</option>
													<option value="54">FIN (358)</option>
													<option value="55">FJI (679)</option>
													<option value="56">FLK (500)</option>
													<option value="57">FRA (33)</option>
													<option value="58">FRO (298)</option>
													<option value="59">GAB (241)</option>
													<option value="60">GEO (995)</option>
													<option value="61">GHA (233)</option>
													<option value="62">GIB (350)</option>
													<option value="63">GIN (224)</option>
													<option value="64">GLP (590)</option>
													<option value="65">GMB (220)</option>
													<option value="66">GNB (245)</option>
													<option value="67">GNQ (240)</option>
													<option value="68">GRC (30)</option>
													<option value="69">GRL (299)</option>
													<option value="70">GTM (502)</option>
													<option value="71">GUY (592)</option>
													<option value="72">HKG (852)</option>
													<option value="73">HND (504)</option>
													<option value="74">HRV (385)</option>
													<option value="75">HTI (509)</option>
													<option value="76">HUN (36)</option>
													<option value="77">IDN (62)</option>
													<option value="78">IND (91)</option>
													<option value="79">IOT (246)</option>
													<option value="80">IRL (353)</option>
													<option value="81">IRN (98)</option>
													<option value="82">IRQ (964)</option>
													<option value="83">ISL (354)</option>
													<option value="84">ISR (972)</option>
													<option value="85">ITA (39)</option>
													<option value="86">JOR (962)</option>
													<option value="87">JPN (81)</option>
													<option value="88">KAZ (7)</option>
													<option value="89">KEN (254)</option>
													<option value="90">KGZ (996)</option>
													<option value="91">KHM (855)</option>
													<option value="92">KIR (686)</option>
													<option value="93">KOR (82)</option>
													<option value="94">KWT (965)</option>
													<option value="95">LBN (961)</option>
													<option value="96">LBR (231)</option>
													<option value="97">LBY (218)</option>
													<option value="98">LIE (423)</option>
													<option value="99">LSO (266)</option>
													<option value="100">LTU (370)</option>
													<option value="101">LUX (352)</option>
													<option value="102">LVA (371)</option>
													<option value="103">MAC (853)</option>
													<option value="104">MAR (212)</option>
													<option value="105">MCO (377)</option>
													<option value="106">MDG (261)</option>
													<option value="107">MDV (960)</option>
													<option value="108">MEX (52)</option>
													<option value="109">MHL (692)</option>
													<option value="110">MKD (389)</option>
													<option value="111">MLI (223)</option>
													<option value="112">MLT (356)</option>
													<option value="113">MMR (95)</option>
													<option value="114">MNE (382)</option>
													<option value="115">MNG (976)</option>
													<option value="116">MOZ (258)</option>
													<option value="117">MRT (222)</option>
													<option value="118">MTQ (596)</option>
													<option value="119">MUS (230)</option>
													<option value="120">MWI (265)</option>
													<option value="121">MYS (60)</option>
													<option value="122">MYT (269)</option>
													<option value="123">NAM (264)</option>
													<option value="124">NCL (687)</option>
													<option value="125">NER (227)</option>
													<option value="126">NGA (234)</option>
													<option value="127">NIC (505)</option>
													<option value="128">NIU (683)</option>
													<option value="129">NLD (31)</option>
													<option value="130">NOR (47)</option>
													<option value="131">NPL (977)</option>
													<option value="132">NRU (674)</option>
													<option value="133">NZL (64)</option>
													<option value="134">OMN (968)</option>
													<option value="135">PAK (92)</option>
													<option value="136">PAN (507)</option>
													<option value="137">PCN (64)</option>
													<option value="138">PER (51)</option>
													<option value="139">PHL (63)</option>
													<option value="140">PLW (680)</option>
													<option value="141">PNG (675)</option>
													<option value="142">POL (48)</option>
													<option value="143">PRT (351)</option>
													<option value="144">PRY (595)</option>
													<option value="145">QAT (974)</option>
													<option value="146">REU (262)</option>
													<option value="147">ROM (40)</option>
													<option value="148">RUS (70)</option>
													<option value="149">RWA (250)</option>
													<option value="150">SAU (966)</option>
													<option value="151">SEN (221)</option>
													<option value="152">SLV (503)</option>
													<option value="153">SMR (378)</option>
													<option value="154">SRB (381)</option>
													<option value="155">STP (239)</option>
													<option value="156">TCD (235)</option>
													<option value="157">TLS (670)</option>
													<option value="158">USA (1)</option>
													<option value="159">WSM (684)</option>
													<option value="160">XKX (383)</option>
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
											<option value="0">Select..</option>
											<option value="1">Mr</option>
											<option value="2">Mrs</option>
											<option value="3">Ms</option>
											<option value="4">Dr</option>
											<option value="5">Shri</option>
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
										Preferential Vendor
									</label>
									<div className="flex flex-row justify-center">
										<div className="flex p-2">
											<label className="text-md">Yes</label>
											<input
												type="radio"
												name="preferentialVendor"
												value="yes"
												checked={companyData.preferentialVendor === "yes"}
												onChange={handleCompanyInputChange}
												className="mt-1 w-full m-1"
											/>
										</div>
										<div className="flex p-2">
											<label>No</label>
											<input
												type="radio"
												name="preferentialVendor"
												value="no"
												checked={companyData.preferentialVendor === "no"}
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
				<div id="div-captcha-validation" className="flex w-full pt-1 px-8">
					<CaptchaValidation />
				</div>
				<div className="w-full items-end">
					<button
						className="py-2 px-6 my-4 border border-solid border-black hover:bg-gray-600 transition-colors duration-300"
						onClick={handleSubmit}>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}

export default SignUpPageTailwind;
