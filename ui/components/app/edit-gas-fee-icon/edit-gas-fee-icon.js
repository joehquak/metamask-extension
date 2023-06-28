import React from 'react';
import PropTypes from 'prop-types';

import { Color } from '../../../helpers/constants/design-system';
import { useGasFeeContext } from '../../../contexts/gasFee';
import { useTransactionEventFragment } from '../../../hooks/useTransactionEventFragment';
import { useTransactionModalContext } from '../../../contexts/transaction-modal';
import { Icon, IconName, IconSize } from '../../component-library';

export default function EditGasFeeIcon({ userAcknowledgedGasMissing }) {
  const { hasSimulationError, estimateUsed, supportsEIP1559 } =
    useGasFeeContext();
  const { updateTransactionEventFragment } = useTransactionEventFragment();
  const { openModal } = useTransactionModalContext();
  const editEnabled =
    !hasSimulationError || userAcknowledgedGasMissing === true;

  if (!supportsEIP1559 || !estimateUsed || !editEnabled) {
    return null;
  }

  const openEditGasFeeModal = () => {
    updateTransactionEventFragment({
      gas_edit_attempted: 'basic',
    });
    openModal('editGasFee');
  };

  return (
    <button onClick={openEditGasFeeModal} data-testid="edit-gas-fee-icon">
      <Icon
        name={IconName.Edit}
        color={Color.primaryDefault}
        size={IconSize.Xs}
      />
    </button>
  );
}

EditGasFeeIcon.propTypes = {
  userAcknowledgedGasMissing: PropTypes.bool,
};
