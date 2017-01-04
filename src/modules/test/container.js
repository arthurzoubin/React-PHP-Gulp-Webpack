'use strict';

import * as ActionsCreator from './actions';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import Test from './components/test';

const mapStateToProps = (state) => {
    return state.test;
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(ActionsCreator, dispatch)
    }
}

const testContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Test)

export default testContainer;

