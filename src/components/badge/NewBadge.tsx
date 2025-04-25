import Image from 'next/image';

function NewBadge() {
  return (
    <div className="flex items-center space-x-1 rounded-md bg-[#b48a0090] px-2 py-1">
      <div className="h-[15px] min-h-[15px] w-[15px] min-w-[15px]">
        <Image height={15} width={15} src="/icons/new-color.svg" alt="" />
      </div>
      <div className="block text-[11px] font-[500] tracking-wide">New</div>
    </div>
  );
}

export default NewBadge;
