import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import './Transaction.css';
// import { Button } from "bootstrap";

export default function Transaction() {
    const transactions = useSelector((store) => store.transactions);
    const dispatch = useDispatch();

    useEffect(() => {
        getTransactions();
    }, []);

    const getTransactions = () => {
        axios
            .get("/api/transaction")
            .then((response) => {
                console.log(response.data);
                dispatch({
                    type: "SET_TRANSACTIONS",
                    payload: response.data,
                });
            })
            .catch((err) => console.log("Error getting transactions", err));
    };

    const handleDelete = (e) => {
        axios.delete(`/api/transaction/${e}`)
            .then(getTransactions())
            .catch((err) => console.log("Error deleting transaction", err))
    }

    return (
        <>
            {/* <NavMenu /> */}
            <div className="table-responsive">
                <div class="card" id='trans-table-header'>
                    <h4 className="transactions">Transactions:</h4>
                </div>
                <div className="table-div">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th className="description">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length === 0 ? (
                                <tr>
                                    <td className="text-center">There are no transactions to display.</td>
                                    <td>Action</td>
                                </tr>
                            ) : (
                                transactions.map((trans) => (
                                    <tr key={trans.id}>
                                        <td>{trans.description}</td>
                                        <td><button onClick={() => handleDelete(trans.id)}>Delete</button></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
