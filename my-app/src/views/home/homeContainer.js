import React, {Component} from 'react';
import Home from './home';


class HomeContainer extends Component {
    state = {
        categories: [],
        isLoading: true,
    }

    componentDidMount() {
        //if we dont have the value off categoryScore  ,set it null
        if (!sessionStorage.getItem('categoryScore')) {
            sessionStorage.setItem('categoryScore', '{}');
        }
        // get the category list from api
        fetch('http://jservice.io/api/categories?count=100').then(response => {
            response.json().then(categories => {
                this.setState({
                    categories: categories,
                    isLoading: false,
                });
            });
        })
    }

//get  getCategoryScore
    getCategoryScore(category) {

        try {
            var categoryScore = JSON.parse(sessionStorage.getItem('categoryScore'));
            if (categoryScore && categoryScore[category.id]) {
                return categoryScore[category.id];
            }
        } catch (e) {
        }

        return 0;
    }

    // get the final score
    getFinalScore() {
        var count = 0;
        try {
            var categoryScore = JSON.parse(sessionStorage.getItem('categoryScore'));

            Object.keys(categoryScore).map((key) => {
                count += categoryScore[key];
                sessionStorage.setItem('finalScore', count);

            })
        } catch (e) {
        }
        return count;
    }

    //if we have more than ten answers just say that you are winner
    winner() {
        var count = 0;
        try {
            var categoryScore = JSON.parse(sessionStorage.getItem('categoryScore'));

            Object.keys(categoryScore).map((key) => {
                count += categoryScore[key];
            })
        } catch (e) {
        }
        if (count > 10) {
            return 'T’es un winner';
        } else {
            return '';
        }

    }

    //rest the score
    rest = (e) => {
        sessionStorage.setItem('categoryScore', '{}');


    }


    render() {
        var finalScore = sessionStorage.getItem('finalScore');
        //gamesover if you open 10 category and score <25
        if (sessionStorage.getItem('categoryScore')) {
            var count = Object.keys(JSON.parse(sessionStorage.getItem('categoryScore'))).length;
            if (count > 10 && finalScore < 25) {
                this.props.history.push("/GamesOver");
            }
        }

        return (

            <Home
                categories={this.state.categories}
                getCategoryScore={this.getCategoryScore}
                getFinalScore={this.getFinalScore}
                winner={this.winner}
                rest={this.rest}
                isLoading={this.state.isLoading}


            />

        );
    }
}

export default HomeContainer;