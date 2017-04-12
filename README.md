## 介绍

React版iScroll并且集成下拉刷新，上拉加载更多，Sticky等功能 Edit

正式版,已经在大型商业项目生产环境中使用,大家有问题可以提issue,永久更新.

> 滚动原理:
该组件是通过提供一个容器（container）和一个滑块 (scroller) 实现的。容器必须有一个确定的高度才能正常工作，滑块通过两种方案实现滚动
 - 1、CSS3动画实现方案 transition + transform
 - 2、通过requestAnimationFrame + transform实现，这样做是为了更加精细的控制滚动过程，但是会稍微牺牲性能

> 功能:
 - 1、提供横向滚动、纵向滚动和自由滚动
 - 2、提供下拉刷新和上拉加载更多功能

 注意⚠：`容器必须有一个高度，️实现确定高度的方式有很多：flex布局，指定具体高度，position:absolute等等`

## 安装

```bash
$ npm install silk-scroller --save
```

## 使用
> Scroller

```jsx
import Scroller from 'silk-scroller';

class Example extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lists: []
        };

        this.index = 1;

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
    getContent() {
        return this.state.lists.map(
            list => <li key={`list${this.index}`} className="list-view-item">{`${this.index++}. ${list}`}</li>
        )
    }

    /**
     * 获取数据
     * */
    fetchData(type, resolve) {
        if (resolve) { resolve(); }

        const lists = data.value.lists;

        this.setState({
            lists: type === 'refresh' ? lists : this.state.lists.concat(lists)
        });
    }

    /**
     * 下拉刷新动作
     * */
    pullRefreshAction(resolve, reject) {
        this.index = 1;
        setTimeout(() => {
            this.fetchData('refresh', resolve, reject);
        }, 2000);
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction(resolve, reject) {
        setTimeout(() => {
            this.fetchData('load', resolve, reject);
        }, 2000);
    }

    render() {
        return (
            <Scroller
                usePullRefresh
                pullRefreshAction={this.pullRefreshAction}
                useLoadMore
                loadMoreAction={this.loadMoreAction}
                noMoreData
            >
                <ul>{this.getContent()}</ul>
            </Scroller>
        )
    }
}

ReactDOM.render(
  <Example/>,mountNode
)
```

> Sticky粘性布局

```jsx
import Scroller,{Sticky} from 'silk-scroller';

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
        }).done(data => {
            if (resolve) { resolve(); }

            const groups = data.value.groups;

            this.setState({
                groups: type === 'refresh' ? groups : this.state.groups.concat(groups)
            });
        }).fail(() => {
            if (reject) { reject(); }
        });
    }

    /**
     * 下拉刷新动作
     * */
    pullRefreshAction(resolve, reject) {
        setTimeout(() => {
            this.fetchData('refresh', resolve, reject);
        }, 2000);
    }

    /**
     * 上拉加载更多动作
     * */
    loadMoreAction(resolve, reject) {
        setTimeout(() => {
            this.fetchData('load', resolve, reject);
        }, 2000);
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
  <Example/>,mountNode
)

```

注意⚠️：`粘性布局需要在Scroller组件中开启useSticky`

## API

### Scroller
> 基础API，只操作这些参数就可以满足一般性需求

| 成员             | 说明           | 类型       |  可选值        | 默认值       |
|---------------- |----------------|----------|----------|--------------|
| children | 传递给Scroller组件的子节点 | react Element 或 DOM | | |
| usePullRefresh | 是否开启下拉刷新 | Boolean | true, false | false |
| useLoadMore | 是否开启上拉加载更多 | Boolean | true, false | false |
| useSticky   | 是否启用吸顶功能    | Boolean  | true, false | false |
| pullRefreshAction | 下拉刷新触发的回调函数, 详见`Tip4` | Function | | |
| loadMoreAction | 上拉加载更多的回调函数，详见`Tip4` | Function | | |
| lang | 多语言 | String | 'zh_CN', 'zh_TW', 'en_US' | 'zh_CN' |
| containerClass | 为容器指定className | String | | |
| containerStyle | 为容器指定样式 | Object | | |
| scrollerClass  | 为滑块指定className | String | | |
| scrollerStyle  | 为滑块指定样式 | Object | | |
| noMoreData | 是否有更多数据 | Boolean | true, false | |
| autoLoad   | 是否开启滑动到底部自动加载更多 | Boolean | true, false | true |

