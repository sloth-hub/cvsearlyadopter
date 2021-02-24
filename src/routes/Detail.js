import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { dbService } from "../fbase";
import moment from "moment";
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const Detail = () => {

    const [prod, setProd] = useState("");
    const [comment, setComment] = useState("");
    const [score, setScore] = useState(0);

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (!location.state) {
            history.push("/");
            return () => setProd("");
        } else {
            setProd(location.state);
        }
    }, [history, location.state]);

    const onChange = (evt) => {
        const {
            target: { value }
        } = evt;
        setComment(value);
    }

    const onSubmit = async (evt) => {
        evt.preventDefault();
        if (comment !== "") {
            const commentObj = {
                text: comment,
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                score: score
            }
            await dbService.collection("comment").add(commentObj);
            setComment("");
            setScore(0);
        } else {
            alert("내용을 입력해주세요.");
        }
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            '& > * + *': {
                marginTop: theme.spacing(1),
            },
        },
    }));

    const HalfRating = () => {
        const classes = useStyles();
        return (
            <div className={classes.root} >
                <Rating name="customized-empty"
                    defaultValue={0}
                    value={score}
                    precision={0.5}
                    onChange={(evt, newValue) => {
                        setScore(newValue);
                    }} />
            </div >
        );

    }

    return (
        <div className="main_container">
            <div className="detail_box">
                <section className="prod_detail">
                    <img src={prod.image} alt={prod.name} />
                    <h4>{prod.name}</h4>
                    <h5>{prod.price}</h5>
                    <span>{prod.score}</span>
                </section>
                <section className="prod_review">
                    <form className="commentForm">
                        <textarea
                            value={comment}
                            onChange={onChange}
                            placeholder="제품이 어떤지 말해주세요."
                            maxLength={120}
                            spellCheck="false"
                            className="comment_input" />
                        <HalfRating /><span>{score}</span>
                        <input type="submit" value="등록" />
                    </form>
                    <div className="comment_list_wrap">
                        <ul className="comment_list">
                            <li>comment</li>
                            <li>comment</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );

}

export default Detail;