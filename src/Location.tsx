import React from 'react';
import { Card, Tag } from '@blueprintjs/core';
import classNames from 'classnames';

interface LocationProps {
  location: Record<string, string>;
}

const Location: React.FC<LocationProps> = ({ location }) => {
  const active = location.active as unknown as boolean;
  return (
    <React.Fragment>
      <Card
        className={classNames({ ['bp4-text-disabled']: !active })}
        interactive={active}
      >
        <p>
          <Tag large minimal round>
            {location.locationType}
          </Tag>
        </p>
        <h2>{location.locationName}</h2>
        <p>
          <strong>Address:</strong>{' '}
          {Object.values(location.address)
            .filter((section) => !!section)
            .join(', ')}
        </p>
        <p>
          <strong>Details:</strong>{' '}
          {location.locationDetails?.length ? (
            location.locationDetails
          ) : (
            <i>No details</i>
          )}
        </p>
        <p>
          <strong>Number of devices:</strong> {location.numberofDevices}
        </p>
        <p>
          <strong>User Role:</strong> {location.locationUserRole}
        </p>
      </Card>
      <br />
    </React.Fragment>
  );
};

export default Location;
