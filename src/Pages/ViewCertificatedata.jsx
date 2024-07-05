import React, { useEffect, useState } from "react";
import Navebar from "../Components/Navebar";
import { collection, getDocs } from "firebase/firestore";
import { fireDb } from "../Firebase/FirebaseConfig";

const ViewCertificatedata = () => {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(fireDb, "CertificateDataForm")
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

  const filteredData = formData.filter((entry) =>
    entry.categoryofCertificate && entry.categoryofCertificate.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  return (
    <>
      <div className="flex items-center justify-center bg-[rgb(181,181,181)] h-screen">
        <Navebar />
        <div className="m-auto container max-w-[1020px] bg-white rounded-xl git overflow-hidden px-5">
          <h1 className="text-center font-serif font-bold text-4xl">
            Certificate Data
          </h1>

          <div className="my-4">
            <input
              type="text"
              placeholder="Search by Category of Certificate..."
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
                      Photo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      DOB
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Document Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Document Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category of Certificate
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Position
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-200 divide-y divide-gray-200">
                  {filteredData.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <a
                            href={entry.photoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <img
                              src={entry.photoUrl}
                              alt="Student"
                              className="h-full w-full object-cover"
                            />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.dob}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.selectedOption}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.aadharNumber}
                        {entry.PanNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.categoryofCertificate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.position}
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

export default ViewCertificatedata;
