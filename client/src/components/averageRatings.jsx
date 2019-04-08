import React from 'react';

const AverageRatings = (props) => {
    var length = props.reviews.length;
    var avgAccuracy = 0;
    var avgCommunication = 0;
    var avgCleanliness = 0;
    var avgLocation = 0;
    var avgCheckin = 0;
    var avgValue = 0;

    for(var i = 0; i < length; i++ ) {
        avgAccuracy += parseInt(props.reviews[i].accuracy_rating);
        avgCommunication += parseInt(props.reviews[i].communication_rating);
        avgCleanliness += parseInt(props.reviews[i].cleanliness_rating);

        avgLocation += parseInt(props.reviews[i].location_rating);
        avgCheckin += parseInt(props.reviews[i].check_in_rating);
        avgValue += parseInt(props.reviews[i].value_rating);
    }

    avgAccuracy = avgAccuracy/length;
    avgCommunication = avgCommunication/length;
    avgCleanliness = avgCleanliness/length;
    avgLocation = avgLocation/length;
    avgCheckin = avgCheckin/length;
    avgValue = avgValue/length;

    return (
        <div> 
            <div id="average_ratings_container" >
                <div id="left_average_ratings">
                    <div>Accuracy</div>
                    <div>Communication</div>
                    <div>Cleanliness</div>
                </div>

                <div id="left_average_star_container">
                    <div>{props.starFill(avgAccuracy)}</div>
                    <div>{props.starFill(avgCommunication)}</div>
                    <div>{props.starFill(avgCleanliness)}</div>
                </div>
                
                <div id="right_average_ratings">
                    <div>Location</div>
                    <div>Check-in</div>
                    <div>Value</div>
                </div>

                <div id="right_average_star_container">
                    <div>{props.starFill(avgLocation)}</div>
                    <div>{props.starFill(avgCheckin)}</div>
                    <div>{props.starFill(avgValue)}</div>
                </div>
            </div>
        </div>

    )
}

export default AverageRatings;