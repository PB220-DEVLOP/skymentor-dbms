import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";
import {
  CertificateData,
  DigitalMaketing,
  EmployeeData,
  InvoiceData,
  ViewData,
  CertificateCategory,
  EmployeCategory,
  InvoiceCategory,
  Form,
  Login,
  Signup,
  InvoiceForm,
  StudentData,
  DigitialMarketingForm,
  EmployeeDataForm,
  ViewDigitalMarketingData,
  ViewCertificateExperienceData,
  ViewCertificateIntern,
  ViewEmployeData,
  ViewInternData,
  ViewInvoiceDigitalMarketingData,
  ViewInvoiceInterData,
  ViewInvoiceJobConsultancyData,
  CertificateDataForm,
  ViewInvoiceData,
  ViewCertificatedata,
} from "./Components/index.js";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import EditEmployeeData from "./Pages/EditPages/EditEmployeeData.jsx";
import EditStudentData from "./Pages/EditPages/EditStudentData.jsx";
import EditCertificateData from "./Pages/EditPages/EditCertificateData.jsx";
import EditDigitalMarketingData from "./Pages/EditPages/EditDigitalMarketingData.jsx";
import EditInvoicedata from "./Pages/EditPages/EditInvoicedata.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Login/>}/>
      <Route path="certificatedata" element={<CertificateData/>}/>
      <Route path="digitalmaketing" element={<DigitalMaketing/>}/>
      <Route path="employeedata" element={<EmployeeData/>}/>
      <Route path="invoicedata" element ={<InvoiceData/>}/>
      <Route path="Login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="studentData" element ={<StudentData/>}/>
      <Route path="form" element ={<Form/>}/>
      <Route path="formdigitalmarketing" element ={<DigitialMarketingForm/>}/>
      <Route path="viewdata" element ={<ViewData/>}/>
      <Route path="formemployeedata" element ={<EmployeeDataForm/>}/>
      <Route path="viewdigitalmarketing" element ={<ViewDigitalMarketingData/>}/>
      <Route path="invoiceform" element ={<InvoiceForm/>}/>
      <Route path="certificatedataform" element ={<CertificateDataForm/>}/>
      <Route path="certificatecategory" element ={<CertificateCategory/>}/>
      <Route path="employecategory" element ={<EmployeCategory/>}/>
      <Route path="invoicecategory" element ={<InvoiceCategory/>}/>
      <Route path="viewcertificateexperiencedata" element ={<ViewCertificateExperienceData/>}/>
      <Route path="viewcertificatentern" element ={<ViewCertificateIntern/>}/>
      <Route path="viewInvoiceData" element ={<ViewInvoiceData/>}/>
      <Route path="viewEmployeData" element ={<ViewEmployeData/>}/>
      <Route path="viewCertificatedata" element ={<ViewCertificatedata/>}/>
      {/* Edit */}
      <Route path="editemployee/:id" element={<EditEmployeeData />} /> {/* Define the route for editing */}
      <Route path="editstudent/:id" element={<EditStudentData />} /> {/* Define the route for editing */}
      <Route path="editcertificate/:id" element={<EditCertificateData/>} />
      <Route path="editDigitalMarketingData/:id" element={<EditDigitalMarketingData/>} />
      <Route path="editInvoice/:id" element={<EditInvoicedata/>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <div>
    <RouterProvider router={router} />
    <Toaster position="top-center" />
  </div>
);
