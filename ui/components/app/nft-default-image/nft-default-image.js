import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';
import {
  Display,
  AlignItems,
  BlockSize,
  JustifyContent,
  TextVariant,
  BorderRadius,
  TextAlign,
  BackgroundColor,
} from '../../../helpers/constants/design-system';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { ButtonLink, Text } from '../../component-library';
import Box from '../../ui/box/box';
import { showIpfsModal } from '../../../store/actions';

export default function NftDefaultImage({
  name,
  tokenId,
  className,
  isIpfsEnabled,
  clickable,
}) {
  const t = useI18nContext();
  const dispatch = useDispatch();

  return (
    <Box
      tabIndex={0}
      data-testid="nft-default-image"
      className={classnames(className, 'nft-default', {
        'nft-default--clickable': clickable,
      })}
      display={Display.Flex}
      alignItems={AlignItems.Center}
      justifyContent={JustifyContent.Center}
      backgroundColor={BackgroundColor.backgroundAlternative}
      width={BlockSize.Full}
      borderRadius={BorderRadius.LG}
    >
      <Text
        variant={TextVariant.bodySm}
        textAlign={TextAlign.Center}
        ellipsis
        as="h6"
        className="nft-default__text"
      >
        {name ?? t('unknownCollection')} <br /> #{tokenId}
      </Text>
      {!isIpfsEnabled && (
        <ButtonLink
          paddingTop={4}
          paddingBottom={4}
          block
          onClick={(e) => {
            e.stopPropagation();
            dispatch(showIpfsModal());
          }}
        >
          {t('show')}
        </ButtonLink>
      )}
    </Box>
  );
}

NftDefaultImage.propTypes = {
  /**
   * The name of the NFT collection if not supplied will default to "Unnamed collection"
   */
  name: PropTypes.string,
  /**
   * The token id of the nft
   */
  tokenId: PropTypes.string,
  /**
   * Controls the css class for the cursor hover
   */
  clickable: PropTypes.bool,
  /**
   * Check if ipfs is Enabled or not based on Ipfs Value
   */
  isIpfsEnabled: PropTypes.string,
  /**
   * An additional className to apply to the NFT default image
   */
  className: PropTypes.string,
};
