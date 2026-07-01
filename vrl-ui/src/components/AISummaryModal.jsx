import { Sparkles, Copy, RefreshCw } from "lucide-react";
import "./AISummaryModal.css";

function AISummaryModal({
    isOpen,
    onClose,
    summary,
    loading,
    onRegenerate
}) {

    if (!isOpen) return null;

    const copySummary = async () => {

        await navigator.clipboard.writeText(summary);

        alert("Summary copied to clipboard.");
    };

    return (

        <div className="history-modal-overlay">

            <div className="history-modal ai-modal">

                <div className="history-modal-header">

                    <div className="history-title">

                        <Sparkles
                            size={25}
                            strokeWidth={2.2}
                        />

                        <h2>AI Executive Summary</h2>

                    </div>

                    <button
                        className="close-button"
                        onClick={onClose}>
                        ×
                    </button>

                </div>

                <div className="history-modal-body">

                    {loading ? (

                        <div className="ai-loading">

                            <RefreshCw
                                className="spin"
                                size={32}
                            />

                            <h3>Generating AI Summary...</h3>

                            <p>
                                Please wait while AI analyzes the vendor.
                            </p>

                        </div>

                    ) : (

                        <div className="ai-summary-card">

                            <p>{summary}</p>

                        </div>

                    )}

                </div>

                {!loading && (

                    <div className="ai-footer">

                        <button
                            className="ai-secondary-button"
                            onClick={copySummary}>

                            <Copy size={18} />

                            Copy Summary

                        </button>

                        <button
                            className="ai-primary-button"
                            onClick={onRegenerate}>

                            <Sparkles size={18} />

                            Regenerate

                        </button>

                    </div>

                )}

            </div>

        </div>

    );
}

export default AISummaryModal;