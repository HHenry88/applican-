import React, { Component } from 'react';
import { connect } from 'react-redux';
import JobListEntry from './jobListEntry';
import Button from 'muicss/lib/react/button';


class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSelect: 0,
    };
    this.handlePageNumberClick.bind(this);
  }

  handlePageNumberClick(e) {
    e.preventDefault();
    this.setState({ pageSelect: (e.target.value * 10) - 10 });
  }

  render() {
    const pages = Array.from(Array(Math.floor((this.props.jobAPIData.data.length) / 10)).keys(), val => val + 1);
    return (
      <div>
        <div>
          {pages.map(num => (
            <Button
              size="small"
              color="primary"
              variant="raised"
              value={num}
              key={num * Math.random()}
              onClick={e => this.handlePageNumberClick(e)}
            >Page {num}
            </Button>))}
        </div><br />
        {this.props.jobAPIData.data.slice(this.state.pageSelect, this.state.pageSelect + 10)
          .map(job => (<JobListEntry job={job} key={job.detailUrl} history={this.props.history} />))}
      </div>
    );
  }
}

const mapStateToProps = state => ({ jobAPIData: state.jobAPIData });

export default connect(mapStateToProps)(JobList);
