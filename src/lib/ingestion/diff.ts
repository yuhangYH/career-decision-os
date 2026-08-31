export function contentHash(value: string) {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) + hash) ^ value.charCodeAt(index);
  }
  return `djb2-${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

export function hasSnapshotChanged(previousHash: string | undefined, nextHash: string) {
  return previousHash !== undefined && previousHash !== nextHash;
}
