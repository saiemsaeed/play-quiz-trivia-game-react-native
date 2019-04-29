import React, { PureComponent } from 'react';
import { Button, Table, Tooltip, Input } from 'antd';
import { connect } from 'react-redux';
import {
  getCategories,
  deleteCategory,
  addCategory,
  changeNewCategoryName
} from '../../actions/categories';

const AddCat = Input.Search;

class Categories extends PureComponent {
  componentDidMount() {
    if (this.props.users && this.props.users.currentUser) {
      this.props.getCategories(this.props.users.currentUser.uid);
    }
  }
  componentDidUpdate() {}
  componentWillReceiveProps(nextProps) {
    console.log(this.props, 'THIS PROPS');
    console.log(nextProps, 'NEXT PROPS');
    if (nextProps.users.currentUser != this.props.users.currentUser) {
      this.props.getCategories(nextProps.users.currentUser.uid);
    }
  }

  componentWillUnmount() {
    this.props.categories.unsubscribe();
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['aescend', 'descend']
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Tooltip title="Delete Category">
              <Button
                type="primary"
                shape="circle"
                icon="delete"
                onClick={() => {
                  this.props.deleteCategory(record.key);
                }}
              />
            </Tooltip>
          </span>
        )
      }
    ];

    const data = this.props.categories.categories.map(cat => ({
      key: cat,
      name: cat.toUpperCase()
    }));

    function onChange(pagination, filters, sorter) {
      console.log('params', pagination, filters, sorter);
    }

    return (
      <>
        <Table
          loading={this.props.categories.loading}
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
        <div style={{ display: 'flex' }}>
          <Input
            placeholder="Your Category Name"
            enterButton="Add"
            size="default"
            onChange={e => this.props.changeNewCategoryName(e.target.value)}
            value={this.props.categories.newCategoryName}
          />
          <Button
            style={{ margin: '0 10px' }}
            loading={this.props.categories.addLoading}
            type="primary"
            onClick={value =>
              this.props.addCategory(
                this.props.categories.newCategoryName,
                this.props.users.currentUser.uid,
                this.props.users.currentUser.displayName
              )
            }
          >
            Add
          </Button>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ users, categories }) => ({ users, categories });

const mapDispathToProps = dispatch => ({
  getCategories: userId => dispatch(getCategories(userId)),
  deleteCategory: catId => dispatch(deleteCategory(catId)),
  addCategory: (name, userId, userName) =>
    dispatch(addCategory(name, userId, userName)),
  changeNewCategoryName: newName => dispatch(changeNewCategoryName(newName))
});

export default connect(
  mapStateToProps,
  mapDispathToProps
)(Categories);
