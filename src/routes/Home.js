import React, { useEffect, useState } from "react";
import { database } from "../fbase";
import NewProds from "../components/NewProds";

const Home = ({ userObj }) => {

    const [gsNewProds, setGsNewProds] = useState([]);
    const [seNewProds, setSeNewProds] = useState([]);
    const [cuNewProds, setCuNewProds] = useState([]);

    useEffect(() => {
        getDatabase();
    }, []);

    const getDatabase = async () => {
        await database.ref("gs").limitToLast(5).once("value").then(data => {
            const gsArray = Object.values(data.val());
            gsArray.reverse();
            setGsNewProds(gsArray);
        });

        await database.ref("se").limitToLast(5).once("value").then(data => {
            const seArray = Object.values(data.val());
            seArray.reverse();
            setSeNewProds(seArray);
        });

        await database.ref("cu").limitToLast(5).once("value").then(data => {
            const cuArray = Object.values(data.val());
            cuArray.reverse();
            setCuNewProds(cuArray);
        });

    }

    return (
        <>
            <div className="main_container">
                <section className="best_prods_wrap">
                    <div className="best_prods title_box">
                        <h2 className="best_prods title">BEST</h2>
                    </div>
                    <ul className="best_prods">
                        
                    </ul>
                </section>
                <section className="new_prods_wrap">
                    <div className="new_prods title_box">
                        <h2 className="new_prods title">NEW</h2>
                    </div>
                    <div className="new_prods_box gs">
                        <h3 className="cvs_title_box gs">GS</h3>
                        <ul className="gs_new_prods">
                            {gsNewProds.map(newProd =>
                                <NewProds key={newProd.id} prods={newProd} />
                            )}
                        </ul>
                    </div>
                    <div className="new_prods_box se">
                        <h3 className="cvs_title_box se">7-ELEVEN</h3>
                        <ul className="se_new_prods">
                            {seNewProds.map(newProd =>
                                <NewProds key={newProd.id} prods={newProd} />
                            )}
                        </ul>
                    </div>
                    <div className="new_prods_box cu">
                        <h3 className="cvs_title_box cu">CU</h3>
                        <ul className="cu_new_prods">
                            {cuNewProds.map(newProd =>
                                <NewProds key={newProd.id} prods={newProd} />
                            )}
                        </ul>
                    </div>
                </section>
            </div>

        </>
    );

}

export default Home;