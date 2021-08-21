export function candidateCardSorting(candidates, activeId, overId) {
  return {
    oldIndex: candidates.findIndex(
      (candidate) => candidate.candidateId === activeId,
    ),
    newIndex: candidates.findIndex(
      (candidate) => candidate.candidateId === overId,
    ),
  };
}
