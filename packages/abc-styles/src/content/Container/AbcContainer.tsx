import style from './AbcContainer.module.css';

interface Props {
  children: React.ReactNode;
  row?: boolean;
  col?: boolean;
  primary?: boolean;
  secondary?: boolean;
  header?: boolean;
}

const AbcContainer: React.FC<Props> = ({
  children,
  row = false,
  col = true,
  primary = true,
  secondary = false,
  header = false,
}) => {
  const containerClass = [
    style.container,
    row && style.row,
    col && style.col,
    primary ? style.primary : '',
    secondary ? style.secondary : '',
    header ? style.header : '',
  ]
    .filter(Boolean) // 🔥 Elimina elementos falsy (undefined, false, '')
    .join(' '); // 🔥 Une en un solo string separado por espacios

  return <div className={containerClass}>{children}</div>;
};

export default AbcContainer;
