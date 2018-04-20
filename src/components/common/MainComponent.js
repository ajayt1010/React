import React from "react";
import { List } from './List';
import { connect } from "react-redux";
export class MainComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sortDirection: 1
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onSortClick = this.onSortClick.bind(this);
    }

    onSortClick() {
        const { sortDirection } = this.state;
        const { gifs } = this.props;
        this.setState({
            sortDirection: (-1) * sortDirection
        }, () => {
            this.props.dispatch({
                type: 'SORT_GIFS',
                direction: this.state.sortDirection
            });
        });
       
    }
    onInputChange(e) {
        this.props.dispatch({
            type: 'SEARCH_GIFS',
            query: e.target.value,
        });
    }

    // render
    render() {
        const { gifs } = this.props;
        return (
            <div className="main">
                <input type="text" onChange={(e) => this.onInputChange(e)} className="input-search" />
                <button disabled={gifs.length === 0} onClick={(e) => this.onSortClick(e)} className="sort-list">Sort By Title</button>
                {gifs.length > 0 && <List {...this.props} />}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        gifs: state.gifs.gifs
    };
}
export default connect(mapStateToProps)(MainComponent);