import { Rate, RateProps } from "antd";

interface PinProps extends RateProps {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
export const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  );
};
