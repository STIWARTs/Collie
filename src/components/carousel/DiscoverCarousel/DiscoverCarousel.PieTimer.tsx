import { useEffect, useState } from 'react';
import styles from 'styles/modules/pietimer.module.css';

interface IProps {
  Hide: string;
}

function DiscoverCarouselPieTimer(props: IProps) {
  const [Hide, setHide] = useState(false);

  useEffect(() => {
    setTimeout(
      () => {
        setHide(true);
      },
      10 * 1000 - 250,
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {!Hide && props.Hide === 'running' && (
        <div
          className={`${
            props.Hide === 'running' ? 'block' : 'hidden'
          } relative`}
        >
          <div className={styles.discover_carousel_timer_wrapper}>
            <div
              className={`${styles.discover_carousel_timer_pie} ${styles.discover_carousel_timer_spinner_mask}`}
            >
              <div
                className={`${styles.discover_carousel_timer_pie} ${styles.discover_carousel_timer_spinner}`}
              />
            </div>
            <div
              className={`${styles.discover_carousel_timer_pie} ${styles.discover_carousel_timer_filler}`}
            />
            <div className={styles.discover_carousel_timer_mask} />
          </div>
        </div>
      )}
    </>
  );
}

export default DiscoverCarouselPieTimer;
