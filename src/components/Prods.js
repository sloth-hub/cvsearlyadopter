import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dbService } from "../fbase";
import Rating from '@material-ui/lab/Rating';

const Prods = ({ index, prods, cvs }) => {

    const [score, setScore] = useState(0);

    useEffect(() => {
        getScore();
    }, []);

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

    const getScore = async () => {
        const db = dbService.collection("comments");
        const snapshot = await db.where("prodId", "==", prods.id).get();
        const scores = [];
        snapshot.forEach(doc => {
            scores.push(
                doc.data().score
            );
        });
        const resultScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        setScore(resultScore);
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
                    score: score,
                    date: prods.date,
                    cvs: cvs,
                    index: index
                }
            }}>
                <img src={prods.image} alt={prods.name} />
                <h4>{prods.name}</h4>{isNewest(prods.date) ? <span>new</span> : null}
            </Link>
            <h5>{prods.price}</h5>
            <Rating name="read-only" value={score} precision={0.5} readOnly />
        </li>
    )
}

export default Prods;