export function scoreSkillFit(required: string[], candidate: string[]) {
  const normalizedCandidate = new Set(
    candidate.map((skill) => skill.trim().toLocaleLowerCase()),
  );
  const matched = required.filter((skill) =>
    normalizedCandidate.has(skill.trim().toLocaleLowerCase()),
  );
  const gaps = required.filter((skill) => !matched.includes(skill));

  return {
    score: required.length === 0 ? 100 : Math.round((matched.length / required.length) * 100),
    matched,
    gaps,
  };
}
