import React from 'react';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';


const ReviewListEntry = (props) => {

    const applyBoldStyle = (body) => {
        const str = body.split(" ");
        
        if(props.isActive) {
            const arr = [];
            str.map((word) => {
                const search = props.search.trim().toLowerCase();
                const tempWord = word.toLowerCase();
                
                if(tempWord == search || tempWord.slice(0, tempWord.length - 1) == search) {
                    arr.push(`<b>${word}</b>`)
                } else {
                    arr.push(word)
                }
            })
            const newStr = arr.join(' ');
            return <div>{ReactHtmlParser(newStr)}</div>; 
        } else {
            return body; 
        }
    }

    return (
        <div>
            <div id="top_review_entry">
                <div id="review_entry_image" style={{backgroundImage: `url(${props.review.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPositionX: '50%', backgroundPositionY: '50%'}}></div>
                <div id="review_entry_info">
                    <div id="review_entry_name">{props.review.customer_name}</div>
                    <div id="review_entry_date">{moment(props.review.date).format('MMMM YYYY')}</div>
                </div>
            </div>
            <div id="bottom_review_entry">{applyBoldStyle(props.review.body)}</div>
            <div id="divisor_review_entry"></div>
        </div>
    )
}

export default ReviewListEntry;