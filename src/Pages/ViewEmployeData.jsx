import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navebar from "../Components/Navebar";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { fireDb } from "../Firebase/FirebaseConfig";

const ViewEmployeData = () => {
  const [formData, setFormData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDb, "EmployeeDataForm"));
        let data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });

        // Sort data to have currently working employees at the top
        data.sort((a, b) => {
          if (a.employmentStatus === "currentlyWorking" && b.employmentStatus !== "currentlyWorking") return -1;
          if (a.employmentStatus !== "currentlyWorking" && b.employmentStatus === "currentlyWorking") return 1;
          return 0;
        });

        // Apply status filter if needed
        const filteredData = statusFilter === "All" ? data : data.filter(entry => entry.status === statusFilter);
        setFormData(filteredData);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchData();
  }, [statusFilter]); // Include statusFilter as a dependency to trigger re-fetch when it changes

  const handleDelete = async (id) => {
    try {
      const docRef = doc(fireDb, "EmployeeDataForm", id);
      await deleteDoc(docRef);
      setFormData(formData.filter(entry => entry.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center bg-[rgb(181,181,181)] h-screen w-screen">
        <Navebar />
        <div className="m-auto container max-w-[1020px] bg-white rounded-xl overflow-hidden px-5">
          <h1 className="text-center font-serif font-bold text-4xl">
            Employee Data
          </h1>

          {/* Dropdown for filtering */}
          <div className="flex justify-end mb-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All</option>
              <option value="employee">Employee</option>
              <option value="intern">Intern</option>
            </select>
          </div>

          {/* Table Section */}
          <div className="flex flex-col h-full">
            <div className="bg-white rounded-xl py-7 mt-8 shadow-md flex-grow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">DOB</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employment Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-200 divide-y divide-gray-200">
                  {formData.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <a href={entry.photoUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                            <img src={entry.photoUrl} alt="Employee" className="h-full w-full object-cover" />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.dob}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.contact}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.identificationType}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.identificationNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.post}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{entry.employmentStatus}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/editemployee/${entry.id}`}>
                          <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md ml-2"
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

export default ViewEmployeData;
