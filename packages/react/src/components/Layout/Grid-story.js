/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import { storiesOf } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Column } from '../Layout';

function DemoFullPage({ children }) {
  const [portalNode, setPortalNode] = useState(null);
  const style = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  useEffect(() => {
    const node = document.createElement('div');
    document.body.appendChild(node);

    setPortalNode(node);

    return () => {
      document.body.removeChild(node);
    };
  }, []);
  return (
    portalNode &&
    ReactDOM.createPortal(
      <div className="example" style={style}>
        {children}
      </div>,
      portalNode
    )
  );
}

function Content({ children }) {
  return (
    <div className="outside">
      <div className="inside">{children}</div>
    </div>
  );
}

storiesOf('Layout|Grid', module)
  .addDecorator(story => <DemoFullPage>{story()}</DemoFullPage>)
  .add('auto-columns', () => (
    <Grid>
      <Row>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
      </Row>
    </Grid>
  ))
  .add('responsive grid', () => (
    <Grid>
      <Row>
        <Column span={[1, 4, 8]}>
          <Content>1/4</Content>
        </Column>
        <Column span={[1, 2, 2]}>
          <Content>1/4</Content>
        </Column>
        <Column span={[1, 1, 1]}>
          <Content>1/4</Content>
        </Column>
        <Column span={[1, 1, 1]}>
          <Content>1/4</Content>
        </Column>
      </Row>
    </Grid>
  ))
  .add('responsive grid - object syntax', () => (
    <Grid>
      <Row>
        <Column span={{ sm: 1, md: 4, lg: 8 }}>
          <Content>1/4</Content>
        </Column>
        <Column span={{ sm: 1, md: 2, lg: 2 }}>
          <Content>1/4</Content>
        </Column>
        <Column span={{ sm: 1, md: 1, lg: 1 }}>
          <Content>1/4</Content>
        </Column>
        <Column span={{ sm: 1, md: 1, lg: 1 }}>
          <Content>1/4</Content>
        </Column>
      </Row>
    </Grid>
  ))
  .add('offsets', () => (
    <Grid>
      <Row>
        <Column offset={[3]} span={[1]}>
          <Content>Offset 3</Content>
        </Column>
        <Column offset={[2]} span={[2]}>
          <Content>Offset 3</Content>
        </Column>
        <Column offset={[1]} span={[3]}>
          <Content>Offset 3</Content>
        </Column>
        <Column offset={[0]} span={[4]}>
          <Content>Offset 3</Content>
        </Column>
      </Row>
    </Grid>
  ))
  .add('condensed', () => (
    <Grid isCondensed>
      <Row>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
      </Row>
    </Grid>
  ))
  .add('condensed row', () => (
    <Grid>
      <Row>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
      </Row>
      <Row isCondensed>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
      </Row>
      <Row>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
      </Row>
    </Grid>
  ))
  .add('no gutter - column', () => (
    <Grid>
      <Row>
        <Column noGutter>
          <Content>1/4</Content>
        </Column>
        <Column noGutter>
          <Content>1/4</Content>
        </Column>
        <Column noGutter>
          <Content>1/4</Content>
        </Column>
        <Column noGutter>
          <Content>1/4</Content>
        </Column>
      </Row>
    </Grid>
  ))
  .add('no gutter - row', () => (
    <Grid>
      <Row noGutter>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
      </Row>
    </Grid>
  ))
  .add('no gutter - directional', () => (
    <Grid>
      <Row>
        <Column noGutterLeft>
          <Content>No Gutter on the left-hand side</Content>
        </Column>
        <Column noGutterLeft>
          <Content>No Gutter on the left-hand side</Content>
        </Column>
        <Column noGutterRight>
          <Content>No Gutter on the right-hand side</Content>
        </Column>
        <Column noGutterRight>
          <Content>No Gutter on the right-hand side</Content>
        </Column>
      </Row>
    </Grid>
  ))
  .add('full width', () => (
    <Grid fullWidth>
      <Row>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
        <Column>
          <Content>1/4</Content>
        </Column>
      </Row>
    </Grid>
  ));
