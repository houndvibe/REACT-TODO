interface MySelectProps extends React.ComponentPropsWithoutRef<"select"> {
  options: string[];
}

const MySelect: React.FC<MySelectProps> = ({ options, onChange }) => {
  return (
    <div>
      <select
        onChange={onChange}
        className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-lg border p-1 text-sm dark:text-white"
      >
        {options.map((option) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default MySelect;
