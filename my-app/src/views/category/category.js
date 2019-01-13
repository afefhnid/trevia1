import React from 'react';
import PropTypes from 'prop-types';

const Category = ({category, currentQuestionIndex, handleSubmit, answerInput, change, getCategoryScore}) => {

    const currentQuestion = category.clues[currentQuestionIndex];
    //store the idQuestion in localStorage
    localStorage.setItem('idQuestion', currentQuestion.id);
    let answer = currentQuestion.answer;
    localStorage.setItem('answer', currentQuestion.answer);
    console.log(answer);

    return (
        <section>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <button className={'third'} style={{backgroundColor: "#00bfff",}} onClick={change}>Changer de
                    catégorie
                </button>
            </div >
            <form onSubmit={handleSubmit}>
                <h1>You choosed: {category.title}</h1>
                <div className="question">
                    <h3 className="question__title">
                        {currentQuestion.question}

                    </h3>
                    <div className="question__answerInput">
                        {/* We give the ref below in order check the value */}
                        <input ref={answerInput}/>

                    </div>
                    <div>{getCategoryScore(category)} </div>
                    <button className="question__submit" type="submit">
                        Next
                    </button>
                    <div>{sessionStorage.getItem('resultat')}</div>
                    <div>{sessionStorage.getItem('score')}</div>
                </div>
            </form>

        </section>
    );
}

Category.propTypes = {
    category: PropTypes.shape({}).isRequired,
    currentQuestionIndex: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    answerInput: PropTypes.shape({
        value: PropTypes.instanceOf(HTMLInputElement)
    }),
};

export default Category;