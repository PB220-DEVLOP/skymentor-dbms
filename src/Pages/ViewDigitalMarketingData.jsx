import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navebar from "../Components/Navebar";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { fireDb } from "../Firebase/FirebaseConfig";

const ViewDigitalMarketingData = () => {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(fireDb, "DigitalMarketingFormData")
        );
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setFormData(data);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(fireDb, "DigitalMarketingFormData", id));
      setFormData(formData.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const filteredData = formData.filter((entry) =>
    entry.businessname && entry.businessname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center justify-center bg-[rgb(181,181,181)] h-screen">
        <Navebar />
        <div className="m-auto container max-w-[1020px] bg-white rounded-xl git overflow-hidden px-5">
          <h1 className="text-center font-serif font-bold text-4xl">
            Digital Marketing Data
          </h1>

          <div className="my-4">
            <input
              type="text"
              placeholder="Search by Business Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-6"
            />
          </div>

          <div className="flex flex-col h-full">
            <div className="bg-white rounded-xl py-7 -mt-4 shadow-md flex-grow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name of Client
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Business Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Contact Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Remarks
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Start Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Remaining Payment
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-200 divide-y divide-gray-200">
                  {filteredData.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.clientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.businessname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.contact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.remarks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.startDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.startDateOption === "choose-date" ? entry.endDate.split(' ')[0] : entry.startDateOption}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.remainingPayment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => navigate(`/editDigitalMarketingData/${entry.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 ml-2"
                          onClick={() => handleDelete(entry.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDigitalMarketingData;
