import Image from 'next/image';

function ProductDetailInterface() {
  return (
    <div className="relative z-10">
      <div className="relative flex h-full w-full items-center justify-between overflow-x-hidden overflow-y-visible pr-3">
        <div>
          <Image
            height={1080}
            width={1920}
            src="/images/avatar/illustration/4.png"
            alt=""
          />
        </div>
        <div className="flex h-full w-full max-w-[30%] flex-col items-center justify-center">
          <div className="relative flex">
            <Image
              height={260}
              width={200}
              src="/images/avatar/illustration/5.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailInterface;
