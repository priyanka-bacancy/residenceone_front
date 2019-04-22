import React, { Component } from 'react';
import ReactTable from 'react-table';

class Table extends Component {
  render() {
    const { total_pages, current_page } = this.props.values
    return (
      <ReactTable
        className='-striped'

        manual

        data={this.props.data}
        columns={this.props.columns}

        pages={total_pages}
        page={current_page - 1}
        onPageChange={this.props.onPageChange}
        onPageSizeChange={this.props.onPageSizeChange}

        filterable
        onFilteredChange={this.props.onFilteredChange}

        sortable
        onSortedChange={this.props.onSortedChange}
      />
    );
  }
}
export default Table; 