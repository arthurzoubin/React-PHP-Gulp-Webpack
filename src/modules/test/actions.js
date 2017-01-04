'use strict';

import {JOIN} from './types';

export const join = () => {
    return (dispatch) => {
        dispatch({
            type: JOIN
        })
    }
}