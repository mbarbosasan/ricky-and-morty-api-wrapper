export type ButtonGroup = {
  label: string;
  type: 'link' | 'button';
  routerLink?: string;
  selected: boolean;
  icon?: string;
  badge?: number;
};

export type ButtonGroupModel = ButtonGroup & { selected: boolean };
