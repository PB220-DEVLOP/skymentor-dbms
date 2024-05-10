import React, { useEffect, useState } from 'react';
import Navebar from '../Components/Navebar';
import { collection, getDocs } from 'firebase/firestore';
import { fireDb } from '../Firebase/FirebaseConfig';

const ViewDigitalMarketingData = () => {
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(fireDb, 'DigitalMarketingFormData'));
                const data = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                setFormData(data);
            } catch (error) {
                console.error('Error fetching form data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='flex items-center justify-center bg-[rgb(181,181,181)] h-screen'>
                <Navebar />
                <div className='m-auto container max-w-[1020px] bg-white rounded-xl git overflow-hidden px-5'>
                    <h1 className='text-center font-serif font-bold text-4xl'>Digital Marketing Data</h1>

                    {/* Table Section */}
                    <div className="flex flex-col h-full">
                        <div className="bg-white rounded-xl py-7 mt-8 shadow-md flex-grow overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name of Client
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Business Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact Number
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Remarks
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Start Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            End Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Remaining Payment
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-200 divide-y divide-gray-200">
                                    {formData.map((entry, index) => (
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
                                                {entry.endDate}
                                                {entry.startDateOption}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {entry.remainingPayment}
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
}

export default ViewDigitalMarketingData;
