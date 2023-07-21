import React from 'react';
import { networkList } from '../../../../.storybook/test-data';
import IncomingTransactionToggle from './incoming-transaction-toggle.component';

export default {
  title: 'Components/App/IncomingTransaction',
};

export const DefaultStory = () => {
  return <IncomingTransactionToggle />;
};

DefaultStory.storyName = 'Default';
