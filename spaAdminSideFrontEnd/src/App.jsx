import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Appoint from "./Clientsidepage/Appoint";
import Teammembers from "./Clientsidepage/Teammembers";
import Giftcards from "./Clientsidepage/Giftcards";
import Membership from "./Clientsidepage/Membership";
import ClientsList from "./Clientsidepage/Clientlist";
import Todayandbody from "./Clientsidepage/Todayandbody";
import Memberss from "./Clientsidepage/Memberss";
import Dailysalesss from "./Clientsidepage/Dailysalesss";
import Paymentclient from "./Clientsidepage/Paymentclient";
import SalesPage from "./Clientsidepage/Salespage";
import TopService from "./Clientsidepage/Topservices";
import Dashboard from "./Clientsidepage/Dashboard";
import Sheduledshifts from "./Clientsidepage/Sheduledshifts";
import Graphs from "./Clientsidepage/Graphs";
import Selectcalander from "./Clientsidepage/Selectcalander";
import LoginPage from "./Clientsidepage/Loginpage";
import Signuppage from "./Clientsidepage/Signuppage";
import Seconddashboard from "./Clientsidepage/Seconddashboard";
import Firstdashboard from "./Clientsidepage/Firstdashboard";
import Demo from "./Clientsidepage/Demo";
import Navbar from "./Clientsidepage/Navbar";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Graphs/><Todayandbody/><TopService/></>}/>
        {/* <Route path="/" element={<Appoint />} /> */}
        {/* <Route path="/" element={<Teammembers />} /> */}
        {/* <Route path="/" element={<Giftcards />} /> */}
        {/* <Route path="/" element={<Membership />} /> */}
        {/* <Route path="/" element={<ClientsList />} /> */}
        {/* <Route path="/" element={<Todayandbody />} /> */}
        {/* <Route path="/" element={<Memberss />} /> */}
        {/* <Route path="/" element={<Dailysalesss />} />  */}
        {/* <Route path="/" element={<Paymentclient />} /> */}
        {/* <Route path="/" element={<SalesPage />} /> */}
        {/* <Route path="/" element={<TopService />} /> */}
        {/* <Route path="/" element={<Dashboard />} /> */}
        {/* <Route path="/" element={<Sheduledshifts />} /> */}
        {/* <Route path="/" element={<Graphs />} /> */}
        {/* <Route path="/" element={<Selectcalander />} /> */}
        {/* <Route path="/" element={<LoginPage />} />   */}
        {/* <Route path="/" element={<Signuppage />} /> */}
        {/* <Route path="/" element={<Seconddashboard />} /> */}
        {/* <Route path="/" element={<Firstdashboard />} /> */}
        {/* <Route path="/" element={<Navbar />} /> */}
        {/* <Route path="/" element={<Demo />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
