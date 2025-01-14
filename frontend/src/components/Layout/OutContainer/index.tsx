import * as Styles from './styles';
type OutContainerProps = {
  children: React.ReactNode;
};

const OutContainer = ({ children }: OutContainerProps) => {
  return <Styles.OutContainer>{children}</Styles.OutContainer>;
};

export default OutContainer;
