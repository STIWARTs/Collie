import Image from 'next/image';
import Logo from '../../../public/agewear_white.svg';
import Logo_Full from '../../../public/agewear_full_white.svg';

interface IProps {
  onValueChange: (value: 'Discover' | 'Offers' | 'Collections') => void;
}

export function HeaderLogo(props: IProps) {
  return (
    <div className="relative flex">
      <Image
        height={32.5}
        width={32.5}
        onClick={() => props.onValueChange('Discover')}
        className="opacity-90 transition-all duration-300 hover:cursor-pointer hover:opacity-100"
        src={Logo}
        alt=""
      />
    </div>
  );
}

export function AuthHeaderLogo() {
  return (
    <Image height={45} width={45} className="opacity-90" src={Logo} alt="" />
  );
}

export function MobileLogo(props: IProps) {
  return (
    <Image
      height={30}
      width={30}
      onClick={() => props.onValueChange('Discover')}
      className="opacity-90 transition-all duration-300 hover:cursor-pointer hover:opacity-100"
      src={Logo}
      alt=""
    />
  );
}

export function MobileSearchLogo() {
  return <Image height={25} width={25} src={Logo} alt="" />;
}

export function FooterLogo(props: IProps) {
  return (
    <>
      <div className="hidden sm:block">
        <Image
          height={30}
          width={125}
          onClick={() => props.onValueChange('Discover')}
          className="opacity-90 transition-all duration-300 hover:cursor-pointer hover:opacity-100"
          src={Logo_Full}
          alt=""
        />
      </div>
      <div className="block sm:hidden">
        <Image
          height={25}
          width={100}
          onClick={() => props.onValueChange('Discover')}
          className="opacity-90 transition-all duration-300 hover:cursor-pointer hover:opacity-100"
          src={Logo_Full}
          alt=""
        />
      </div>
    </>
  );
}
