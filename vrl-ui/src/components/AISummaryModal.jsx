import { Sparkles, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import SuccessModal from "../components/SuccessModal";
import "./AISummaryModal.css";

function AISummaryModal({
    isOpen,
    onClose,
    summary,
    loading,
    onRegenerate,

    // Optional Props
    title = "AI Executive Summary",
    showQuestion = false,
    question = "",
    setQuestion = () => {},
    onAsk = () => {},
    loadingTitle = "Generating AI Summary...",
    loadingDescription = "Please wait while AI analyzes the data.",
    primaryButtonText = "Regenerate"
}) {

    if (!isOpen) return null;
    const [showCopiedModal, setShowCopiedModal] = useState(false);
    const suggestions = [
    "Show high risk vendors",
    "Show open incidents",
    "Which vendors have critical incidents?",
    "Tell me about Azure",
    "Give me an executive summary",
    "Show vendors due for review"
];

    const copySummary = async () => {

        if (!summary) return;

        await navigator.clipboard.writeText(summary);

        setShowCopiedModal(true);
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

                        <h2>{title}</h2>

                    </div>

                    <button
                        className="close-button"
                        onClick={onClose}>
                        ×
                    </button>

                </div>

                <div className="history-modal-body">

                    {!loading && showQuestion && (

                        <div className="ai-question-section">

                            <label className="ai-question-label">
                                Ask a question
                            </label>

                            <textarea
                                className="ai-question-box"
                                rows={4}
                                placeholder="Ask anything about vendors, incidents or dashboard..."
                                value={question}
                                onChange={(e) =>
                                    setQuestion(e.target.value)
                                }
                            />

                                <div className="ai-suggestions">

                                {suggestions.map((item) => (

                                    <button
                                        key={item}
                                        type="button"
                                        className="ai-suggestion-chip"
                                        onClick={() => setQuestion(item)}
                                    >
                                        {item}
                                    </button>

                                ))}

                            </div>
                            <button
                                className="ai-primary-button"
                                onClick={onAsk}>

                                <Sparkles size={18} />

                                Ask AI

                            </button>

                        </div>

                    )}

                    {loading ? (

                        <div className="ai-loading">

                            <RefreshCw
                                className="spin"
                                size={32}
                            />

                            <h3>{loadingTitle}</h3>

                            <p>{loadingDescription}</p>

                        </div>

                    ) : (

                        summary && (

                            <div className="ai-summary-card">

                                <p>{summary}</p>

                            </div>

                        )

                    )}

                </div>

                {!loading && summary && (

                    <div className="ai-footer">

                        <button
                            className="ai-secondary-button"
                            onClick={copySummary}>

                            <Copy size={18} />

                            Copy

                        </button>

                        {!showQuestion && (

                            <button
                                className="ai-primary-button"
                                onClick={onRegenerate}>

                                <Sparkles size={18} />

                                {primaryButtonText}

                            </button>

                        )}

                    </div>

                )}

            </div>
                {
                    showCopiedModal && (
                        <SuccessModal
                            title="Copied"
                            message="The content has been copied to your clipboard."
                            onClose={() => setShowCopiedModal(false)}
                        />
                    )
                }
        </div>

    );
}

export default AISummaryModal;