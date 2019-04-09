import React from 'react';
import $ from 'jquery';
import ReactHtmlParser from 'react-html-parser';
import AverageRatings from './averageRatings.jsx';
import ReviewList from './reviewList.jsx';

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            back: '',
            commentNone: '',
            commentFound: '',
            id: window.location.search.slice(4,7),
            length: 0,
            reviews: [],
            fixed_reviews: [],
            search: '',
            isActive: false,
            isHidden: true,
            isHiddenFooter: true,

            activePage: 1,
            reviewsPerPage: 6,
        }
    }

    // GET Request to obtain all reviews
    componentDidMount() {
        $.ajax({
            url: `/rooms/api`,
            method: 'GET',
            data: {id: this.state.id},
            success: (data) => {
                this.setState({
                    reviews: data,
                    fixed_reviews: data,
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

    // GET Request to obtain reviews containing filter word
    handleSubmit(e) {
        if(e.keyCode === 13 && e.shiftKey === false) {
            $.ajax({
                url: `/rooms/reviews`,
                method: 'GET',
                data: {id: this.state.id,
                       search: this.state.search
                      },
                success: (data) => (
                    this.setState({
                        back: 'Back to all reviews',
                        commentNone: data.length > 0 ? `` : `None of our guests have mentioned "<b>${this.state.search}</b>"`,
                        commentFound: data.length > 0 ? `${data.length} of our guests have mentioned "<b>${this.state.search}</b>"` : ``,
                        reviews: data,
                        isActive: data.length > 0 ? true : false,
                        isHidden: false,
                        isHiddenFooter: data.length > 0 ? false : true,
                    })
                )
            })
            search_input.value = '';
        }
    }

    // Change active page
    handleClick(number) {
        this.setState({
            activePage: Number(number)
        });
        window.scrollTo({top: 200, left: 0, behavior: 'smooth' });
    }

    // Change active page to previous
    goBack() {
        this.setState({
            activePage: Number(this.state.activePage - 1)
        })
    }

    // Change active page to upcoming
    goForward() {
        this.setState({
            activePage: Number(this.state.activePage + 1)
        })
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

        // Average rating
        const average = () => {
            var ratings = this.state.fixed_reviews.length * 6;
        
            var avg = 0;
            var sum = 0;
        
            for(var i = 0; i < this.state.length; i++) {
                sum += parseInt(this.state.fixed_reviews[i].accuracy_rating);
                sum += parseInt(this.state.fixed_reviews[i].communication_rating);
                sum += parseInt(this.state.fixed_reviews[i].cleanliness_rating);
                sum += parseInt(this.state.fixed_reviews[i].location_rating);
                sum += parseInt(this.state.fixed_reviews[i].check_in_rating);
                sum += parseInt(this.state.fixed_reviews[i].value_rating);
            }
            
            avg = sum/ratings;
            return avg;
        }

        // Creating star visualization of averages
        const starFill = (avg) => {
            const arr = [];
            
            for(var i = 0; i < 5; i++) {
                if(avg >= 1) {
                    arr.push(`<span id="average_star_1"></span>`)
                    avg = avg - 1;
                } else if(avg > 0) {
                    arr.push(`<span id="average_star_2"></span>`)
                    avg = avg - avg;
                } else {
                    arr.push(`<span id="average_star_3"></span>`)
                }
            }
            const newStr = arr.join('');
            return <span>{ReactHtmlParser(newStr)}</span>;
        }

        // Returns the components
        return (
            <div>
                <div id="summary_container">
                    <div id="summary_reviews_container">
                        <span id="title">{this.state.length} Reviews</span>
                        <span id="star_container">
                            {starFill(average())}
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

                <div style={this.state.isHidden ? {display: "block"} : {display: "none"}}><AverageRatings reviews={this.state.reviews} starFill={starFill.bind(this)}/></div>
                
                <div id="results_container" style={this.state.isActive ? {display: "block"} : {display: "none"}}>
                    <span id="found_results_comment">{ReactHtmlParser(this.state.commentFound)}</span> 
                    <button id="refresh_button" onClick={() => this.handleRefresh()}>{this.state.back}</button>
                </div>

                <div id="review_list"><ReviewList currentReviews={currentReviews} search={this.state.search} isActive={this.state.isActive}/></div>


                <ul id="page_numbers" style={this.state.isHidden ? {display: "block"} : {display: "none"}}>
                    <button id="back_button" style={this.state.activePage === pageNumbers[0] ? {display: "none"} : {}} onClick={() => this.goBack()}><div id="back_div">{'<'}</div></button>
                        {renderPageNumbers}
                    <button id="forward_button" style={this.state.activePage === pageNumbers[pageNumbers.length - 1] ? {display: "none"} : {}} onClick={() => this.goForward()}><div id="forward_div">{'>'}</div></button>
                </ul>

                <div id="footer_container" style={this.state.isHiddenFooter ? {display: "block"} : {display: "none"}}>
                    <span id="none_results_comment">{ReactHtmlParser(this.state.commentNone)}</span> 
                    <button id="refresh_button" onClick={() => this.handleRefresh()}>{this.state.back}</button>
                </div>

            </div>
        )
    }
}

export default App;