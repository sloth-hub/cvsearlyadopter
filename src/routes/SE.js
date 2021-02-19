import React, { useEffect, useState } from "react";
import { database } from "../fbase";
import Prods from "../components/Prods";

const SE = () => {

    const [seProds, setSeProds] = useState([]);

    useEffect(() => {
        getProds();
    }, []);

    const getProds = async () => {
        await database.ref("se").once("value").then(data => {
            let seData = Object.values(data.val());
            seData.reverse();
            setSeProds(seData);
        });
    }

    return (
        <div className="main_container">
            <ul className="prods_list se">
                {seProds.map(seProd =>
                    <Prods key={seProd.id} prods={seProd} />
                )}
            </ul>
        </div>
    );

}

export default SE;