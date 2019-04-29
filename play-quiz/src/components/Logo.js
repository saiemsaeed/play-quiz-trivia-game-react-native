import React, { PureComponent } from 'react';
import { Typography } from 'antd';
export default class Logo extends PureComponent {
  render() {
    return (
      <Typography.Title
        level={3}
        style={{
          fontWeight: 700,
          letterSpacing: `3px`,
          fontSize: `15px`,
          marginBottom: `0px`,
          color: `#1872d5`
        }}
      >
        PLAY QUIZ
      </Typography.Title>
    );
  }
}
