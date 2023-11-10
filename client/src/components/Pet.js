import { Table } from "semantic-ui-react";

function Pet({ pet }) {
    return (
        <Table.Row>
            <Table.Cell>{pet.name}</Table.Cell>
            <Table.Cell>{pet.species}</Table.Cell>
            <Table.Cell>{pet.breed}</Table.Cell>
            <Table.Cell>{pet.weight}</Table.Cell>
            <Table.Cell>{pet.age}</Table.Cell>
            <Table.Cell>{pet.notes}</Table.Cell>
        </Table.Row>
    );
}

export default Pet;
