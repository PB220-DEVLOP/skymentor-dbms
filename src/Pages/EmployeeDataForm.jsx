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

const EmployeeDataForm = () => {
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [identificationType, setIdentificationType] = useState("PAN");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    photo: null,
    photoUrl: "",
    name: "",
    dob: "",
    contact: "",
    email: "",
    identificationType: "PAN",
    identificationNumber: "",
    status: "employee",
    post: "",
    employmentStatus: "currentlyWorking",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Update identificationNumber and identificationType state
    if (name === "identificationNumber") {
      setIdentificationNumber(value);
    } else if (name === "identificationType") {
      setIdentificationType(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { photo, ...formDataWithoutPhoto } = formData;

      const docRef = await addDoc(
        collection(fireDb, "EmployeeDataForm"),
        formDataWithoutPhoto
      );

      let photoUrl = "";

      if (photo) {
        const storageRef = ref(getStorage());
        const photoRef = ref(storageRef, `${docRef.id}/${photo.name}`);
        await uploadBytes(photoRef, photo);

        photoUrl = await getDownloadURL(photoRef);

        await updateDoc(doc(fireDb, "EmployeeDataForm", docRef.id), {
          photoUrl: photoUrl,
        });

        setFormData((prevState) => ({
          ...prevState,
          photoUrl: photoUrl,
        }));
      }

      // Update Firestore document with identificationType and identificationNumber
      await updateDoc(doc(fireDb, "EmployeeDataForm", docRef.id), {
        identificationType: formData.identificationType,
        identificationNumber: formData.identificationNumber,
      });

      // Clear form data after submission
      setFormData({
        photo: null,
        photoUrl: "",
        name: "",
        dob: "",
        contact: "",
        email: "",
        identificationType: "PAN",
        identificationNumber: "",
        status: "employee",
        post: "",
        employmentStatus: "currentlyWorking",
      });

      // Show success message
      toast.success("Form data submitted successfully!");
      navigate("/viewEmployeData");
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

  return (
    <>
      <div className="flex container bg-[rgb(181,181,181)] h-screen">
        <Navebar />
        <div className="grid grid-cols-2 gap-8 m-auto container w-[65%] bg-white rounded-xl git">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h1 className="text-center font-serif font-bold text-4xl">
              Employee Data
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div>
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
                        required
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
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name of Employee/Intern
                    </label>
                    <div className="mt-2">
                      <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="name"
                          className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Full Name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="dob"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Date of Birth
                    </label>
                    <div className="mt-2">
                      <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="date"
                          name="dob"
                          id="dob"
                          autoComplete="bday"
                          className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="DD-MM-YYYY"
                          required
                          value={formData.dob}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

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
                          type="text"
                          name="contact"
                          id="contact"
                          required
                          autoComplete="tel"
                          className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Contact Number"
                          value={formData.contact}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

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
                          required
                          autoComplete="email"
                          className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="identificationType"
                        className="block mb-2 text-sm font-medium text-gray-600"
                      >
                        Identification Type
                      </label>
                      <select
                        name="identificationType"
                        id="identificationType"
                        value={formData.identificationType}
                        onChange={handleChange}
                        className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                      >
                        <option value="PAN">PAN</option>
                        <option value="Aadhar">Aadhar</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="identificationNumber"
                        className="block mb-2 text-sm font-medium text-gray-600"
                      >
                        Identification Number
                      </label>
                      <input
                        type="text"
                        name="identificationNumber"
                        id="identificationNumber"
                        required
                        value={formData.identificationNumber}
                        onChange={handleChange}
                        className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={`Enter your ${formData.identificationType} Number`}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="post"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Post
                    </label>
                    <div className="mt-2">
                      <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="post"
                          id="post"
                          autoComplete="post"
                          className="block w-full border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Post"
                          required
                          value={formData.post}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="employmentStatus"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Employment Status
                    </label>
                    <div className="mt-2">
                      <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <select
                          name="employmentStatus"
                          id="employmentStatus"
                          value={formData.employmentStatus}
                          onChange={handleChange}
                          className="bg-gray-50 bg-opacity-70 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="currentlyWorking">Currently Working</option>
                          <option value="exEmployee">Ex-Employee</option>
                        </select>
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
              Employee Status
            </h1>
            <div className="space-y-12 py-20">
              <div className="sm:col-span-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Employee/Intern
                </label>
                <div className="mt-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="employee"
                      name="status"
                      value="employee"
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      checked={formData.status === "employee"}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="employee"
                      className="ml-2 block text-sm leading-5 text-gray-900"
                    >
                      Employee
                    </label>
                  </div>
                  <div className="flex items-center mt-2">
                    <input
                      type="radio"
                      id="intern"
                      name="status"
                      value="intern"
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      checked={formData.status === "intern"}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="intern"
                      className="ml-2 block text-sm leading-5 text-gray-900"
                    >
                      Intern
                    </label>
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

export default EmployeeDataForm;
