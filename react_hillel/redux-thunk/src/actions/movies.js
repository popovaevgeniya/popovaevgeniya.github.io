import axios from "axios";

import { history } from '../index'

import {
    GET_MOVIES_PENDING,
    GET_MOVIES_REJECTED,
    GET_MOVIES_RESOLVED,
    URL_MOVIE
} from "../constants";

const getMoviesPending = () => ({ type: GET_MOVIES_PENDING });
const getMoviesResolved = (payload) => ({
    type: GET_MOVIES_RESOLVED,
    payload
});
const getMoviesRejected = () => ({
    type: GET_MOVIES_REJECTED,
    payload: "Something wrong!"
});

export const getMovies = () => {
    return (dispatch) => {
        dispatch(getMoviesPending());
        axios.get(URL_MOVIE)
            .then(({ data }) => {
                dispatch(getMoviesResolved(data.movie));
                history.push('/');
            })
            .catch((error) => {
                console.dir(error);
                dispatch(getMoviesRejected());
            });
    };
};