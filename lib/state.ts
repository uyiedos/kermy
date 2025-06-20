/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { create } from 'zustand';
import { Agent, Kermy, AGENT_COLORS, INTERLOCUTOR_VOICES, INTERLOCUTOR_VOICE } from './presets/agents';

/**
 * User
 */
export type User = {
  name?: string;
  info?: string;
};

export const useUser = create<
  {
    setName: (name: string) => void;
    setInfo: (info: string) => void;
  } & User
>(set => ({
  name: '',
  info: '',
  setName: name => set({ name }),
  setInfo: info => set({ info }),
}));

/**
 * Agents
 */

// Since Kermy is the only agent, we simplify the agent state management.
// If more agents were to be added back, the previous structure could be reinstated.
export const useAgent = create<{
  current: Agent;
  // Methods for adding/updating agents are removed as Kermy is fixed.
  // If dynamic agent management is needed later, these can be added back.
}>(() => ({
  current: Kermy,
  // setCurrent and update are not needed if Kermy is the only, fixed agent.
  // To re-enable agent switching or editing:
  // setCurrent: (agent: Agent | string) => set(state => ({ current: typeof agent === 'string' ? getAgentById(agent, state) : agent })),
  // update: (agentId: string, adjustments: Partial<Agent>) => {
  //   set(state => {
  //     if (state.current.id === agentId) {
  //       return { current: { ...state.current, ...adjustments } };
  //     }
  //     return state;
  //   });
  // },
}));

/**
 * UI
 */
export const useUI = create<{
  showUserConfig: boolean;
  setShowUserConfig: (show: boolean) => void;
  // showAgentEdit and setShowAgentEdit are removed as Kermy is the only agent and not editable.
}>(set => ({
  showUserConfig: true,
  setShowUserConfig: (show: boolean) => set({ showUserConfig: show }),
}));