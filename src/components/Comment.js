import React from "react";
import { dbService } from "../fbase";
import Rating from "@material-ui/lab/Rating";

const Comment = ({commentObj, prodId, userObj}) => {

    const onDeleteClick = async () => {
        const ok = window.confirm("정말로 삭제하시겠습니까?");
        if (ok) {
            await dbService.doc(`${prodId}/${commentObj.id}`).delete();
        }
    }
    const Actions = ()=> {
        return (
            <div className="comment_actions">
                <span className="date">{commentObj.createdAt}</span>
                <span onClick={onDeleteClick}> X</span>
            </div>
        );
    }
    return (
        <div className="comment">
            <Rating name="size-small" defaultValue={commentObj.score} size="small" readOnly />
            <p>{commentObj.text}</p>
            {userObj ? (userObj.uid === commentObj.creatorId && <Actions />): null}
        </div>
    )
}

export default Comment;