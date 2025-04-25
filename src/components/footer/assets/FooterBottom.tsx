import {
  Privacy_Policy_Link,
  Return_Order_Link,
  Refund_Policy_Link,
  Terms_Conditions_Link,
} from 'routers/RouterLinks';
import FooterBottomLinks from './FooterBottomLinks';

function FooterBottom() {
  return (
    <div className="mt-2 grid w-full grid-cols-2 grid-rows-2 items-center gap-y-3 sm:grid-cols-2 sm:grid-rows-2 sm:gap-y-2 md-900:grid-cols-2 md-900:grid-rows-2 lg-1140:grid-cols-3 lg-1140:grid-rows-1">
      <div className="col-span-2 row-span-2 block h-[1px] w-full bg-[#ffffff1a] sm:hidden" />
      <h6 className="order-1 col-span-1 row-span-2 flex w-full justify-start whitespace-normal text-[11.5px] font-[300] text-white opacity-80 xs-400:whitespace-nowrap sm:row-span-2 md-900:order-1 md-900:row-span-1">
        Copyright © 2023 Emotion-outfit. All rights reserved.
      </h6>
      <div className="col-span-2 row-span-1 flex w-full flex-col justify-start sm:col-span-2 sm:row-span-1 sm:flex-row sm:items-center sm:justify-center sm:space-x-4 md-900:order-2 md-900:col-span-1 md-900:justify-end lg-1140:justify-center">
        <FooterBottomLinks to={Privacy_Policy_Link} label="Privacy Policy" />
        <div className="box-border hidden h-5 bg-[#ffffff3b] px-[0.5px] sm:block" />
        <FooterBottomLinks to={Return_Order_Link} label="Return order Policy" />
        <div className="box-border hidden h-5 bg-[#ffffff3b] px-[0.5px] sm:block" />
        <FooterBottomLinks to={Refund_Policy_Link} label="Refund Policy" />
        <div className="box-border hidden h-5 bg-[#ffffff3b] px-[0.5px] sm:block" />
        <FooterBottomLinks
          to={Terms_Conditions_Link}
          label="Terms and Conditions"
        />
      </div>
      <h6 className="order-1 col-span-1 row-span-2 hidden h-full items-start justify-end whitespace-normal text-[11.5px] font-[300] text-white opacity-80 small-screen:flex sm:row-span-2 sm:h-auto sm:w-full sm:items-center md-900:order-3 md-900:justify-start lg-1140:row-span-1 lg-1140:justify-end">
        India
      </h6>
      <div className="col-span-2 row-span-2 block h-[1px] w-full bg-[#ffffff1a] sm:hidden" />
    </div>
  );
}

export default FooterBottom;
