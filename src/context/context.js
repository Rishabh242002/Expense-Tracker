import React, {useReducer, createContext} from "react";
import contextReducer from "./contextReducer";
const initialState = JSON.parse(localStorage.getItem('transactions') )|| [
    {amount: 800, category: "Investments", type: "Income", date: "2023-07-13"}, 
    {amount: 200, category: "Entertainment", type: "Expense", date: "2023-07-13"},
    {amount: 600, category: "Shopping", type: "Expense", date: "2023-07-13"},
    {amount: 400, category: "Travel", type: "Expense", date: "2023-07-13"},
    {amount: 1000, category: "Savings", type: "Income", date: "2023-07-13"},
    {amount: 1000, category: "Savings", type: "Income", date: "2023-07-13"}
] ; 

export const ExpenseTrackerContext = createContext(initialState);
export const Provider = ({children}) => {

    const [transactions, dispatch] = useReducer(contextReducer , initialState)  ;

    const deleteTransaction = (id) => {
        dispatch({type: 'DELETE_TRANSACTION', payload: id}); 
    }
    const addTransaction =(transaction) => {
        dispatch({type: 'ADD_TRANSACTION', payload: transaction });
    }

    const balance = transactions.reduce((acc , currVal ) => {
        return ( currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount )
    }, 0 ) ; 

    return(
        <ExpenseTrackerContext.Provider value={{deleteTransaction: deleteTransaction, addTransaction:addTransaction, transactions, balance}}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}