import { Edit } from 'lucide-react';

interface UserCardProps {
  name: string;
  role: string;
  email?: string;
  avatarUrl?: string;
  bgColor?: string;
  onClick?: () => void;
  onEditClick?: () => void; // Added onEditClick prop for the edit icon
}

export default function UserCard({
  name,
  role,
  email,
  avatarUrl,
  onClick,
  onEditClick, // Accept onEditClick prop
}: UserCardProps) {
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-green-100 text-green-700';
      case 'manager':
        return 'bg-blue-100 text-blue-700';
      case 'user':
        return 'bg-green-100 text-green-700';
      case 'editor':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };


  return (
    <div
      onClick={onClick}
      className="rounded-md p-3 bg-white relative shadow-sm hover:shadow-lg hover:scale-[1.03] transition-all hover:cursor-pointer duration-500 ease-in-out"
    >
      <div className="flex items-center gap-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${name}'s avatar`}
            className="h-16 w-16 rounded-xl object-cover"
          />
        ) : (
          <div className="h-16 w-16 bg-gray-100 text-3xl font-medium rounded-xl border flex items-center justify-center">
            {getInitial(name)}
          </div>
        )}

        <div className="flex flex-col">

<div className='flex items-center justify-between gap-4'>
          <h3 className="text-xl font-semibold mb-1 text-gray-800">{name}</h3>
          <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering card click
                if (onEditClick) onEditClick();
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <Edit className="w-4 h-4" /> {/* Edit icon */}
            </button>
  </div>


          <span
            className={`px-3 py-1 rounded-full capitalize text-sm font-medium w-fit ${getRoleColor(role)}`}
          >
            {role}
          </span>

          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-gray-600">{email}</p> {/* Email */}
           
          </div>
        </div>
      </div>
    </div>
  );
}
