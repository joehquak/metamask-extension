import React, { useContext } from 'react';

import PropTypes from 'prop-types';
import { I18nContext } from '../../../contexts/i18n';

import ToggleButton from '../../ui/toggle-button';
import { Box, Text } from '../../component-library';
import {
  Display,
  FlexDirection,
  JustifyContent,
  TextVariant,
  FontWeight,
  TextColor,
} from '../../../helpers/constants/design-system';

import NetworkToggle from './NetworkToggle';
import { useIncomingTransactionToggle } from './hooks';

const IncomingTransactionToggle = () => {
  const t = useContext(I18nContext);

  const {
    inComingNetworkPreferences,
    isAllEnabled,
    toggleAllEnabled,
    setNetworkPreference,
  } = useIncomingTransactionToggle();

  return (
    <Box>
      <Text variant={TextVariant.bodyLgMedium} fontWeight={FontWeight.Bold}>
        {t('showIncomingTransactions')}
      </Text>

      <Text variant={TextVariant.bodyMd} color={TextColor.textAlternative}>
        {t('showIncomingTransactionsInformation')}
      </Text>
      <Box
        marginTop={3}
        display={Display.Flex}
        flexDirection={FlexDirection.Row}
        justifyContent={JustifyContent.spaceBetween}
      >
        <Text variant={TextVariant.bodyMd}> {t('enableForAllNetworks')}</Text>
        <ToggleButton
          value={isAllEnabled}
          onToggle={(value) => toggleAllEnabled(!value)}
          offLabel={t('off')}
          onLabel={t('on')}
        />
      </Box>
      {Object.keys(inComingNetworkPreferences).map((chainId, index) => {
        return (
          <NetworkToggle
            key={index}
            inComingNetworkPreference={inComingNetworkPreferences[chainId]}
            setNetworkPreference={setNetworkPreference}
          />
        );
      })}
    </Box>
  );
};

export default IncomingTransactionToggle;
