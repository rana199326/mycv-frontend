interface HeaderProps {
    title: string;
    description: string;
  }
  
  export const Header = ({ title, description }: HeaderProps) => {
    return (
      <div>
        <h1 className="text-md font-semibold text-gray-900">{title}</h1>
        <p className="mt-1 text-sm text-gray-700">{description}</p>
      </div>
    );
  };
  