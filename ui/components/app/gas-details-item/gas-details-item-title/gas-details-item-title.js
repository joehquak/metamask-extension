import React from 'react';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import Box from '../../../ui/box';

const GasDetailsItemTitle = () => {
  const t = useI18nContext();

  return (
    <Box display="flex">
      <Box marginRight={1}>{t('estimatedFee')}</Box>
    </Box>
  );
};

export default GasDetailsItemTitle;
