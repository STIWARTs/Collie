import { Link } from '@mui/material';
import Image from 'next/image';

interface IProps {
  Content: { label: string; to: string; icon: string }[];
  heading: string;
}

function FooterSocials(props: IProps) {
  return (
    <div className="flex flex-col py-2">
      <h6 className="py-1 text-sm text-white opacity-50">{props.heading}</h6>
      <div className="relative flex">
        <ul className="relative flex space-x-2 pt-1">
          {props.Content.map((value) => (
            <li key={value.label} className="relative flex">
              <Link
                href={value.to}
                className="button-text-lower flex space-x-2 whitespace-nowrap underline-offset-2"
              >
                <Image
                  height={25}
                  width={25}
                  className="flex items-center"
                  src={value.icon}
                  alt=""
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FooterSocials;
