import React from "react";
// reactstrap components
import {
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import PropTypes from "prop-types";
import {selectProjectsOffset} from "../../../actions";
import {connect} from "react-redux";

class PaginationSection extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    totalCount:PropTypes.number.isRequired,
    selectedProjectsOffset:PropTypes.number.isRequired
  }

  handleChange(newOffset) {
    this.props.dispatch(selectProjectsOffset(newOffset))
  }

  createPagination = () => {
    const maxLength = this.props.totalCount/10;
    let currentIndex = this.props.selectedProjectsOffset/10;
    let table = []
    for (let i = 0; i < maxLength; i++) {
      table.push(
          <PaginationItem className= {(i === currentIndex) ? "active": ""} >
            <PaginationLink
                onClick={() => this.handleChange(i * 10)}
            >
              {i+1}
            </PaginationLink>
          </PaginationItem>
      )
    }
    table =  this.paginate(table,3,currentIndex)
    if(currentIndex > 1)
    {
      table.unshift(
          <PaginationItem>
            <PaginationLink
                aria-label="Previous"
                onClick={() => this.handleChange(this.props.selectedProjectsOffset-2*10)}
            >
                    <span aria-hidden={true}>
                      <i
                          aria-hidden={true}
                          className="tim-icons icon-double-left"
                      />
                    </span>
            </PaginationLink>
          </PaginationItem>
      )
    }

      if(maxLength - currentIndex > 2)
      {
          table.push(
              <PaginationItem>
                  <PaginationLink
                      aria-label="Next"
                      onClick={() => this.handleChange(this.props.selectedProjectsOffset+2*10)}
                  >
                    <span aria-hidden={true}>
                      <i
                          aria-hidden={true}
                          className="tim-icons icon-double-right"
                      />
                    </span>
                  </PaginationLink>
              </PaginationItem>
          )
      }

    return table;
  }

   paginate = (array, page_size, page_number) => {
    if(page_number < 1)
    {
      return array.slice(page_number ,  page_size);
    }
    else{
      return array.slice(page_number-1, (page_number + 2) );
    }
  }

  render() {
    return (
      <div>
              <Pagination
                className="pagination pagination-info"
                listClassName="pagination-info"
              >
                {this.createPagination()}
              </Pagination>
              <br />

      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    selectedProjectsOffset,
  } = state || {
    selectedProjectsOffset: 0
  }
  return { selectedProjectsOffset }
}

export default connect(mapStateToProps)(PaginationSection)
