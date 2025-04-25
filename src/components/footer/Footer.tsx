'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Privacy_Policy_Link,
  Return_Order_Link,
  Refund_Policy_Link,
  Terms_Conditions_Link,
} from 'routers/RouterLinks';

type IProps = {
  className?: string;
};

const Footer = (props: IProps) => {
  return (
    <footer className={`${props.className} bg-[#181818] px-4 py-10 xl:px-0`}>
      <div className="container mx-auto flex flex-col items-center text-center">
        <div className="mb-6">
          <div className="flex items-center justify-center">
            <Image
              src="/gifs/gift-unscreen.gif"
              alt="Gift"
              width={50}
              height={50}
            />
            <h2 className="text-3xl font-bold tracking-wider text-white">
              Collie
            </h2>
          </div>
        </div>

        <p className="mx-auto mb-6 max-w-3xl text-sm text-white/80">
          Founded in 2025, Collie is a fashion brand that makes creative,
          distinctive fashion for the trendy, contemporary individual. Collie
          was created on the principle of creating impact through innovation,
          honesty and thoughtfulness. We like to experiment freely, which allows
          us to balance creativity and relatability, and our innovative designs.
          Our range of products is always fresh and up-to-date. Discover your
          personal style with Collie.
        </p>

        <p className="mb-8 text-sm text-white/80">
          Your Personal Fashion Assistant
        </p>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-x-6 text-sm">
          <Link
            href={Privacy_Policy_Link}
            className="text-white/80 hover:text-white"
          >
            Privacy Policy
          </Link>
          <span className="text-white/30">|</span>
          <Link
            href={Return_Order_Link}
            className="text-white/80 hover:text-white"
          >
            Return order Policy
          </Link>
          <span className="text-white/30">|</span>
          <Link
            href={Refund_Policy_Link}
            className="text-white/80 hover:text-white"
          >
            Refund Policy
          </Link>
          <span className="text-white/30">|</span>
          <Link
            href={Terms_Conditions_Link}
            className="text-white/80 hover:text-white"
          >
            Terms and Conditions
          </Link>
        </div>

        <div className="flex w-full justify-between">
          <p className="text-xs text-white/70">
            Copyright © 2025 Collie. All rights reserved.
          </p>
          <p className="text-xs text-white/70">India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
