import { Link } from '@mui/material';

interface IProps {
  label: string;
  to: string;
  className?: string;
}

function FooterBottomLinks(props: IProps) {
  return (
    <Link
      href={props.to}
      underline="hover"
      className={`${
        props.className
      } ${'flex whitespace-nowrap text-[11.5px] font-[300] text-white underline-offset-2 opacity-80'}`}
    >
      {props.label}
    </Link>
  );
}

export default FooterBottomLinks;
