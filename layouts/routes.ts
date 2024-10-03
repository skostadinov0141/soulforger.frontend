export interface RouteElement {
  title: string
  icon: string
  requiredRoles: string[]
  to?: string
  children?: RouteElement[]
}

export const routes: RouteElement[] = [
  {
    title: 'Attribute',
    icon: 'mdi-account-tag-outline',
    requiredRoles: [],
    to: '/attribute-templates/dashboard',
  },
];
