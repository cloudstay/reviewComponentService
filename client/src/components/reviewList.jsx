import React from 'react';
import ReviewListEntry from './reviewListEntry.jsx';

const ReviewList = (props) => (
    <div>
        {props.currentReviews.map((review) => (
            <ReviewListEntry review={review}/>
        ))}
    </div>
)

export default ReviewList;