import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Pet() {
    const [pet, setPet] = useState({});
    const params = useParams();

    useEffect(() => {
        fetch(`/pets/${params.id}`)
            .then((r) => r.json())
            .then((data) => setPet(data));
    }, [setPet, params]);

    if (!pet) {
        return <div>Loading...</div>;
    } else if (pet.error) {
        return <div>{pet.error}</div>;
    } else {
        return <div>{pet.name}</div>;
    }
}

export default Pet;
