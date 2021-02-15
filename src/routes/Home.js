import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { database } from "../fbase";
import Navigation from "../components/Navigation";

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
                <Link to={{
                    pathname: `/prod/${newProd.id}`,
                    state: {
                        id: newProd.id,
                        name: newProd.name,
                        image: newProd.image,
                        price: newProd.price,
                        score: newProd.score
                    }
                }}>
                    <img src={newProd.image} alt={newProd.name} />
                    <h4>{newProd.name}</h4>
                    <h5>{newProd.price}</h5>
                    <span>{newProd.score}</span>
                </Link>
            </li>
        )
    }

    return (
        <>
            <Navigation />
            <div className="main_container">
                <section className="best_prods">
                    <div className="best_prods title_box">
                        <h1 className="best_prods title">BEST</h1>
                    </div>
                </section>
                <section className="new_prods">
                    <div className="new_prods title_box">
                        <h1 className="new_prods title">NEW</h1>
                    </div>
                    <div className="new_prods_box">
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
                </section>
            </div>
            <footer>&copy; 2021 편리어답터. All rights reserved.</footer>
        </>
    );

}

export default Home;