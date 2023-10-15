import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import ActionReward from './src/abi/ActionReward.json';
 
export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'ActionReward',
      abi: ActionReward,
    }
  ],
  plugins: [
    react(),
  ],
})