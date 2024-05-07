import React, { useState } from "react";
import Navebar from "../Components/Navebar";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDb } from "../Firebase/FirebaseConfig";
import { useNavigate } from "react-router";

const DigitialMarketingForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    dob: "",
    contact: "",
    email: "",
    aadharNumber: "",
    totalPayments: 0,
    paymentPaid: 0,
    remainingPayment: 0,
    photo: null,
    photoUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { photo, ...formDataWithoutPhoto } = formData;

      const docRef = await addDoc(
        collection(fireDb, "studentDataForms"),
        formDataWithoutPhoto
      );

      if (formData.photo) {
        const storageRef = ref(getStorage());
        const photoRef = ref(storageRef, `${docRef.id}/${formData.photo.name}`);
        await uploadBytes(photoRef, formData.photo);

        // Get the download URL of the uploaded photo
        const photoUrl = await getDownloadURL(photoRef);

        // Update Firestore document with photo URL
        await updateDoc(doc(fireDb, "studentDataForms", docRef.id), {
          photoUrl: photoUrl,
        });

        // Update the formData state with the photo URL
        setFormData((prevState) => ({
          ...prevState,
          photoUrl: photoUrl,
        }));
      }

      // Calculate remaining payment
      const remainingPayment = formData.totalPayments - formData.paymentPaid;

      // Update Firestore document with remaining payment
      await updateDoc(doc(fireDb, "studentDataForms", docRef.id), {
        remainingPayment: remainingPayment,
      });

      // Clear form data after submission
      setFormData({
        username: "",
        dob: "",
        contact: "",
        email: "",
        aadharNumber: "",
        totalPayments: 0,
        paymentPaid: 0,
        remainingPayment: remainingPayment, // Set remaining payment to calculated value
        photo: null,
        photoUrl: "",
      });

      // Show success message
      toast.success("Form data submitted successfully!");
      navigate("/viewdata");
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Show error message
      toast.error("Failed to submit form data. Please try again.");
    }
  };

  const handleImageUpload = (e) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const calculateRemainingPayment = () => {
    const remaining = formData.totalPayments - formData.paymentPaid;
    return remaining >= 0 ? remaining : 0;
  };
  return (
    <>
      <div className="flex container bg-[rgb(181,181,181)] h-screen">
        <Navebar />
        <div className="grid grid-cols-2 gap-8 m-auto container w-[65%] bg-white rounded-xl git">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h1 className="text-center font-serif font-bold text-4xl">
              Digital Marketing Data
            </h1>
            <form onSubmit={handleSubmit}>
              {/* Your provided form content */}
              <div className="space-y-12">
                {/* Profile Section */}
                <div className="border-b border-gray-900/10 pb-12">
                  {/* <div>
                    <label
                      htmlFor="image"
                      className="block mb-2 text-sm font-medium text-gray-600"
                    >
                      Image Upload
                    </label>
                    <div className="flex items-center justify-between">
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        id="image"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="image"
                        className="flex items-center justify-center w-[50%] h-[50%] p-5 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-500"
                      >
                        {formData.photo ? (
                          <img
                            src={URL.createObjectURL(formData.photo)}
                            alt="Uploaded"
                            className="max-h-[6rem] max-w-[6rem] object-cover"
                          />
                        ) : (
                          <span className="text-gray-500">Select Image</span>
                        )}
                      </label>
                    </div>
                  </div> */}

                  {/* Username */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name of Client
                    </label>
                    <div className="mt-2">
                      <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="username"
                          className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Full Name"
                          value={formData.username}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Business Name */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="businessname"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Business Name
                    </label>
                    <div className="mt-2">
                      <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="businessname"
                          id="businessname"
                          autoComplete="businessname"
                          className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Name of Business"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* DOB */}
                  {/* <div className="sm:col-span-4">
                    <label
                      htmlFor="dob"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Date of Birth
                    </label>
                    <div className="mt-2">
                      <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="date" // Set type as "date"
                          name="dob"
                          id="dob"
                          autoComplete="bday"
                          className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="DD-MM-YYYY"
                          value={formData.dob}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div> */}

                  {/* number */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="contact"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Contact Number
                    </label>
                    <div className="mt-2">
                      <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="number"
                          name="contact"
                          id="contact"
                          autoComplete="tel"
                          className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Contact Number"
                          value={formData.contact}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* email */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email Address
                    </label>
                    <div className="mt-2">
                      <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
                          className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* status */}
                  {/* <div className="sm:col-span-4">
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Status
                    </label>
                    <div className="mt-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="converted"
                          name="status"
                          value="converted"
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          checked={formData.status === "converted"}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="converted"
                          className="ml-2 block text-sm leading-5 text-gray-900"
                        >
                          Ready
                        </label>
                      </div>
                      <div className="flex items-center mt-2">
                        <input
                          type="radio"
                          id="non-converted"
                          name="status"
                          value="non-converted"
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                          checked={formData.status === "non-converted"}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="non-converted"
                          className="ml-2 block text-sm leading-5 text-gray-900"
                        >
                          On-Hold
                        </label>
                      </div>
                    </div>
                  </div> */}

                  {/* remarks */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="remarks"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Remarks
                    </label>
                    <div className="mt-2">
                      <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="remarks"
                          id="remarks"
                          autoComplete="remarks"
                          className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Add a remark"
                          value={formData.username}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="block w-full py-3 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h1 className="text-center font-serif font-bold text-4xl">
              Payment
            </h1>
            <div className="space-y-12 py-10">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="totalPayments"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Total Payments
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="totalPayments"
                      id="totalPayments"
                      className="block w-full border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-lg"
                      placeholder="Total Payments"
                      value={formData.totalPayments}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="paymentPaid"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Payment Paid
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="paymentPaid"
                      id="paymentPaid"
                      className="block w-full border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-lg"
                      placeholder="Payment Paid"
                      value={formData.paymentPaid}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="remainingPayment"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Remaining Payment
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="remainingPayment"
                      id="remainingPayment"
                      className="block w-full border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 rounded-lg"
                      placeholder="Remaining Payment"
                      value={calculateRemainingPayment()}
                      readOnly // Disable user input
                    />
                  </div>
                </div>

                 
                  {/* converted date */}
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="doc"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Start Date
                    </label>
                    <div className="mt-2">
                      <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="date" // Set type as "date"
                          name="doc"
                          id="doc"
                          autoComplete="bday"
                          className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="DD-MM-YYYY"
                          value={formData.dob}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* End date */}
                  <div className="sm:col-span-4">
  <label
    htmlFor="doc"
    className="block text-sm font-medium leading-6 text-gray-900"
  >
     End date
  </label>
  <div className="mt-2">
    <div className="flex items-center">
      <input
        type="radio"
        id="present"
        name="startDateOption"
        value="present"
        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
        checked={formData.startDateOption === "present"}
        onChange={handleChange}
      />
      <label
        htmlFor="present"
        className="ml-2 block text-sm leading-5 text-gray-900"
      >
        Present
      </label>
    </div>
    <div className="flex items-center mt-2">
      <input
        type="radio"
        id="choose-date"
        name="startDateOption"
        value="choose-date"
        className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
        checked={formData.startDateOption === "choose-date"}
        onChange={handleChange}
      />
      <label
        htmlFor="choose-date"
        className="ml-2 block text-sm leading-5 text-gray-900"
      >
        Choose Date
      </label>
      {formData.startDateOption === "choose-date" && (
        <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
          <input
            type="date"
            name="doc"
            id="doc"
            autoComplete="bday"
            className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
            placeholder="DD-MM-YYYY"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  </div>
</div>
                

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitialMarketingForm;
