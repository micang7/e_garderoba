export interface TableHeaderProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode;
  innerClassName?: string;
  innerStyle?: React.CSSProperties;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className,
  style,
  innerClassName,
  innerStyle,
  ...rest
}) => {
  return (
    <th className={className} style={style} {...rest}>
      <div
        className={innerClassName}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </th>
  );
};
