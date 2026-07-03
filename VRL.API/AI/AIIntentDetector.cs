namespace VRL.API.AI;

public static class AIIntentDetector
{
    public static AIQuery Analyze(string question)
    {
        question = question.ToLower();

        var query = new AIQuery();

        // -------------------------
        // Detect Intent
        // -------------------------

        if (question.Contains("vendor") ||
            question.Contains("risk") ||
            question.Contains("review"))
        {
            query.Intent = AIIntent.Vendor;
        }
        else if (question.Contains("incident") ||
                 question.Contains("open") ||
                 question.Contains("closed") ||
                 question.Contains("critical") ||
                 question.Contains("severity") ||
                 question.Contains("priority"))
        {
            query.Intent = AIIntent.Incident;
        }
        else if (question.Contains("dashboard") ||
                 question.Contains("summary") ||
                 question.Contains("overview") ||
                 question.Contains("management"))
        {
            query.Intent = AIIntent.Dashboard;
        }
        else
        {
            query.Intent = AIIntent.Unknown;
        }

        // -------------------------
        // Vendor Filters
        // -------------------------

       // Risk Rating
        if (question.Contains("high") ||
            question.Contains("highest") ||
            question.Contains("riskiest"))
        {
            query.RiskRating = "High";
        }
        else if (question.Contains("medium"))
        {
            query.RiskRating = "Medium";
        }
        else if (question.Contains("low") ||
                question.Contains("lowest"))
        {
            query.RiskRating = "Low";
        }

        if (question.Contains("due") ||
        question.Contains("review") ||
        question.Contains("overdue"))
            query.DueForReview = true;

        if (question.Contains("active"))
            query.IsActive = true;

        if (question.Contains("inactive"))
            query.IsActive = false;

        // -------------------------
        // Incident Filters
        // -------------------------

        if (question.Contains("open"))
            query.Status = "Open";

        else if (question.Contains("closed"))
            query.Status = "Closed";

       // Severity
        if (question.Contains("critical") ||
            question.Contains("severe"))
        {
            query.Severity = "Critical";
        }

        return query;
    }
}