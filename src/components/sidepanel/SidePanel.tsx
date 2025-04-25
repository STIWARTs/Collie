import { HeaderLogo } from 'components/logo/CompanyLogo';
import { HomePageHook } from 'hooks/target/Hooks.Page.Home';
import { Home_Link } from 'routers/RouterLinks';
import { useRouter } from 'next/navigation';
import SidePanelVerticalNavBar from './SidePanel.Vertical.NavBar';
import SidePanelShoppingList from './SidePanel.ShoppingList';

interface SidePanelProps {
  Active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

function SidePanel(props: SidePanelProps) {
  const { setHomePage } = HomePageHook();
  const router = useRouter();
  return (
    <div className="fixed left-0 flex h-screen w-[250px] flex-col bg-[#0f0f0f] py-1.5 text-white">
      {/* Logo */}
      <div className="ml-[27px] flex h-[65px] min-h-[65px] items-center justify-start py-3">
        <HeaderLogo
          onValueChange={(value) => {
            setHomePage(value);
            router.push(Home_Link);
          }}
        />
      </div>
      {/* Home, Gallery Nav */}
      <SidePanelVerticalNavBar
        Active={props.Active}
        setActive={props.setActive}
      />
      {/* Shopping List */}
      <SidePanelShoppingList />
    </div>
  );
}

export default SidePanel;
