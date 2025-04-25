function ContainerDark({ children }: ChildrenType) {
  return (
    <div className="relative m-0 flex h-full w-full flex-grow bg-[#0f0f0f] p-0">
      {children}
    </div>
  );
}

export default ContainerDark;
