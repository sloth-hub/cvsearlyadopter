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

    const GsNewProds = ({ gsNewProd }) => {
        return (
            <li>
                <img src={gsNewProd.image} alt={gsNewProd.name} />
                <h4>{gsNewProd.name}</h4>
                <h5>{gsNewProd.price}</h5>
            </li>
        )
    }

    const SeNewProds = ({ seNewProd }) => {
        return (
            <li>
                <img src={seNewProd.image} alt={seNewProd.name} />
                <h4>{seNewProd.name}</h4>
                <h5>{seNewProd.price}</h5>
            </li>
        )
    }

    const CuNewProds = ({ cuNewProd }) => {
        return (
            <li>
                <img src={cuNewProd.image} alt={cuNewProd.name} />
                <h4>{cuNewProd.name}</h4>
                <h5>{cuNewProd.price}</h5>
            </li>
        )
    }

    return (

        <div className="new_prods">
            <ul className="gs_new_prods">
                {gsNewProds.map(gsNewProd =>
                    <GsNewProds key={gsNewProd.id} gsNewProd={gsNewProd} />
                )}
            </ul>
            <ul className="se_new_prods">
                {seNewProds.map(seNewProd =>
                    <SeNewProds key={seNewProd.id} seNewProd={seNewProd} />
                )}
            </ul>
            <ul className="cu_new_prods">
                {cuNewProds.map(cuNewProd =>
                    <CuNewProds key={cuNewProd.id} cuNewProd={cuNewProd} />
                )}
            </ul>
        </div>

    );

}

export default Home;