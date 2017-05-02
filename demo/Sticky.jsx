import React from 'react';
import ReactDOM from 'react-dom';
import Scroller from '../src/Scroller';
import Sticky from '../src/Sticky';
import data from '../mock/component.list.sticky.json';
import  './basic.scss';
import './Sticky.scss';

const ajax = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data)
        }, 500)
    })
}

class Example extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            groups: []
        };

        this.titleIndex = 0;

        this.fetchData = this.fetchData.bind(this);

        this.pullRefreshAction = this.pullRefreshAction.bind(this);
        this.loadMoreAction = this.loadMoreAction.bind(this);

        this.getContent = this.getContent.bind(this);
    }

    componentDidMount() {
        this.fetchData('refresh');
    }

    /**
     * 获取列表内容
     * */
    getContent(group) {
        let itemIndex = 1;
        return (
            <ul>
                {
                    group.items.map(
                        item => (
                            <li
                                key={`list-sticky-${itemIndex}`}
                                className="list-sticky list-sticky-item"
                            >{`${itemIndex++}. ${item}`}</li>
                        )
                    )
                }
            </ul>
        )
    }

    /**
     * 获取组内容
     * */
    getGroup() {
        return (
            <ul>
                {
                    this.state.groups.map(
                        group => (
                            <li key={`list-stick-${this.titleIndex++}`}>
                                <Sticky>
                                    <div className="list-sticky list-sticky-title">{group.title}</div>
                                </Sticky>
                                {this.getContent(group)}
                            </li>
                        )
                    )
                }
            </ul>
        )
    }

    /**
     * 获取数据
     * */
    fetchData(type, resolve, reject) {
        ajax({
            url: 'component.list.sticky',
            type: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'gw-rest-action': 'component.list.sticky'
            }
        }).then(data => {
            if (resolve) {
                resolve();
            }

            const groups = data.value.groups;

            this.setState({
                groups: type === 'refresh' ? groups : this.state.groups.concat(groups)
            });
        }).catch(() => {
            if (reject) {
                reject();
            }
        });
    }

    /**
     * 下拉刷新动作
     * */
    pullRefreshAction(resolve, reject) {
        this.fetchData('refresh', resolve, reject);
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction(resolve, reject) {
        this.fetchData('load', resolve, reject);
    }

    render() {
        return (
            <Scroller
                usePullRefresh
                pullRefreshAction={this.pullRefreshAction}
                useLoadMore
                loadMoreAction={this.loadMoreAction}
                useSticky
                onScroll={() => {}}
            >
                {this.getGroup()}
            </Scroller>
        )
    }
}

ReactDOM.render(
    <Example />, document.getElementById('root')
)
