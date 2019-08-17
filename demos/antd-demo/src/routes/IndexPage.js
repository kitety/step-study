import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import { Layout, Icon } from 'antd';
import { enquireScreen, unenquireScreen } from 'enquire-js'
import SiderMenu from '../components/SiderMenu'

const { Header, Content } = Layout;
let isMobile
let enquireHandler
enquireScreen(b => {
  isMobile = b
})

class IndexPage extends React.Component {
  state = {
    collapsed: isMobile,
    isMobile
  };
  componentDidMount () {
    enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
      });
    });
  }
  componentWillUnmount () {
    unenquireScreen(this.enquireHandler);
  }
  onClose = () => {
    this.setState({
      collapsed: true,
    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render () {
    const { isMobile, collapsed } = this.state

    return (
      <Layout>
        <SiderMenu
          isMobile={isMobile}
          collapsed={collapsed}
          onClose={this.onClose} />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}


IndexPage.propTypes = {
};

export default connect()(IndexPage);
