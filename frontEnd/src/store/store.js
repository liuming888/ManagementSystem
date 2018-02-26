import state from "./state/state.js";
import mutations from "./mutations/mutations.js";
import actions from "./actions/actions.js";
export const storeObj = {
    state: {...state},
    mutations: {...mutations},
    actions: {...actions}
}