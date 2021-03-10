import React, { useState } from "react";
import { dbService } from "../fbase";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

const CommentForm = ({ userObj, prod }) => {

    const [comment, setComment] = useState("");
    const [score, setScore] = useState(0);

    const onChange = (evt) => {
        const {
            target: { value }
        } = evt;
        setComment(value);
    }

    const onSubmit = async (evt) => {
        evt.preventDefault();
        if (comment !== "") {
            if (score === 0) {
                alert("최소 별점은 0.5점 입니다.");
            } else {
                const commentObj = {
                    prodId: prod.id,
                    creatorId: userObj.uid,
                    createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
                    text: comment,
                    score: score
                }
                await dbService.collection("comments").add(commentObj);
                setComment("");
                setScore(0);
            }
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
        <form className="commentForm" onSubmit={onSubmit}>
            <HalfRating /><span>{score}</span>
            <textarea
                value={comment}
                onChange={onChange}
                placeholder={userObj ? "내용을 입력하세요" : "로그인 해주세요"}
                maxLength={120}
                spellCheck="false"
                className="comment_input" />
            {userObj ? <input type="submit" value="등록" /> : null}
        </form>
    )
}

export default CommentForm;