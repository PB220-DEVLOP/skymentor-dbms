import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { fireDb,storage } from '../../Firebase/FirebaseConfig'; // Ensure you import the storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditCertificateData = () => {
  const { id } = useParams();
//   const history = useHistory();
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    dob: '',
    selectedOption: '',
    aadharNumber: '',
    PanNumber: '',
    categoryofCertificate: '',
    position: '',
    photoUrl: ''
  });
  const [newPhotoFile, setNewPhotoFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(fireDb, 'CertificateDataForm', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setNewPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoUrl = formData.photoUrl;

      if (newPhotoFile) {
        const storageRef = ref(storage, `photos/${newPhotoFile.name}`);
        await uploadBytes(storageRef, newPhotoFile);
        photoUrl = await getDownloadURL(storageRef);
      }

      const updatedFormData = {
        ...formData,
        photoUrl
      };

      const docRef = doc(fireDb, 'CertificateDataForm', id);
      await updateDoc(docRef, updatedFormData);
      navigate('/viewCertificatedata');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[rgb(181,181,181)] h-screen">
      <div className="m-auto container max-w-[1020px] bg-white rounded-xl overflow-hidden px-5">
        <h1 className="text-center font-serif font-bold text-4xl">Edit Certificate Data</h1>
        <form onSubmit={handleSubmit} className="my-4">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">DOB</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Document Type</label>
            <input
              type="text"
              name="selectedOption"
              value={formData.selectedOption}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Aadhar Number</label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Pan Number</label>
            <input
              type="text"
              name="PanNumber"
              value={formData.PanNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Category of Certificate</label>
            <input
              type="text"
              name="categoryofCertificate"
              value={formData.categoryofCertificate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Photo File</label>
            <input
              type="file"
              name="photoFile"
              onChange={handlePhotoChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <small className="text-gray-600">
              Leave this field empty if you do not want to change the photo.
            </small>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCertificateData;
