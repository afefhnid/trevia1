import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './home.css'

const Home = ({categories, getCategoryScore, getFinalScore, isLoading, winner, rest, style,}) => (

    <section style={{visibility: sessionStorage.getItem('style')}}>
        <button onClick={rest} className={'third'} style={{backgroundColor: "#00bfff",float: 'right'}}>Rest le Score</button>
        <h1 >Homepage</h1>

        <div>{winner()}</div>
        {!isLoading

            ? <div style={{marginTop:'100px'}}>
                <table className="container">
                    <thead>
                    <tr>
                        <th><h1>Catégories</h1></th>
                        <th><h1>Score</h1></th>
                    </tr>
                    </thead>
                    {categories.map((category, index) => (

                        <tbody key={index}>
                        <tr>
                            <td><Link style={{color: "#FFFFFF"}} to={`/categories/${category.id}`} key={category.id}>
                                {category.title}
                            </Link>
                            </td>
                            <td>
                                <button>{getCategoryScore(category)} </button>
                            </td>

                        </tr>
                        </tbody>
                    ))}
                    <tbody>
                    <tr>
                        <td>Score Finale</td>
                        <td>{getFinalScore()}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            : <div>Je load</div>
        }

    </section>

);

Home.propTypes = {
    rest: PropTypes.func.isRequired,
    style: PropTypes.string,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            title: PropTypes.string,
            clues_count: PropTypes.number,
        }),
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,

};


export default Home;