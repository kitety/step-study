import React from 'react';
import styles from './index.css';
import Link from 'umi/link';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { IntlProvider, FormattedDate, FormattedMessage } from 'react-intl';

export default function() {
  return (
    <IntlProvider locale="zh">
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/pages/index.js</code> and save to reload.
        </li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">Getting Started</a>
        </li>
        <Link to="/user">go to /users</Link>
        <FormattedMessage id="hello"/>
        <FormattedDate value={Date.now()}></FormattedDate>
        <DatePicker />
      </ul>
    </div>
    </IntlProvider>
  );
}
