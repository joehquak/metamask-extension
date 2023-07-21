import { useState, useEffect, useContext } from 'react';
import { CHAIN_IDS } from '../../../../shared/constants/network';
import { networkList } from '../../../../.storybook/test-data';
import { getNetworkLabelKey } from '../../../helpers/utils/i18n-helper';
import { I18nContext } from '../../../contexts/i18n';

// TODO: get from selector
const STATE_INCOMING_TXN = {
  [CHAIN_IDS.MAINNET]: true,
  [CHAIN_IDS.POLYGON]: false,
  [CHAIN_IDS.BSC]: true,
};

export const useIncomingTransactionToggle = () => {
  const t = useContext(I18nContext);

  const [showIncomingTransactions, setShowIncomingTransactions] =
    useState(STATE_INCOMING_TXN);
  const [inComingNetworkPreferences, setInComingNetworkPreferences] = useState(
    generateIncomingNetworkPreferences(showIncomingTransactions, t),
  );

  const [isAllEnabled, setIsAllEnabled] = useState(
    checkAllIncomingTransactions(inComingNetworkPreferences),
  );

  useEffect(() => {
    setInComingNetworkPreferences(
      generateIncomingNetworkPreferences(showIncomingTransactions, t),
    );
  }, [showIncomingTransactions, t]);

  useEffect(() => {
    setIsAllEnabled(checkAllIncomingTransactions(inComingNetworkPreferences));
  }, [inComingNetworkPreferences]);

  const toggleAllEnabled = (isAllEnabledValue) => {
    setIsAllEnabled(isAllEnabledValue);
    // TODO: Dispatch set all value as isAllEnabledValue
    const updatedStateIncomingTxn = Object.fromEntries(
      Object.entries(showIncomingTransactions).map(([key]) => [
        key,
        isAllEnabledValue,
      ]),
    );
    setShowIncomingTransactions(updatedStateIncomingTxn);
  };

  const setNetworkPreference = (value, chainId) => {
    // TODO: Dispatch set single value as isAllEnabledValue
    setShowIncomingTransactions({
      ...STATE_INCOMING_TXN,
      [chainId]: value,
    });
  };

  return {
    inComingNetworkPreferences,
    isAllEnabled,
    toggleAllEnabled,
    setNetworkPreference,
  };
};

function generateIncomingNetworkPreferences(showIncomingTransactions, t) {
  return Object.entries(showIncomingTransactions).map(
    ([chainId, isShowIncomingTransactions]) => {
      const selectedNetwork = networkList.find(
        (network) => network.chainId === chainId,
      );
      const networkName =
        selectedNetwork.label ||
        t(getNetworkLabelKey(selectedNetwork.labelKey));
      return {
        ...selectedNetwork,
        isShowIncomingTransactions,
        networkName,
      };
    },
  );
}

function checkAllIncomingTransactions(transactions) {
  const results = transactions.map((transaction) => {
    return transaction.isShowIncomingTransactions;
  });
  return results.every((isShowIncoming) => isShowIncoming);
}
