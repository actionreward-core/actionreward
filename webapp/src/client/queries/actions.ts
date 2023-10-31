import { Action } from "../../types/action";
import { paginator } from "./utils"

export const getActions = () => paginator<Action>('/actions', {});