import React, { useEffect, useState } from "react";
import { database } from "../fbase";

const Home = () => {

    const [gsNewProds, setGsNewProds] = useState([]);
    const [seNewProds, setSeNewProds] = useState([]);
    const [cuNewProds, setCuNewProds] = useState([]);

    useEffect(() => {
        getDatabase();
    }, []);

    const getDatabase = async () => {
        await database.ref("gs").limitToLast(5).once("value").then(data => {
            const gsArray = Object.values(data.val());
            setGsNewProds(gsArray);
        });

        await database.ref("se").limitToLast(5).once("value").then(data => {
            const seArray = Object.values(data.val());
            setSeNewProds(seArray);
        });

        await database.ref("cu").limitToLast(5).once("value").then(data => {
            const cuArray = Object.values(data.val());
            setCuNewProds(cuArray);
        });

    }

    const NewProds = ({ newProd }) => {
        return (
            <li>
                <img src={newProd.image} alt={newProd.name} />
                <h4>{newProd.name}</h4>
                <h5>{newProd.price}</h5>
            </li>
        )
    }

    return (

        <div className="new_prods">
            <ul className="gs_new_prods">
                {gsNewProds.map(newProd =>
                    <NewProds key={newProd.id} newProd={newProd} />
                )}
            </ul>
            <ul className="se_new_prods">
                {seNewProds.map(newProd =>
                    <NewProds key={newProd.id} newProd={newProd} />
                )}
            </ul>
            <ul className="cu_new_prods">
                {cuNewProds.map(newProd =>
                    <NewProds key={newProd.id} newProd={newProd} />
                )}
            </ul>
        </div>

    );

}

export default Home;