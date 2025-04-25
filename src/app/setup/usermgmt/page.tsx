import UserMgmtInterface from 'interfaces/UserMgmt/UserMgmt.Interface';

async function UserMgmt() {
  return (
    <UserMgmtInterface
      MainClassName="h-full md:h-[652px]"
      ParentDivClassName="h-[350px]"
      ContentClassName="h-[300px]"
      Animation={{
        Initial: { x: 50, opacity: 0 },
        Final: { x: 0, opacity: 1 },
        Transition: { type: 'tween' },
      }}
    />
  );
}

export default UserMgmt;
