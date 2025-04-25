import { FC } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import {
  Offers_Link,
  Collections_Link,
  Home_Link,
  NFT_Collection_Link,
} from 'routers/RouterLinks';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import styles from '../../../styles/modules/header.module.css';

interface IProps {
  Value: 'Discover' | 'Offers' | 'Collections' | 'NFT Collection';
  setValue: (
    value: 'Discover' | 'Offers' | 'Collections' | 'NFT Collection',
  ) => void;
  onValueChange?: (
    newValue: 'Discover' | 'Offers' | 'Collections' | 'NFT Collection',
  ) => void;
}

export const HeaderNav: FC<IProps> = ({
  Value,
  setValue,
  onValueChange = () => {},
}) => {
  const Router = useRouter();

  const handleButtonClick = (
    newValue: 'Discover' | 'Offers' | 'Collections' | 'NFT Collection',
  ) => {
    setValue(newValue);
    onValueChange(newValue);

    switch (newValue) {
      case 'Discover':
        Router.push(Home_Link);
        break;
      case 'Offers':
        Router.push(Offers_Link);
        break;
      case 'Collections':
        Router.push(Collections_Link);
        break;
      case 'NFT Collection':
        Router.push(NFT_Collection_Link);
        break;
      default:
        break;
    }
  };

  return (
    <nav className="c-header_nav -desktop">
      <ul className="c-header_nav_list flex flex-row space-x-4">
        <li>
          <Button
            aria-label="Discover"
            className={clsx(styles.navButton, {
              [styles.activeNavButton]: Value === 'Discover',
            })}
            onClick={() => handleButtonClick('Discover')}
          >
            Discover
            {Value === 'Discover' && (
              <motion.span
                className={styles.navIndicator}
                layoutId="c-header_nav_btn_indicator"
              />
            )}
          </Button>
        </li>
        <li>
          <Button
            aria-label="Collections"
            className={clsx(styles.navButton, {
              [styles.activeNavButton]: Value === 'Collections',
            })}
            onClick={() => handleButtonClick('Collections')}
          >
            Collections
            {Value === 'Collections' && (
              <motion.span
                className={styles.navIndicator}
                layoutId="c-header_nav_btn_indicator"
              />
            )}
          </Button>
        </li>
        <li>
          <Button
            aria-label="Offers"
            className={clsx(styles.navButton, {
              [styles.activeNavButton]: Value === 'Offers',
            })}
            onClick={() => handleButtonClick('Offers')}
          >
            Offers
            {Value === 'Offers' && (
              <motion.span
                className={styles.navIndicator}
                layoutId="c-header_nav_btn_indicator"
              />
            )}
          </Button>
        </li>
      </ul>
    </nav>
  );
};
