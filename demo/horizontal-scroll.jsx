import React from 'react';
import ReactDOM from 'react-dom';
import Scroller from '../src/Scroller';
import './basic.scss';
import './horizontal-scroll.scss';

const Tabs = ['审批', '备忘', '客户', '计划', '台历', '邮箱', '日志', '主线'];

class Example extends React.Component {
    constructor(props) {
        super(props);

        this.clickHandle = this.clickHandle.bind(this);
    }

    key = 0;

    clickHandle() {
        this.scroller.scrollTo(-100, 0, 400);
    }

    render() {
        return (
            <div>
                <Scroller
                    scrollX
                    eventPassthrough
                    scrollY={false}
                    containerStyle={{
                        borderBottom: '1px solid #f5954f'
                    }}
                    ref={ref => { this.scroller = ref }}
                >
                    <ul className="nav-items">
                        {
                            Tabs.map(item => <li key={this.key++} className="nav-item">{item}</li>)
                        }
                    </ul>
                </Scroller>
                <p className="content" onClick={this.clickHandle}>测试</p>
            </div>
        )
    }
}


ReactDOM.render(
    <Example />, document.getElementById('root')
)
