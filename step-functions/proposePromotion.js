"use-strict";

import sample from "lodash/sample";

export const call = (event, context, callback) => {
  const roles = [
    "Tea Fetcher",
    "CEO",
    "Sous Chef",
    "Head Matron",
    "Team Captain",
    "Head Gardener",
    "Chief Baker",
    "CTO",
    "Nobel Comittee Member",
  ];
  const names = [
    "Ollie Mansell",
    "Terry Pratchett",
    "Jane Goodall",
    "Marie Curie",
    "Jane Fonda",
    "Winston Churchill",
    "Henry VIII",
    "Noam Chomsky",
    "The Dalai Lama",
    "Derrick Bell",
    "Elvis Presely",
    "Danny Rampling",
    "Paul Dirac",
  ];

  const promotionProposal = {
    employeeName: sample(names),
    proposedRole: sample(roles),
    mostRecent360Score: Math.floor(Math.random() * 100),
    recentDisciplinaries: Math.floor(Math.random() * 5),
  };

  return callback(null, promotionProposal);
};
