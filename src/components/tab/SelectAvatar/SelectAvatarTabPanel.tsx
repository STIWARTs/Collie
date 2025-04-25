interface TabPanelProps {
  children: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

const SelectAvatarTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`avatar-tabpanel-${index}`}
      aria-labelledby={`avatar-tabpanel-${index}`}
      className="h-full w-full"
      {...other}
    >
      {value === index && children}
    </div>
  );
};

export default SelectAvatarTabPanel;
