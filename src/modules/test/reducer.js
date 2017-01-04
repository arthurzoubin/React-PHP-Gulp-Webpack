'use strict';

import update from 'immutability-helper'
import {JOIN} from './types';

const initialState = {
    name: "Arthur",
    customers: [],
    count: 0
}

const testReducer = (state = initialState, action) => {
    switch(action.type){
        case JOIN:
            let newCount = state.count + 1;
            let newState = update(state, {
                customers: {$push: [{
                    id: newCount,
                    name: "Arthur"
                }]},
                count: {$set: newCount}
            });

            return newState;
        default:
            return state;
    }
}

export default testReducer;