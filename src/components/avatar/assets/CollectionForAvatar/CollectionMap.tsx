import Image from 'next/image';
import { m } from 'framer-motion';
import { Square_BlurDataURL } from 'components/loading/BlurDataURL';
import { SetupAvatarContentProps } from 'contents/setup/Setup.Avatar';

interface IProps {
  AvatarReducer: SetupAvatarContentProps[];
  forward: () => void;
  getURL: (value: string) => void;
}

export function CollectionMap(props: IProps) {
  return (
    <div className="relative box-border h-full w-full items-center justify-center overflow-scroll">
      <div className="box-border inline-grid h-auto w-full grid-flow-row-dense grid-cols-4 gap-4 px-6 pb-6 pt-2 xs-350:grid-cols-5 sm-500:grid-cols-8">
        {props.AvatarReducer.map((avatars) => {
          return (
            <m.button
              key={avatars.iconURL}
              className="relative cursor-default overflow-hidden rounded-[50%] opacity-100 transition-opacity hover:opacity-50"
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                props.getURL(avatars.iconURL);
                props.forward();
              }}
            >
              <Image
                height={440}
                width={440}
                src={avatars.iconURL}
                alt=""
                placeholder="blur"
                blurDataURL={Square_BlurDataURL}
              />
            </m.button>
          );
        })}
      </div>
    </div>
  );
}
