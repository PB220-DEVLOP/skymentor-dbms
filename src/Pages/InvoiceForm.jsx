import React, { useState } from "react";
import Navebar from "../Components/Navebar";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDb } from "../Firebase/FirebaseConfig";
import { useNavigate } from "react-router";

const InvoiceForm = () => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !selectedFile || !selectedOption || !selectedDate) {
      toast.error("Please fill in all fields.");
      return;
    }

    const storageRef = ref(getStorage(), "invoices/" + selectedFile.name);
    await uploadBytes(storageRef, selectedFile);
    const fileUrl = await getDownloadURL(storageRef);

    const db = getFirestore();
    const docRef = await addDoc(collection(db, "invoices"), {
      name: name,
      fileUrl: fileUrl,
      category: selectedOption,
      date: selectedDate,
    });

    setName("");
    setSelectedFile("");
    setSelectedOption("");
    setSelectedDate("");

    toast.success("Invoice added successfully!");
    navigate("/viewInvoiceData");
  };

  return (
    <>
      <div className="flex container bg-[rgb(181,181,181)] h-screen">
        <Navebar />
        <div className="m-auto justify-center container h-[600px] w-[1000px] bg-white rounded-xl git">
          <h1 className="text-center font-serif pt-5 font-bold text-4xl">
            Upload Invoice
          </h1>
          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 text-lg font-bold text-gray-800"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="file"
                className="block mb-2 text-lg font-bold text-gray-800"
              >
                Invoice
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="dropdown"
                className="block mb-2 text-lg font-bold text-gray-800"
              >
                Category
              </label>
              <select
                id="dropdown"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Category</option>{" "}
                <option value="Internship">Internship</option>
                <option value="Digital Marketing Client">
                  Digital Marketing Client
                </option>
                <option value="Job Consultancy">Job Consultancy</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="date"
                className="block mb-2 text-lg font-bold text-gray-800"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className=" bg-lime-500 text-white font-bold py-2 px-4 rounded hover:bg-[#FD7401] "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InvoiceForm;
