import { createStore } from "vuex";

export default createStore({
    state: {

        /**
         * actualizar cuando se haga drop
         * 
         * nodes: [{
         * 
         * }],
         */
        // node: {},
        // Operations: {},
        // Statements: {},
        data:{}
    },
    /**
     * - las mutaciones solo sirven para modificar los state
     *   setProducts( state, payload)
     * 
     * - payload : es la carga útil (datos a insertar en states)
     * 
     * - las mutaciones se llaman a traves de commit('setProducts', data)
     */
    mutations: {
        setData(state, data) {
            state.data.data = data.drawflow.Home.data;
            console.log(state.data);
        }
        // addNumber(state, number) {
        //     state.Numbers[number.id] = number.value;
        // },
        // deleteNumber(state, number) {
        //     delete state.Numbers[number.id];
        // },
        // addOperation(state, operation) {
        //     state.Operations[operation.id] = operation.value;
        // },
        // deleteOperation(state, operation) {
        //     // state.Operations[operation.id] = null;
        //     delete state.Operations[operation.id];
        //     // console.log(state.Operations);
        // },
        // addStatement(state, statement) {
        //     state.Statements[statement] = statement;
        // },
    },

    /**
     * peticiones a servidor o mayor lógica (reduce)
     */
    actions: {
        // data: export
        updateData( {commit} ,data) {
           try {
            console.log(data);
            commit('setData', data);
            
           } catch (error) {
            console.log(error);

           } 
        }
        // setNumberAction({ commit }, number) {
        //     commit("addNumber", number);
        // },
        // deleteNumberAction({ commit }, number) {
        //     commit("deleteNumber", number);
        // },
        // setOperationAction({ commit }, operation) {
        //     commit("addOperation", operation);
        // },
        // deleteOperationAction({ commit }, operation) {
        //     commit("deleteOperation", operation);
        // },
        // addStatementAction({ commit }, statement) {
        //     commit("addStatement", statement);
        // },
        // async fetchData( { commit } ) {
        //     try {
                
        //         const res = await fetch('api.json');
        //         const data = await res.json();
        //         // commit('mutacion', payload);
        //         commit('setProductos', data);
                
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
    },
    getters: {
        getNumbers: (state) => state.Numbers,
        getNumberbyId: (state) => (id) => state.Numbers[id],
        getOperations: (state) => state.Operations,
        getStatements: (state) => state.Statements,
    },
    modules: {},
});
