import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase/FirebaseConfig"; // Ensure this import points to your FirebaseConfig file

const EditInvoicedata = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState({
    name: "",
    date: "",
    category: "",
    fileUrl: ""
  });
  const [newFile, setNewFile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      const db = getFirestore();
      const docRef = doc(db, "invoices", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setInvoiceData(docSnap.data());
        setLoading(false); // Set loading to false once data is fetched
      } else {
        console.log("No such document!");
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedInvoiceData = { ...invoiceData };

      if (newFile) {
        const storageRef = ref(storage, `invoices/${newFile.name}`);
        await uploadBytes(storageRef, newFile);
        const fileUrl = await getDownloadURL(storageRef);
        updatedInvoiceData.fileUrl = fileUrl;
      }

      const db = getFirestore();
      const docRef = doc(db, "invoices", id);
      await updateDoc(docRef, updatedInvoiceData);
      navigate("/viewInvoiceData");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center bg-[rgb(181,181,181)] h-screen">
      <div className="m-auto container max-w-[1020px] bg-white rounded-xl overflow-hidden px-5">
        <h1 className="text-center font-serif font-bold text-4xl">Edit Invoice</h1>
        <form onSubmit={handleSubmit} className="my-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Client Name
            </label>
            <input
              type="text"
              name="name"
              value={invoiceData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Invoice Date
            </label>
            <input
              type="date"
              name="date"
              value={invoiceData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Invoice Category
            </label>
            <input
              type="text"
              name="category"
              value={invoiceData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileUrl">
              Invoice File
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {invoiceData.fileUrl && (
              <a
                href={invoiceData.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 text-blue-600 hover:text-blue-900"
              >
                View Current File
              </a>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate("/viewInvoiceData")}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInvoicedata;
