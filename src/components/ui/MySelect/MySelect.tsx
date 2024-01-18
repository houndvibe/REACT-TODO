interface MySelectProps extends React.ComponentPropsWithoutRef<"select"> {
  options: string[];
}

const MySelect: React.FC<MySelectProps> = ({ options, onChange }) => {
  return (
    <div>
      <select
        onChange={onChange}
        className="focus:ring-blue-500 block w-full rounded-lg border-2 border-white bg-yellow p-1 text-lg outline-none focus:border-blue focus:ring-2"
      >
        {options.map((option) => {
          return (
            <option className=" bg-white" value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default MySelect;
