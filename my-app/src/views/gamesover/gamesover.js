import React, {Component} from 'react';
import './gamesover.css';

class GamesOver extends Component {


    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

    }
    handleClick(){
        this.props.history.push("/");
        console.log('test');
        sessionStorage.setItem('categoryScore', '{}');
    }
    render() {

        return (

            <div>
                <p>GAME OVER</p>

                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <button className={'third'}style={{backgroundColor: "#00bfff",}} onClick={this.handleClick}>Play Again</button>
                </div>
            </div>
        );
    }
}

export default GamesOver;