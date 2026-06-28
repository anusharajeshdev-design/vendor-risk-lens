import { useEffect, useState } from "react";
import { getAuditHistory } from "../services/auditLogService";
import "./ViewHistoryModal.css";
import { History } from "lucide-react";

function ViewHistoryModal({
    isOpen,
    onClose,
    entityType,
    entityId
}) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!isOpen || !entityType || !entityId)
            return;

        loadHistory();

    }, [isOpen, entityType, entityId]);

    const loadHistory = async () => {

        setLoading(true);

        try {

            const data = await getAuditHistory(
                entityType,
                entityId);

            setHistory(data);

        } catch (error) {

            console.error("Failed to load audit history.", error);

        } finally {

            setLoading(false);
        }
    };

    if (!isOpen)
        return null;

    return (
        <div className="history-modal-overlay">

            <div className="history-modal">

                <div className="history-modal-header">
                    <div className="history-title">
                        <History size={24} strokeWidth={2.2} />
                        <h2>View History</h2>
                    </div>

                    <button
                        className="close-button"
                        onClick={onClose}>
                        ×
                    </button>

                </div>

                <div className="history-modal-body">

                    {loading ? (

                        <p>Loading...</p>

                    ) : (

                        <table className="history-table">

                            <thead>

                                <tr>

                                    <th>Date & Time</th>

                                    <th>User</th>

                                    <th>Action</th>

                                    <th>Field Name</th>

                                    <th>Old Value</th>

                                    <th>New Value</th>

                                </tr>

                            </thead>

                            <tbody>

                                {history.length === 0 ? (

                                    <tr>

                                        <td colSpan="6">
                                            No history found.
                                        </td>

                                    </tr>

                                ) : (

                                    history.map(item => (

                                        <tr key={item.auditLogId}>

                                            <td>
                                                {new Date(item.createdDate).toLocaleString()}
                                            </td>

                                            <td>{item.performedBy}</td>

                                            <td>{item.actionType}</td>

                                            <td>{item.fieldName}</td>

                                            <td>{item.oldValue}</td>

                                            <td>{item.newValue}</td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ViewHistoryModal;