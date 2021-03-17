import React, { useEffect, useState } from "react";
import { database } from "../fbase";
import Prods from "../components/Prods";

const CU = () => {

    const [cuProds, setCuProds] = useState([]);

    useEffect(() => {
        getProds();
    }, []);

    const getProds = async () => {
        await database.ref("cu").once("value").then(data => {
            let cuData = Object.values(data.val());
            cuData.reverse();
            setCuProds(cuData);
        });
    }

    return (
        <div className="main_container">
            <ul className="prods_list cu">
                {cuProds.map((cuProd, index) =>
                    <Prods key={index} index={index} prods={cuProd} cvs="cu" />
                )}
            </ul>
        </div>
    );

}

export default CU;