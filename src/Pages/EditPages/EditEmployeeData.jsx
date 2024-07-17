import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { fireDb } from "../../Firebase/FirebaseConfig";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployeeData = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    status: "",
    dob: "",
    contact: "",
    email: "",
    identificationType: "",
    identificationNumber: "",
    photoUrl: "",
    post: "",
    employmentStatus: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [updatePhoto, setUpdatePhoto] = useState(false); // State to track whether to update photo
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(fireDb, "EmployeeDataForm", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
    setUpdatePhoto(true); // Set updatePhoto to true when a new photo is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedData = { ...formData };

      if (updatePhoto && photoFile) {
        // Update photo only if updatePhoto is true and a new photo is selected
        const storage = getStorage();
        const photoRef = ref(storage, `photos/${photoFile.name}`);
        await uploadBytes(photoRef, photoFile);
        const photoUrl = await getDownloadURL(photoRef);
        updatedData.photoUrl = photoUrl;
      }

      const docRef = doc(fireDb, "EmployeeDataForm", id);
      await updateDoc(docRef, updatedData);
      navigate("/viewEmployeData"); // Navigate back to the main view after updating
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Employee Data</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status:</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">DOB:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contact Number:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Document Type:</label>
          <input
            type="text"
            name="identificationType"
            value={formData.identificationType}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Document Number:</label>
          <input
            type="text"
            name="identificationNumber"
            value={formData.identificationNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Post:</label>
          <input
            type="text"
            name="post"
            value={formData.post}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Employment Status:</label>
          <input
            type="text"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Photo:</label>
          <input
            type="file"
            onChange={handlePhotoChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Update Photo:</label>
          <input
            type="checkbox"
            name="updatePhoto"
            checked={updatePhoto}
            onChange={(e) => setUpdatePhoto(e.target.checked)}
            className="ml-2"
          />
          <span className="ml-2 text-gray-600">Check to update photo</span>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditEmployeeData;
