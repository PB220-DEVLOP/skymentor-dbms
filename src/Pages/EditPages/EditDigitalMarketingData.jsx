import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { fireDb, storage } from '../../Firebase/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const EditDigitalMarketingData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',
    businessname: '',
    email: '',
    contact: '',
    remarks: '',
    startDate: '',
    endDate: '',
    remainingPayment: '',
    photoUrl: ''
  });
  const [newPhotoFile, setNewPhotoFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(fireDb, 'DigitalMarketingFormData', id);
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
      let updatedFormData = { ...formData };

      if (newPhotoFile) {
        const storageRef = ref(storage, `photos/${newPhotoFile.name}`);
        await uploadBytes(storageRef, newPhotoFile);
        const photoUrl = await getDownloadURL(storageRef);
        updatedFormData.photoUrl = photoUrl;
      } else {
        delete updatedFormData.photoUrl; // Remove photoUrl if no new photo is uploaded
      }

      const docRef = doc(fireDb, 'DigitalMarketingFormData', id);
      await updateDoc(docRef, updatedFormData);
      navigate('/viewdigitalmarketing');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[rgb(181,181,181)] h-screen">
      <div className="m-auto container max-w-[1020px] bg-white rounded-xl overflow-hidden px-5">
        <h1 className="text-center font-serif font-bold text-4xl">Edit Digital Marketing Data</h1>
        <form onSubmit={handleSubmit} className="my-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientName">
              Client Name
            </label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="businessname">
              Business Name
            </label>
            <input
              type="text"
              name="businessname"
              value={formData.businessname}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remarks">
              Remarks
            </label>
            <input
              type="text"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remainingPayment">
              Remaining Payment
            </label>
            <input
              type="text"
              name="remainingPayment"
              value={formData.remainingPayment}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photoUrl">
              Photo
            </label>
            <input
              type="file"
              onChange={handlePhotoChange}
              className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
            />
            {formData.photoUrl && (
              <img src={formData.photoUrl} alt="Current" className="mt-2 h-40 w-auto" />
            )}
          </div> */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate('/viewdigitalmarketing')}
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

export default EditDigitalMarketingData;
