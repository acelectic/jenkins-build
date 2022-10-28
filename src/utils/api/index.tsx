import {
  cpallPmsBackOfficeClient,
  cpallPmsApiWrapper,
} from "./cpall-pms-client"
import { createMethod } from "./tools"

export const api = {
  cpallPmsBackOffice: createMethod(
    cpallPmsBackOfficeClient,
    cpallPmsApiWrapper
  ),
}
