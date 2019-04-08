import React from 'react';
import ReviewListEntry from './reviewListEntry.jsx';

const ReviewList = (props) => (
    <div>
        {props.currentReviews.map((review) => (
            <ReviewListEntry review={review} search={props.search} isActive={props.isActive}/>
        ))}
    </div>
)

export default ReviewList;