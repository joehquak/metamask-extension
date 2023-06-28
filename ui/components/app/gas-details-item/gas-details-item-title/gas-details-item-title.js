import React from 'react';
import { useI18nContext } from '../../../../hooks/useI18nContext';

import Box from '../../../ui/box';
<<<<<<< HEAD
import InfoTooltip from '../../../ui/info-tooltip/info-tooltip';
import { Text } from '../../../component-library/text/deprecated';
=======
>>>>>>> de08fa152 (Add border and padding to gas component.)

const GasDetailsItemTitle = () => {
  const t = useI18nContext();

  return (
    <Box display="flex">
      <Box marginRight={1}>{t('estimatedFee')}</Box>
    </Box>
  );
};

export default GasDetailsItemTitle;
