import { LinkProps } from 'react-router-dom';

export type SideBarLinkProps = LinkProps & {
  icon: React.ReactNode;
  isExpanded: boolean;
  isSelected: boolean;
};

export type CatigoryDataType = Array<{ name: string; value: number }>;
