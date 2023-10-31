import { Reward } from "../../types/rewards";
import { paginator } from "./utils"

export const getRewards = () => paginator<Reward>('/rewards', {});