import clsx from "clsx";

type ShadeOptions = "darker" | "lighter" | "default";

export default function ThemedTextInput({
  className = "",
  style = {},
  shade = "default",
  label = "",
  props = {}
}: {
  className?: string;
  style?: React.CSSProperties;
  shade?: ShadeOptions;
  label?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-y-2">
      {label && (
        <label className="font-medium text-sm opacity-90 text-gray-900 dark:text-gray-100">
          {label}
        </label>
      )}
      <input
        style={style}
        {...props}
        className={clsx(
          "w-full rounded-lg p-3 text-gray-900 dark:text-gray-100 disabled:text-opacity-75 focus:outline-none focus:ring-2 focus:ring-blue-500",
          shade === "darker"
            ? "dark:bg-neutral-950"
            : shade === "lighter"
            ? "bg-neutral-800"
            : "dark:bg-neutral-900",
          "border border-neutral-300 dark:border-neutral-700",
          className
        )}
        placeholder={props.placeholder || ""}
      />
    </div>
  );
}
