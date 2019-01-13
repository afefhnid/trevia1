import React, {Component, createRef} from 'react';
import api from '../../helpers/api';
import Category from './category';
import Home from "../home/home";

class CategoryContainer extends Component {
    state = {
        category: null,
        currentQuestion: 0,
        id: "",
        idQuestion: '',
        fautes: 0,
        categoryScore: {}
    }

    answerInput = createRef();

    async componentDidMount() {
        //get categoryScore
        var categoryScore = sessionStorage.getItem('categoryScore');
        if (categoryScore) {

            this.setState({categoryScore: JSON.parse(categoryScore)});
        } else {

        }

        sessionStorage.setItem('resultat', "");
        //get the list off question for this category
        const data = await api.getCategoryById(this.props.match.params.id);
        //store  this category
        this.setState({category: data});
        this.state.categoryScore[this.state.category.id] = 0;

    }

    handleSubmit = (e) => {

        // here I prevent de fault bh of submitting form
        e.preventDefault();
        //get  and store the answer
        const answer = this.answerInput.current.value;
        let b = localStorage.getItem('answer');
        //if the answer a true
        if (answer === b) {

            try {
                //if we don't get the categories id ==>categoryScore null
                if (!this.state.categoryScore[this.state.category.id]) {
                    this.state.categoryScore[this.state.category.id] = 0;
                }
                //else  increment our categoryScore and store it in sessionStorage categoryScore
                this.state.categoryScore[this.state.category.id]++;
                sessionStorage.setItem('categoryScore', JSON.stringify(this.state.categoryScore));
            } catch (e) {

            }
            //to say that a good answer
            sessionStorage.setItem('resultat', "Bravo");
        } else {
            //to say that a bad answer
            sessionStorage.setItem('resultat', "Noo");
            // increment the number off bad answers
            this.setState.fautes = this.state.fautes++;
            // if the number off bad answer higher than 3 reste the score
            if ((this.state.fautes) >= 2) {
                this.state.categoryScore[this.state.category.id] = 0;
                sessionStorage.setItem('categoryScore', JSON.stringify(this.state.categoryScore));

            }
        }

        var id = this.state.amount;
        //get only 5 question for category
        if (this.state.currentQuestion < 4) {
            this.setState({currentQuestion: this.state.currentQuestion + 1});
        } else {
            this.props.history.push("/");
            sessionStorage.removeItem('score');

        }
        ;

    };
    //change the category
    change = (e) => {
        this.props.history.push("/");
        this.state.categoryScore[this.state.category.id] = 0;
        sessionStorage.setItem('categoryScore', JSON.stringify(this.state.categoryScore));
    }
    ;
    //get the  getCategoryScore
    getCategoryScore(category){

        try {
            var categoryScore = JSON.parse(sessionStorage.getItem('categoryScore'));
            if (categoryScore && categoryScore[category.id]) {
                return categoryScore[category.id];
            }
        } catch (e) {}

        return 0;
    }

    render() {
        const {category, currentQuestion} = this.state;
        // at first render, category will be null so we need to wait
        // before using data.
        if (!category) return <div>is loading</div>;
        return (
            <Category
                category={category}
                currentQuestionIndex={currentQuestion}
                handleSubmit={this.handleSubmit}
                change={this.change}
                getCategoryScore={this.getCategoryScore}
                answerInput={this.answerInput} // plug createRef to chidlren

            />

        );
    }
}

export default CategoryContainer;

