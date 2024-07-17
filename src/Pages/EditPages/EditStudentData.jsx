// EditForm.js

import React, { useState, useEffect } from 'react';
import {  Navigate, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { fireDb } from '../../Firebase/FirebaseConfig';

const EditStudentData = () => {
//   const history = useHistory();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    dob: '',
    contact: '',
    email: '',
    aadharNumber: '',
    remainingPayment: '',
  });

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const docRef = doc(fireDb, 'studentDataForms', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchFormData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(fireDb, 'studentDataForms', id);
      await updateDoc(docRef, {
        username: formData.username,
        dob: formData.dob,
        contact: formData.contact,
        email: formData.email,
        aadharNumber: formData.aadharNumber,
        remainingPayment: formData.remainingPayment,
      });
      console.log('Document successfully updated!');
      navigate('/viewdata'); // Redirect to ViewData or any other route after update
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[rgb(181,181,181)] h-screen">
      <div className="m-auto container max-w-[1020px] bg-white rounded-xl git overflow-hidden px-5">
        <h1 className="text-center font-serif font-bold text-4xl">Edit Form Data</h1>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label className="block mb-2">Name:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-6"
            />
          </div>
          <div className="my-4">
            <label className="block mb-2">DOB:</label>
            <input
              type="text"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-6"
            />
          </div>
          <div className="my-4">
            <label className="block mb-2">Contact Number:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-6"
            />
          </div>
          <div className="my-4">
            <label className="block mb-2">Email Address:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-6"
            />
          </div>
          <div className="my-4">
            <label className="block mb-2">Aadhar Number:</label>
            <input
              type="text"
              name="aadharNumber"
              value={formData.aadharNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-6"
            />
          </div>
          <div className="my-4">
            <label className="block mb-2">Remaining Payment:</label>
            <input
              type="text"
              name="remainingPayment"
              value={formData.remainingPayment}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 mb-6"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
          >
            Update
          </button>
          <button
            onClick={() => navigate('/viewdata')}
            className="bg-gray-500 text-white px-3 py-1 rounded-md"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStudentData;
