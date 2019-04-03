import React from 'react';
import $ from 'jquery';
import AverageRatings from './averageRatings.jsx';
import ReviewList from './reviewList.jsx';

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            back: '',
            comment: '',
            id: 188,
            length: 0,
            reviews: [],
            search: '',
            isHidden: true,

            activePage: 1,
            reviewsPerPage: 6,
        }
    }

    componentDidMount() {
        $.ajax({
            url: `http://127.0.0.1:3004/api/rooms?id=${this.state.id}`,
            method: 'GET',
            success: (data) => {
                this.setState({
                    reviews: data,
                    length: data.length,
                })
                this.initialState = this.state
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
                        back: 'Back to all reviews',
                        comment: data.length > 0 ? `` : `None of our guests have mentioned "${this.state.search}"`,
                        reviews: data,
                        isHidden: data.length > 0 ? true : false,
                    })
                )
            })
        }
    }

    handleClick(number) {
        this.setState({
            activePage: Number(number)
        });
        window.scrollTo({top: 200, left: 0, behavior: 'smooth' });
    }

    handleRefresh() {
        this.setState(
            this.initialState
        )
    }
    

    render() {
        const indexOfLastReview = this.state.activePage * this.state.reviewsPerPage;

        const indexOfFirstReview = indexOfLastReview - this.state.reviewsPerPage;

        const currentReviews = this.state.reviews.slice(indexOfFirstReview, indexOfLastReview);
        
        // Displaying page numbers
        const pageNumbers = [];

        for(let i = 1; i <= Math.ceil(this.state.length/this.state.reviewsPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map((number) => (
            <button id="one_page_button" onClick={() => this.handleClick(number)}><div id={(this.state.activePage === number) ? "one_page_div" : ""}>{number}</div></button>
        ))

        return (
            <div>
                <div id="summary_container">
                    <div id="summary_reviews_container">
                        <span>{this.state.length} Reviews</span>
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

                <div style={this.state.isHidden ? {display: "block"} : {display: "none"}}><AverageRatings reviews={this.state.reviews}/></div>

                <div><ReviewList currentReviews={currentReviews}/></div>


                <ul id="page_numbers" style={this.state.isHidden ? {display: "block"} : {display: "none"}}>{renderPageNumbers}</ul>

                <div id="footer_container">
                    <span id="results_comment">{this.state.comment}</span> 
                    <button id="refresh_button" onClick={() => this.handleRefresh()}>{this.state.back}</button>
                </div>

            </div>
        )
    }
}

export default App;