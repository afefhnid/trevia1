import React from 'react';
import loaderImg from '../../assets/img/loader.svg';
import './loader.css';

const Loader = () => {
    return (
        <div className = 'container'>
        <img src={loaderImg} alt='loading' />
        </div>    
    )
}

export default Loader;