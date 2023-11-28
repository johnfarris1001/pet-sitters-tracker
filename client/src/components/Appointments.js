// import { useContext, useState, useEffect } from "react";
// import { NavLink, useLocation, Outlet } from "react-router-dom";
// import { UserContext } from "../contexts/UserContext";
// import Appointment from "./Appointment";

// import { Table } from "semantic-ui-react";

// function Appointments() {
//     const { user } = useContext(UserContext);
//     const [pets, setPets] = useState([]);
//     const [sitters, setSitters] = useState([]);
//     const location = useLocation();

//     useEffect(() => {
//         if (user) {
//             fetch("/pets")
//                 .then((resp) => resp.json())
//                 .then((data) => setPets(data));
//             fetch("/sitters")
//                 .then((resp) => resp.json())
//                 .then((data) => setSitters(data));
//         }
//     }, [setSitters, setPets, user]);

//     function removeAppointment(id) {
//         const newPets = [];
//         pets.forEach((pet) => {
//             const apps = pet.appointments.filter((app) => {
//                 return app.id !== id;
//             });
//             newPets.push({ ...pet, appointments: apps });
//         });
//         setPets(newPets);
//     }

//     const addAppointment = (appointment) => {
//         const newPets = pets.map((pet) => {
//             if (pet.id === appointment.pet.id) {
//                 return {
//                     ...pet,
//                     appointments: [...pet.appointments, appointment],
//                 };
//             } else {
//                 return pet;
//             }
//         });
//         setPets(newPets);
//     };

//     const editPetAppointment = (appointment) => {
//         const newPets = [];
//         pets.forEach((pet) => {
//             if (pet.id === appointment.pet.id) {
//                 const apps = pet.appointments.filter((app) => {
//                     return app.id !== appointment.id;
//                 });
//                 newPets.push({ ...pet, appointments: [...apps, appointment] });
//             } else {
//                 newPets.push(pet);
//             }
//         });
//         setPets(newPets);
//     };

//     const title = user
//         ? `${user.username}'s Appointments`
//         : "Log in to view Appointments";

//     const style = user ? { width: "80%", margin: "auto" } : { display: "none" };

//     let petApps = [];
//     if (user) {
//         pets.forEach((pet) => {
//             pet.appointments.forEach((appointment) => {
//                 petApps.push(appointment);
//             });
//         });
//     }

//     const appointmentsToDisplay = user
//         ? petApps.map((appointment) => {
//               return (
//                   <Appointment
//                       key={appointment.id}
//                       appointment={appointment}
//                       removeAppointment={removeAppointment}
//                   />
//               );
//           })
//         : null;

//     const newAppointmentLinkStyle = !user
//         ? { display: "none" }
//         : location.pathname === "/appointments/new"
//         ? { display: "none" }
//         : { padding: "10px" };

//     const categoryOptions = [
//         { key: "1", text: "Drop-in 1/2-hr", value: "Drop-in 1/2-hr" },
//         { key: "2", text: "Drop-in 1-hr", value: "Drop-in 1-hr" },
//         { key: "3", text: "House Sit", value: "House Sit" },
//         { key: "4", text: "Walk 1/2-hr", value: "Walk 1/2-hr" },
//         { key: "5", text: "Walk 1-hr", value: "Walk 1-hr" },
//         { key: "6", text: "Boarding", value: "Boarding" },
//         { key: "7", text: "Grooming", value: "Grooming" },
//         { key: "8", text: "Play Date", value: "Play Date" },
//     ];

//     const petOptions = user
//         ? pets.map((pet) => {
//               return {
//                   key: pet.id,
//                   text: pet.name,
//                   value: pet.id,
//               };
//           })
//         : null;

//     const sitterOptions = user
//         ? sitters.map((sitter) => {
//               return {
//                   key: sitter.id,
//                   text: sitter.name,
//                   value: sitter.id,
//               };
//           })
//         : null;

//     return (
//         <div>
//             <h2>{title}</h2>
//             <div style={user ? { padding: "10px" } : { display: "none" }}>
//                 <NavLink
//                     className="ui button"
//                     to="/appointments/new"
//                     style={newAppointmentLinkStyle}
//                 >
//                     New Appointment
//                 </NavLink>
//             </div>
//             <Outlet
//                 context={{
//                     addAppointment: addAppointment,
//                     editAppointment: editPetAppointment,
//                     appointments: petApps,
//                     categoryOptions: categoryOptions,
//                     sitterOptions: sitterOptions,
//                     petOptions: petOptions,
//                 }}
//             />
//             <Table celled structured style={style}>
//                 <Table.Header>
//                     <Table.Row>
//                         <Table.HeaderCell>Pet</Table.HeaderCell>
//                         <Table.HeaderCell>Type</Table.HeaderCell>
//                         <Table.HeaderCell>Sitter</Table.HeaderCell>
//                         <Table.HeaderCell>Date</Table.HeaderCell>
//                         <Table.HeaderCell>Repeat Days</Table.HeaderCell>
//                         <Table.HeaderCell>Notes</Table.HeaderCell>
//                         <Table.HeaderCell>Update/Delete</Table.HeaderCell>
//                     </Table.Row>
//                 </Table.Header>
//                 <Table.Body>{appointmentsToDisplay}</Table.Body>
//             </Table>
//         </div>
//     );
// }

// export default Appointments;
