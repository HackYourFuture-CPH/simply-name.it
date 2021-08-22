export function candidateCardSorting(candidates, activeId, overId) {
  return {
    oldIndex: candidates.findIndex((candidate) => candidate.id === activeId),
    newIndex: candidates.findIndex((candidate) => candidate.id === overId),
  };
}
