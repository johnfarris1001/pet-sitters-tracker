import { useContext, useState, useEffect } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Table } from "semantic-ui-react";

function Pets() {
    const { user } = useContext(UserContext);
    const [pets, setPets] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch("/pets")
                .then((resp) => resp.json())
                .then((data) => {
                    setPets(data);
                });
        }
    }, [setPets, user]);

    function addPet(newPet) {
        setPets([...pets, newPet]);
    }

    const title = user ? `${user.username}'s Pets` : "Log in to view Pets";
    const style = user
        ? { width: "80%", margin: "auto", padding: "20px" }
        : { display: "none" };

    const petsToDisplay = user
        ? pets.map((pet) => {
              return (
                  <Table.Row
                      key={pet.id}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/pets/${pet.id}`)}
                  >
                      <Table.Cell>{pet.name}</Table.Cell>
                      <Table.Cell>{pet.species}</Table.Cell>
                      <Table.Cell>{pet.breed}</Table.Cell>
                      <Table.Cell>{pet.weight}</Table.Cell>
                      <Table.Cell>{pet.age}</Table.Cell>
                      <Table.Cell>{pet.notes}</Table.Cell>
                  </Table.Row>
              );
          })
        : null;

    const newPetLinkStyle = !user
        ? { display: "none" }
        : location.pathname === "/pets/new"
        ? { display: "none" }
        : {};

    return (
        <div>
            <h2>{title}</h2>
            <div style={user ? { padding: "10px" } : { display: "none" }}>
                <NavLink
                    className="ui button"
                    to="/pets/new"
                    style={newPetLinkStyle}
                >
                    Add New Pet!
                </NavLink>
            </div>
            <Outlet
                context={{
                    addPet: addPet,
                    pets: pets,
                }}
            />
            <Table celled structured style={style}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Species</Table.HeaderCell>
                        <Table.HeaderCell>Breed</Table.HeaderCell>
                        <Table.HeaderCell>Weight</Table.HeaderCell>
                        <Table.HeaderCell>Age</Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{petsToDisplay}</Table.Body>
            </Table>
        </div>
    );
}

export default Pets;
