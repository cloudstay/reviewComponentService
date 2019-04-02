import React from 'react';
import moment from 'moment';

const ReviewListEntry = (props) => (
    <div>
        <div id="top_review_entry">
            <div id="review_entry_image" style={{backgroundImage: `url(${props.review.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPositionX: '50%', backgroundPositionY: '50%'}}></div>
            <div id="review_entry_info">
                <div id="review_entry_name">{props.review.customer_name}</div>
                <div id="review_entry_date">{moment(props.review.date).format('MMMM YYYY')}</div>
            </div>
        </div>
        <div id="bottom_review_entry">{props.review.body}</div>
        <div id="divisor_review_entry"></div>
    </div>
)

export default ReviewListEntry;