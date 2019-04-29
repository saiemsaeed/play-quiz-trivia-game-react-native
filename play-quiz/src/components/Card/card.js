import React from 'react';
import { Card, Icon, Avatar, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const CustomCard = props => {
  console.log(props, 'CARD PROPS');
  const { image, name, tagline, category, topicId } = props;
  return (
    <Card
      style={{ width: 300, margin: '12px' }}
      // cover={<img alt={name} src={image} />}
      actions={[<Icon type="delete" />, <Icon type="right" />]}
    >
      <Link to={`/questions/${topicId}`}>
        <Tooltip title="Add Questions">
          <Meta
            // avatar={
            //   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            // }
            title={name.charAt(0).toUpperCase() + name.slice(1)}
            description={`${tagline} - ${category}`}
          />
        </Tooltip>
      </Link>
    </Card>
  );
};

export default CustomCard;
