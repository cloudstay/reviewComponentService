import React from 'react';
import $ from 'jquery';
import AverageRatings from './averageRatings.jsx';
import ReviewList from './reviewList.jsx';


class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 100,
            reviews: [],
            search: ''
        }
    }

    componentDidMount() {
        $.ajax({
            url: `http://127.0.0.1:3004/api/rooms?id=${this.state.id}`,
            method: 'GET',
            success: (data) => {
                this.setState({
                    reviews: data,
                })
            }
        })
    }

    handleChange(e) {
        this.setState({
            search: e.target.value,
        })
    }

    handleSubmit(e) {
        if(e.keyCode === 13 && e.shiftKey === false) {
            $.ajax({
                url: `http://127.0.0.1:3004/api/reviews?id=${this.state.id}&search=${this.state.search}`,
                method: 'GET',
                success: (data) => (
                    this.setState({
                        search: data
                    })
                )
            })
        }
    }

    render() {
        return (
            <div>
                <div id="summary_container">
                    <div id="summary_reviews_container">
                        <span>{this.state.reviews.length} Reviews</span>
                        <span id="star_container">
                            <span id="average_star_1"> </span><span id="average_star_2"> </span><span id="average_star_3"> </span><span id="average_star_4"> </span><span id="average_star_5"> </span>
                        </span>
                    </div>
                    <div id="summary_search_container">
                        <div id="icon_search_container">
                        </div>
                        <div id="input_search_container">
                            <input id="search_input" type="text" placeholder="Search reviews" onChange={(e) => this.handleChange(e)} onKeyDown={(e) => this.handleSubmit(e)}/>
                        </div>
                    </div>
                </div>
                <div><AverageRatings reviews={this.state.reviews}/></div>
                <div><ReviewList reviews={this.state.reviews}/></div>
            </div>
        )
    }
}

export default App;