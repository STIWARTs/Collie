function BorderContainerDark({ children }: ChildrenType) {
  return (
    <div className="flex w-full items-center justify-center rounded-md border border-solid border-color-dark bg-transparent p-3 hover:border">
      {children}
    </div>
  );
}

export default BorderContainerDark;
