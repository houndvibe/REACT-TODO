type buttonVariants = "primary" | "secondary" | "danger" | undefined;

interface MyButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: buttonVariants;
}

const MyButton: React.FC<MyButtonProps> = (props) => {
  const { children, variant, ...rest } = props;

  const makeClassname = (variant: buttonVariants): string => {
    const baseStyles: string =
      " py-2 px-7 rounded-md shadow-xl m-4 hover:-translate-x-0.5 hover:translate-y-0.5 transition ";
    const specificStyles: string =
      variant === "primary"
        ? "text-white bg-blue hover:bg-blueHover active:bg-blueActive "
        : variant === "secondary"
          ? "bg-yellow hover:bg-yellowHover active:bg-yellowActive  "
          : variant === "danger"
            ? "text-white bg-red hover:bg-redHover active:bg-redActive"
            : " bg-grey";
    return baseStyles + specificStyles;
  };

  return (
    <button id="b" {...rest} className={makeClassname(variant)}>
      {children}
    </button>
  );
};

export default MyButton;
