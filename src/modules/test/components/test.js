'use strict';

import React, {Component} from 'react';

import Test2 from './test2';

class Test extends Component {

    renderItem(item, i){
        return <li key={i}>
            <span>{item.name}</span>
        </li>
    }

    render(){
        var {name, count, customers, actions} = this.props;
        return(
            <div>
                <h1>Test</h1>
                <Test2 />
                <h3>Hello {name}</h3>
                {
                    count && count>0?
                        <ul>
                            {customers.map(this.renderItem.bind(this))}
                        </ul>
                        :null
                }
                <div>
                    <button onClick={actions?actions.join:null}>Join</button>
                </div>
            </div>
        );
    }
}

export default Test;