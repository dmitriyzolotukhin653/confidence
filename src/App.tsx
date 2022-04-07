import React from 'react';
import { Spinner } from '@blueprintjs/core';
import { getLocations } from './api';
import VisibilitySensor from 'react-visibility-sensor';
import classes from './App.module.scss';
import Location from './Location';

function App() {
  const [locations, setLocations] = React.useState([]);
  const [numberOfLocations, setNumberOfLocations] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [y, setY] = React.useState(window.scrollY);
  const handleNavigation = React.useCallback(
    (e) => setY(e.currentTarget.scrollY),
    [y]
  );
  React.useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('scroll', handleNavigation);

    return () => window.removeEventListener('scroll', handleNavigation);
  }, [handleNavigation]);
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const { locations: newLocations, numberOfLocations } = await getLocations(
        (page - 1) * 3
      );
      setLocations([...locations, ...newLocations] as any);
      setNumberOfLocations(numberOfLocations);
      setLoading(false);
    })();
  }, [page]);

  const handleVisibilityChange = React.useCallback(
    (i: number) => (isVisible: boolean) => {
      if (
        locations.length === i + 1 &&
        isVisible &&
        !loading &&
        page * 3 <= numberOfLocations
      ) {
        setPage(page + 1);
      }
    },
    [page, loading, numberOfLocations]
  );

  return (
    <div className={classes.wrapper}>
      <h1 className="bp4-heading">Locations</h1>
      <br />
      {locations.map((location: any, i, locations) => (
        <VisibilitySensor
          key={location.locationId}
          onChange={handleVisibilityChange(i)}
        >
          <Location location={location} />
        </VisibilitySensor>
      ))}
      <br />
      {loading && <Spinner className={classes.loading} />}
    </div>
  );
}

export default App;
