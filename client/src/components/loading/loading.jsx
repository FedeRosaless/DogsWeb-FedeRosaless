import React from 'react';
import './styles.css';
import LoadingImg from './LoadingGif/LoadingImg.gif';

export default function Loading(){
    return (
        <div className='loader'>
            <h2 className='load'>Loading...</h2>
            <img src={LoadingImg} className='loading' alt="loading" />
        </div>
        );
};