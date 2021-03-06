import React from "react";
import { Link } from "react-router-dom";

const NewProds = ({ prods }) => {

    return (
        <li>
            <Link to={{
                pathname: `/prod/${prods.id}`,
                state: {
                    id: prods.id,
                    name: prods.name,
                    image: prods.image,
                    price: prods.price,
                    score: prods.score,
                    date: prods.date
                }
            }}>
                <img src={prods.image} alt={prods.name} />
                <h4>{prods.name}</h4>
                <h5>{prods.price}</h5>
            </Link>
        </li>
    )
}

export default NewProds;