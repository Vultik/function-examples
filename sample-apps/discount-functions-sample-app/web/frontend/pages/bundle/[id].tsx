import { useParams } from 'react-router-dom';

import { configurationsAreEqual } from '../../components/BundleConfiguration/configurationsAreEqual';
import { DEFAULT_CONFIGURATION } from '../../components/BundleConfiguration/consts';
import { serializeDiscount } from '../../components/BundleConfiguration/serializeDiscount';
import BundleConfiguration from '../../components/BundleConfiguration';
import DiscountDetailsPage from '../../components/DiscountDetailsPage';

export default function BundleDiscountPage() {
  const { id } = useParams();

  return (
    <DiscountDetailsPage
      id={id}
      configurationsAreEqual={configurationsAreEqual}
      defaultConfiguration={DEFAULT_CONFIGURATION}
      renderConfigurationForm={(configuration, onConfigurationChange) => (
        <BundleConfiguration
          configuration={configuration}
          onConfigurationChange={onConfigurationChange}
        />
      )}
      serializeDiscount={serializeDiscount}
    />
  );
}
