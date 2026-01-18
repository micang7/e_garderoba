export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  innerClassName?: string;
  innerStyle?: React.CSSProperties;
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  className,
  style,
  innerClassName,
  innerStyle,
  ...rest
}) => {
  return (
    <td className={className} style={style} {...rest}>
      <div
        className={innerClassName}
        style={{
          display: 'block',
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </td>
  );
};
