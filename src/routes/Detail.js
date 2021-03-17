import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import { dbService, database } from "../fbase";

const Detail = ({ userObj }) => {

    const [prod, setProd] = useState("");
    const [rate, setRate] = useState(0);
    const [comments, setComments] = useState([]);

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (!location.state) {
            history.push("/");
            return () => setProd("");
        } else {
            setProd(location.state);
            setRate(location.state.score);
            getComments();
        }
    }, [history, location.state]);

    const getComments = () => {
        dbService.collection("comments")
            .where("prodId", "==", location.state.id)
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                const commentArray = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setComments(commentArray);
            });

            updateScore();
    }

    const updateScore = () => {
        // if (rate !== 0) {
        //     database.ref(location.state.cvs).once("value", (snapshot)=> {
        //         console.log(snapshot.val());
        //     });
        //     // database.ref(cvs).child(prod.id).update({
        //     //     score: rate
        //     // });
        // }
    }

    return (
        <div className="main_container">
            <div className="detail_box">
                <section className="prod_detail">
                    <img src={prod.image} alt={prod.name} />
                    <h4>{prod.name}</h4>
                    <h5>{prod.price}</h5>
                    <Rating name="read-only" value={rate} precision={0.5} readOnly />
                    <span>{prod.score === 0 ? null : prod.socre}</span>
                </section>
                <section className="prod_review">
                    <CommentForm userObj={userObj}
                        prod={prod} />
                    <div className="comment_list_wrap">
                        {comments.map(comment =>
                            <Comment key={comment.id}
                                commentObj={comment}
                                prodId={location.state.id}
                                userObj={userObj} />
                        )}
                    </div>
                </section>
            </div>
        </div>
    );

}

export default Detail;