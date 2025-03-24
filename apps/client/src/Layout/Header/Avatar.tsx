import { UserStore } from '@/store';
import { observer } from 'mobx-react-lite';
const Avatar = observer(() => {
  return (
    <>
      <div className="flex relative" data-aos="fade-left">
        {UserStore.users.map((user, index) => {
          return user ? (
            <span
              key={user.clientId}
              className={`text-gray-500 dark:text-gray-200 w-8 h-8 flex items-center justify-center rounded-full text-base hover:translate-x-0 ${index === UserStore.users.length - 1 ? 'translate-x-0' : 'translate-x-2'}  transition-transform duration-300 ease-in-out`}
              style={{ backgroundColor: user.color }}
            >
              {user.name?.split('')[0]}
            </span>
          ) : (
            <></>
          );
        })}
      </div>
    </>
  );
});
export default Avatar;