> 方法

| 成员     | 说明    |
|---------|---------|
| scrollTo | 滚动到指定的位置，接受4个参数 x - 滚动到指定的x坐标 y - 滚动到指定的y坐标 time - 滚动到指定位置需要的时间 easing - 缓动动画|
| refresh  | 刷新Scroller |
| simulatePullRefresh | 模拟下拉刷新的方法，用于非手势触发的下拉刷新 |

`Tip`: simulatePullRefresh该函数接收一个参数`time` 用于指定滑块滚下来的时间，默认为`300ms`

> 高级API，如无特殊要求，建议用默认值即可

| 成员             | 说明           | 类型       |  可选值        | 默认值       |
|---------------- |----------------|----------|----------|--------------|
| bounce         |   是否开启弹性滚动   | Boolean | true, false  |  true |
| bounceEasing   |   自定义弹性动画   | Object |   | 见`Tip1`  |
| bounceTime        | 缓动时间       | Number | |  600  |
| contentOffset        | 列表的初始偏移量 | Object | |   {x: 0, y: 0}  |
| deceleration | 阻尼系数，用来控制动画的运动幅度 | Number | | 0.0024 |
| disable  | 是否禁用Scroller组件 | Boolean | true, false | false |
| eventPassthrough | 见`Tip2` | Boolean或String | true, false, 'horizontal', 'vertical' |
| directionLockThreshold | 方向锁定阈值 | Number | | 5 |
| freeScroll | 是否允许组件自由滚动 | Boolean | true, false | false |
| momentum | 是否开启组件的动量效果 | Boolean | true, false | true |
| HWCompositing | 是否开启硬件加速 | Boolean | true, false | true |
| preventDefault | 是否组织触发默认事件 | Boolean | true, false | true |
| preventDefaultException | 符合该类规则的元素的默认事件不组织| Object | | 见`Tip3` |
| scrollX | 是否开启X轴滚动 | Boolean | true, false | false |
| scrollY | 是否开启Y轴滚动 | Boolean | true, false | true |
| useTransform | 是否启用transform | Boolean | true, false | true |
| useTransition | 是否启用transition | Boolean | true, false | true |
| onBeforeScrollStart | 开始滚动前的回调 | Function | | |
| onScrollStart | 开始滚动时的回调 | Function | | |
| onScroll | 滚动回调 | Function | | |
| onScrollEnd | 滚动结束回调 | Function | | |
| onScrollCancel | 取消滚动触发的回调 | Function | | |
| onRefresh | 刷新回调 | Function | | |


 > `Tip1`: bounceEasing说明

该属性接受一个对象类型，该对象包含一个style属性和一个fn属性，用来支持css动画或者js动画

默认值如下：

```js
{
    style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
    fn: (k) => {
        const _k = k - 1;
        return Math.sqrt(1 - (_k * _k));
    }
}
```

> `Tip2` eventPassthrough说明
有时想要保留原生的垂直滚动，但是想要添加一个水平滚动的IScroll(例如：carousel), 可以把这个值设置为true，这样就可以响应
水平方向的`swiper`，垂直滚动会滚动整个页面，同时也可以设置为`horizontal`或者`vertical`

> `Tip3` preventDefaultException说明
如果要使某个元素的preventDefault事件不生效，则需要设置该值，默认值如下：

```js
{
    tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
}
```

> `Tip4` pullRefreshAction、loadMoreAction说明
这两个函数都接受两个参数 resolve、reject
如果是异步请求的话，成功后直接调用`resolve()`,失败调用`reject()`, Scroller的状态就会发生相应的变化
