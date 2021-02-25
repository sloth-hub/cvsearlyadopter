import React from "react";
import { Link } from "react-router-dom";
import Rating from '@material-ui/lab/Rating';

const Prods = ({ prods }) => {

    const isNewest = (date) => {
        let year = date.substr(0, 4);
        let month = date.substr(4, 2);
        let day = date.substr(6, 2);
        let resultDate = new Date(year, month - 1, day);
        let now = new Date();
        let interval = now.getTime() - resultDate.getTime();
        interval = Math.round(interval / (1000 * 60 * 60 * 24));
        if (interval >= 14) {
            return false;
        } else {
            return true;
        }
    }

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
                <h4>{prods.name}</h4>{isNewest(prods.date) ? <span>new</span> : null}
            </Link>
            <h5>{prods.price}</h5>
            <Rating name="read-only" value={prods.score} readOnly />
        </li>
    )
}

export default Prods;