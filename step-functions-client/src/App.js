import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";

import { API } from "aws-amplify";
import "./App.css";

function App(props) {
  const [promotionProposals, setPromotionProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(new Date());
  const { addToast } = useToasts();

  useEffect(() => {
    (async () => {
      try {
        const response = await API.get("step-functions-api", "/promotions");
        setPromotionProposals(response);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [refresh]);

  const submitDecision = async (decision, employee, taskToken) => {
    setLoading(true);
    try {
      await API.post("step-functions-api", "/decisions", {
        body: { decision, taskToken },
      });
      addToast(getToastMessage(employee, decision), {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (err) {
      addToast("Eek! Something went wrong there...", {
        appearance: "error",
        autoDismiss: true,
      });
      console.error(err);
    } finally {
      removeLocalProposal(taskToken);
      setLoading(false);
    }
  };

  const removeLocalProposal = (taskToken) =>
    setPromotionProposals((prev) =>
      prev.filter((proposal) => proposal.taskToken !== taskToken)
    );

  if (!promotionProposals) return "Loading...";

  return (
    <div className="container">
      <button className="refresh" onClick={() => setRefresh(new Date())}>
        Refresh
      </button>
      {promotionProposals.length === 0 && (
        <p>
          No proposals for now. Generate a new one on the AWS Step Functions
          console, then refresh.
        </p>
      )}
      <div className="card-container">
        {promotionProposals.map((promotionProposal) => (
          <PromotionCard
            key={promotionProposal.taskToken}
            promotionProposal={promotionProposal}
            submitDecision={submitDecision}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

const PromotionCard = ({
  promotionProposal: { details, taskToken },
  submitDecision,
  loading,
}) => {
  const handleDecision = (event) => {
    submitDecision(event.target.value, details, taskToken);
  };

  return (
    <div className="proposal-card">
      <h2>{details.employeeName}</h2>
      <p>
        <strong>Proposed Role:</strong> {details.proposedRole}
      </p>
      <p>
        <strong>Most recent 360 score:</strong> {details.mostRecent360Score}
      </p>
      <p>
        <strong>Recent disciplinaries:</strong> {details.recentDisciplinaries}
      </p>
      <button
        className="decision"
        disabled={loading}
        value="approved"
        onClick={handleDecision}
      >
        Approve
      </button>
      <button
        className="decision"
        disabled={loading}
        value="rejected"
        onClick={handleDecision}
      >
        Reject
      </button>
    </div>
  );
};

const getToastMessage = (employee, decision) =>
  `Thanks, we'll let ${employee.employeeName} know that they have been ${decision} for the role of ${employee.proposedRole}.`;
