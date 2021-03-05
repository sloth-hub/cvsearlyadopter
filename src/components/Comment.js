import React from "react";
import Rating from "@material-ui/lab/Rating";

const Comment = ({commentObj, isOwner}) => {

    return (
        <div className="comment">
            <Rating name="size-small" defaultValue={commentObj.score} size="small" readOnly />
            <p>{commentObj.text}</p>
        </div>
    )
}

export default Comment;