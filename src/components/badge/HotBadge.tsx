import Image from 'next/image';

function HotBadge() {
  return (
    <div className="flex items-center space-x-1 rounded-md bg-[#91020090] px-2 py-1">
      <div className="h-[15px] min-h-[15px] w-[15px] min-w-[15px]">
        <Image height={15} width={15} src="/icons/fire-color.svg" alt="" />
      </div>
      <div className="block text-[11px] font-[500] tracking-wide">Hot</div>
    </div>
  );
}

export default HotBadge;
