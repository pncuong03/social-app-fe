import { ComponentClass, FunctionComponent } from "react";

export enum AccessTypeEnum {
  USER = "USER",
}

export interface IRouterData {
  key: string;
  name: string;
  path: string;
  header?: boolean;
  parameter?: string;
  accessType: AccessTypeEnum[];
  requirePermission: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  component: string | FunctionComponent<{}> | ComponentClass<{}>;
}
