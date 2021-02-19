import React, { useEffect, useState } from "react";
import { database } from "../fbase";
import Prods from "../components/Prods";

const GS = () => {

    const [gsProds, setGsProds] = useState([]);

    useEffect(() => {
        getProds();
    }, []);

    const getProds = async () => {
        await database.ref("gs").once("value").then(data => {
            let gsData = Object.values(data.val());
            gsData.reverse();
            setGsProds(gsData);
        });
    }

    return (
        <div className="main_container">
            <ul className="prods_list gs">
                {gsProds.map(gsProd =>
                    <Prods key={gsProd.id} prods={gsProd} />
                )}
            </ul>
        </div>
    );

}

export default GS;