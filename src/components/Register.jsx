import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ProgressBar from "./ProgressBar";
import Step from "./Step";
import "../components/Register.css";
// import { FaCalendarAlt } from "react-icons/fa";
// import CustomDatePickerInput from "../components/CustomDatePickerInput ";
import { updateFormData } from "../reducers/formSlice";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
// import { ref } from "firebase";
import "../components/Register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const totalSteps = 3;
  // const datePickerRef = useRef(null);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const navigate = useNavigate();
  if (!formData) {
    return null;
  }
  // const handleDateIconClick = () => {
  //   datePickerRef.current.setOpen(true);
  // };

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  // const handleFormChange = (step, field, value) => {
  //   dispatch(updateFormData({ step, field, value }));
  // };
  const handleFormChange = (step, field, value) => {
    dispatch(updateFormData({ step: step, field: field, value: value }));
  };
  const handleGoToLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async () => {
    const userCreadential = await createUserWithEmailAndPassword(
      auth,
      formData.step3.mailId,
      formData.step3.password
    );
    const user = userCreadential.user;
    navigate("/");
  };

  const renderFormStep = (stepNumber) => {
    return (
      <Step isVisible={currentStep === stepNumber}>
        {stepNumber === 1 && (
          <div>
            <input
              type="text"
              value={formData.step1.state}
              onChange={(e) =>
                handleFormChange("step1", "state", e.target.value)
              }
              placeholder="STATE"
            />
            <select
              value={formData.step1.district}
              onChange={(e) =>
                handleFormChange("step1", "district", e.target.value)
              }
            >
              <option value="">SELECT DISTRICT</option>
              <option value="district1">AHMEDNAGAR</option>
              <option value="district2">AKOLA</option>
              <option value="district3">AMRAVATI</option>
              <option value="district4">CHATRAPATI SAMBHAJI NAGAR</option>
              <option value="district5">BEED</option>
              <option value="district6">BHANDARA</option>
              <option value="district7">CHANDRAPUR</option>
              <option value="district8">DHULE</option>
              <option value="district9">GADCHIROLI</option>
              <option value="district10">GONDIA</option>
              <option value="district11">HINGOLI</option>
              <option value="district12">JALGAON</option>
              <option value="district13">JALNA</option>
              <option value="district14">KOLHAPUR</option>
              <option value="district15">LATUR</option>
              <option value="district17">MUMBAI CITY</option>
              <option value="district18">MUMBAI SUBURBAN</option>
              <option value="district19">NAGPUR</option>
              <option value="district20">NANDED</option>
              <option value="district21">NANDURBAR</option>
              <option value="district22">NASHIK</option>
              <option value="district23">DHARASHIV</option>
              <option value="district24">PALGHAR</option>
              <option value="district25">PARBHANI</option>
              <option value="district26">PUNE</option>
              <option value="district27">RAIGAD</option>
              <option value="district28">RATNAGIRI</option>
              <option value="district29">SANGLI</option>
              <option value="district30">SATARA</option>
              <option value="district31">SINDHUDURG</option>
              <option value="district32">SOLAPUR</option>
              <option value="district33">THANE</option>
              <option value="district34">WARDHA</option>
              <option value="district35">WASHIM</option>
              <option value="district36">YAVATMAL</option>
            </select>
            <input
              type="text"
              value={formData.step1.tashil}
              onChange={(e) =>
                handleFormChange("step1", "tashil", e.target.value)
              }
              placeholder="TAHSIL "
            />
            <input
              type="text"
              value={formData.step1.village}
              onChange={(e) =>
                handleFormChange("step1", "village", e.target.value)
              }
              placeholder="VILLEGE "
            />
            <input
              type="text"
              value={formData.step1.primary}
              onChange={(e) =>
                handleFormChange("step1", "primary", e.target.value)
              }
              placeholder="SCHOOL NAME"
            />
            <select
              value={formData.step1.class}
              onChange={(e) =>
                handleFormChange("step1", "class", e.target.value)
              }
            >
              <option value="">SELECT CLASS</option>
              <option value="class1">STD 1st</option>
              <option value="class1">STD 2nd</option>
              <option value="class1">STD 3rd</option>
              <option value="class1">STD 4th</option>
              <option value="class2">STD 5th</option>
            </select>

            <input
              type="text"
              value={formData.step1.refrance}
              onChange={(e) =>
                handleFormChange("step1", "refrance", e.target.value)
              }
              placeholder="REFRANCE CODE "
            />
          </div>
        )}

        {stepNumber === 2 && (
          <div>
            <input
              type="text"
              value={formData.step2.studentName}
              onChange={(e) =>
                handleFormChange("step2", "studentName", e.target.value)
              }
              placeholder="STUDANT NAME"
            />
            <input
              type="text"
              value={formData.step2.address}
              onChange={(e) =>
                handleFormChange("step2", "address", e.target.value)
              }
              placeholder="ADDRESS "
            />
            <input
              type="text"
              value={formData.step2.fatherName}
              onChange={(e) =>
                handleFormChange("step2", "fatherName", e.target.value)
              }
              placeholder="FATHER NAME"
            />
            <input
              type="text"
              value={formData.step2.motherName}
              onChange={(e) =>
                handleFormChange("step2", "motherName", e.target.value)
              }
              placeholder="MOTHER NAME"
            />
            {/* <DatePicker
              selected={
                formData.step2.dob ? new Date(formData.step2.dob) : null
              }
              onChange={(date) => handleFormChange("step2", "dob", date)}
              placeholderText="Select Date of Birth"
              dateFormat="yyyy-MM-dd"
              customInput={
                <CustomDatePickerInput
                  value={formData.step2.dob}
                  onClick={handleDateIconClick}
                  inputRef={datePickerRef}
                />
              }
            /> */}

            <select
              value={formData.step2.bloodGroup}
              onChange={(e) =>
                handleFormChange("step2", "bloodGroup", e.target.value)
              }
            >
              <option value="">BLOOD GROUP</option>
              <option value="bloodGroup1">A+</option>
              <option value="bloodGroup2">A-</option>
              <option value="bloodGroup3">B+</option>
              <option value="bloodGroup4">A+</option>
              <option value="bloodGroup5">B-</option>
              <option value="bloodGroup6">O+</option>
              <option value="bloodGroup7">O-</option>
              <option value="bloodGroup8">AB+</option>
              <option value="bloodGroup9">AB-</option>
            </select>
            <input
              type="text"
              value={formData.step2.mobileNo}
              onChange={(e) =>
                handleFormChange("step2", "mobileNo", e.target.value)
              }
              placeholder="MOBILE NO"
            />
            {/* <input
              type="text"
              value={formData.step2.mailId}
              onChange={(e) =>
                handleFormChange("step2", "mailId", e.target.value)
              }
              placeholder="MAIL ID"
            />
            <input
              type="text"
              value={formData.step2.password}
              onChange={(e) =>
                handleFormChange("step2", "password", e.target.value)
              }
              placeholder="PASSWORD"
            /> */}
          </div>
        )}

        {stepNumber === 3 && (
          <div>
            {/* <select
              value={formData.step3.fathersBussinessProfile}
              onChange={(e) =>
                handleFormChange(
                  "step3",
                  "fathersBussinessProfile",
                  e.target.value
                )
              }
            >
              <option value="">FATHER BUSINESS PROFILE</option>
              <option value="fathersBussinessProfile1">FARMAR</option>
              <option value="fathersBussinessProfile2">EMPLEEYEE</option>
              <option value="fathersBussinessProfile3">BUSINESS PERSON</option>
            </select>
            <input
              type="text"
              value={formData.step3.fatherEducation}
              onChange={(e) =>
                handleFormChange("step3", "fatherEducation", e.target.value)
              }
              placeholder="FATHER EDUCATION"
            />
            <input
              type="text"
              value={formData.step3.motherEducation}
              onChange={(e) =>
                handleFormChange("step3", "motherEducation", e.target.value)
              }
              placeholder="MOTHER EDUCATION"
            /> */}
            <input
              type="text"
              value={formData.step3.mailId}
              onChange={(e) =>
                handleFormChange("step3", "mailId", e.target.value)
              }
              placeholder="MAIL ID"
            />
            <input
              type="text"
              value={formData.step3.password}
              onChange={(e) =>
                handleFormChange("step3", "password", e.target.value)
              }
              placeholder="PASSWORD"
            />
          </div>
        )}
      </Step>
    );
  };

  return (
    <div className="container">
      <div className="step-form">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        {renderFormStep(1)}
        {renderFormStep(2)}
        {renderFormStep(3)}

        <div className="buttons">
          {currentStep === 1 && (
            <div className="login-link">
              <button onClick={handleGoToLogin}>GO LOGIN</button>
            </div>
          )}
          {currentStep > 1 && (
            <button onClick={handlePrevious}>PREVIOUS</button>
          )}
          {currentStep < totalSteps ? (
            <button onClick={handleNext}>NEXT</button>
          ) : (
            <button onClick={handleSubmit}>SUBMIT</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
