import React, { useEffect, useState } from "react";
import { Link,  } from "react-router-dom";
import Navebar from "../Components/Navebar";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { fireDb } from "../Firebase/FirebaseConfig";

const ViewData = () => {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDb, "studentDataForms"));
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

  const filteredData = formData.filter(
    (entry) =>
      entry.username &&
      entry.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(fireDb, "studentDataForms", id));
      setFormData(formData.filter((entry) => entry.id !== id));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center bg-[rgb(181,181,181)] h-screen">
        <Navebar />
        <div className="m-auto container max-w-[1020px] bg-white rounded-xl git overflow-hidden px-5">
          <h1 className="text-center font-serif font-bold text-4xl">
            Form Data
          </h1>

          <div className="my-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-6"
            />
          </div>

          <div className="flex flex-col h-full">
            <div className="bg-white rounded-xl py-7 -mt-10 shadow-md flex-grow overflow-x-auto">
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
                      Contact Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email Address
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Aadhar Number
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
                        {entry.contact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.aadharNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.remainingPayment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/editstudent/${entry.id}`}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md"
                        >
                          Delete
                        </button
>
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

export default ViewData;
